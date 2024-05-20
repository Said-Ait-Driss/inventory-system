import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CategoryForm from "../../components/category/categoryForm/CategoryForm";
import {
  getCategory,
  getCategories,
  selectIsLoading,
  selectCategory,
  updateCategory,
} from "../../redux/features/category/categorySlice";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const categoryEdit = useSelector(selectCategory);

  const [category, setCategory] = useState(categoryEdit);

  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    setCategory(categoryEdit);
  }, [categoryEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };


  const saveCategory = async (e) => {
    e.preventDefault();
    console.log(category);
    await dispatch(updateCategory({ id, category }));
    await dispatch(getCategories());
    navigate("/categories-list");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Category</h3>
      <CategoryForm
        category={category}
        handleInputChange={handleInputChange}
        saveCategory={saveCategory}
      />
    </div>
  );
};

export default EditCategory;
