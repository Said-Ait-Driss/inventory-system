const asyncHandler = require("express-async-handler");
const Supplier = require("../models/SupplierModel");

// Create supplier
const createSupplier = asyncHandler(async (req, res) => {
  const { name, email, tel, address } = req.body;
    console.log(req.body);
  //   Validation
  if (!name || !email || !tel || !address) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create supplier
  const supplier = await Supplier.create({
    user: req.user.id,
    name,
    email,
    tel,
    address,
  });

  res.status(201).json(supplier);
});

// Get all suppliers
const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find({ user: req.user.id }).sort(
    "-createdAt"
  );
  res.status(200).json(suppliers);
});

// Get single supplier
const getSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  // if Supplier doesnt exist
  if (!supplier) {
    res.status(404);
    throw new Error("Supplier not found");
  }
  // Match supplier to its user
  if (supplier.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(supplier);
});

// Delete Supplier
const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  // if supplier doesnt exist
  if (!supplier) {
    res.status(404);
    throw new Error("Supplier not found");
  }
  // Match supplier to its user
  if (supplier.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await supplier.remove();
  res.status(200).json({ message: "Supplier deleted." });
});

// Update Supplier
const updateSupplier = asyncHandler(async (req, res) => {
  const { name, tel, email, address } = req.body;
  const { id } = req.params;

  const supplier = await Supplier.findById(id);

  // if supplier doesnt exist
  if (!supplier) {
    res.status(404);
    throw new Error("Supplier not found");
  }
  // Match supplier to its user
  if (supplier.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update supplier
  const updatedSupplier = await Supplier.findByIdAndUpdate(
    { _id: id },
    {
      name,
      tel,
      email,
      address,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedSupplier);
});

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
