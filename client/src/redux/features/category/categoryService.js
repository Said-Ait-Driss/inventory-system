import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/categories/`;

// Create New Category
const createCategory = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Create New Category
const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Category
const deleteCategory = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Category
const getCategory = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Category
const updateCategory = async (id, formData) => {
  const response = await axios.put(`${API_URL}${id}`, formData);
  return response.data;
};

const categoryService = {
  createCategory,
  getCategories,
  deleteCategory,
  getCategory,
  updateCategory,
};

export default categoryService;
