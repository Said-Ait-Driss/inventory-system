const asyncHandler = require("express-async-handler");
const Command = require("../models/commandModel");

// Create Command
const createCommand = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { date, client, products } = req.body;

  //   Validation
  if (
    !date ||
    !client ||
    !client.nom ||
    !client.prenom ||
    !client.email ||
    !products ||
    !products.length
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Command
  const command = await Command.create({
    name,
  });

  res.status(201).json(command);
});

// Get all Command
const getCommands = asyncHandler(async (req, res) => {
  const commands = await Category.find({}).sort("-createdAt");
  res.status(200).json(commands);
});

// Get single Command
const getCommand = asyncHandler(async (req, res) => {
  const command = await Command.findById(req.params.id);
  // if Command  doesnt exist
  if (!command) {
    res.status(404);
    throw new Error("Command not found");
  }

  res.status(200).json(command);
});

// Delete Command
const deleteCommand = asyncHandler(async (req, res) => {
  const command = await command.findById(req.params.id);
  // if product doesnt exist
  if (!command) {
    res.status(404);
    throw new Error("Command not found");
  }
  await command.remove();
  res.status(200).json({ message: "command deleted." });
});

// Update command
const updateCommand = asyncHandler(async (req, res) => {
  const { date, client, products } = req.body;
  const { id } = req.params;
  console.log(req.body);
  const command = await Command.findById(id);

  // if Command doesnt exist
  if (!command) {
    res.status(404);
    throw new Error("Command not found");
  }

  // Update Command
  const updatedCommand = await Command.findByIdAndUpdate(
    { _id: id },
    {
      date,
      client,
      products,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedCommand);
});

module.exports = {
  createCommand,
  getCommands,
  getCommand,
  deleteCommand,
  updateCommand,
};
