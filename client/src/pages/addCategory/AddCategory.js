import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CategoryForm from "../../components/category/categoryForm/CategoryForm";
import {
  createCategory,
  selectIsLoading,
} from "../../redux/features/category/categorySlice";

const initialState = {
  name: ""
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    setCategory({ ...category });
    await dispatch(createCategory(category));

    navigate("/categories-list");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Category</h3>
      <CategoryForm
        category={category}
        handleInputChange={handleInputChange}
        saveCategory={saveCategory}
      />
    </div>
  );
};

export default AddProduct;
