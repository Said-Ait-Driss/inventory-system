import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/suppliers/`;

// Create New Supplier
const createSupplier = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all Suppliers
const getSuppliers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Supplier
const deleteSupplier = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Supplier
const getSupplier = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Supplier
const updateSupplier = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};
const supplierService = {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};

export default supplierService;
