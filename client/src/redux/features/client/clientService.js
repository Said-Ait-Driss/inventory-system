import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/clients/`;

// Create New Client
const createClient = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Create New Client
const getClients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Client
const deleteClient = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Client
const getClient = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Client
const updateClient = async (id, formData) => {
  const response = await axios.put(`${API_URL}${id}`, formData);
  return response.data;
};

const ClientService = {
  createClient,
  getClients,
  deleteClient,
  getClient,
  updateClient,
};

export default ClientService;
