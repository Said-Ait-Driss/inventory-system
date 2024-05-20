const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");

// Create Client
const createClient = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { nom, prenom, email } = req.body;

  //   Validation
  if (!nom || !prenom || !email) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Client
  const client = await Client.create({
    nom,
    prenom,
    email,
  });

  res.status(201).json(client);
});

// Get all Clients
const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({}).sort("-createdAt");
  res.status(200).json(clients);
});

// Get single Client
const getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  // if client doesnt exist
  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }
  res.status(200).json(client);
});

// Delete Client
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  // if product doesnt exist
  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }
  await category.remove();
  res.status(200).json({ message: "Client deleted." });
});

// Update Client
const updateClient = asyncHandler(async (req, res) => {
  const { nom, prenom, email } = req.body;
  const { id } = req.params;
  console.log(req.body);
  const client = await Client.findById(id);

  // if client doesnt exist
  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }

  // Update Client
  const updatedClient = await Client.findByIdAndUpdate(
    { _id: id },
    {
      nom,
      prenom,
      email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedClient);
});

module.exports = {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
