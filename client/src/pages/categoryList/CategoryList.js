import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesList from "../../components/category/categoryList/CategoryList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getCategories } from "../../redux/features/category/categorySlice";

const CategoryList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getCategories());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <CategoriesList categories={categories} isLoading={isLoading} />
    </div>
  );
};

export default CategoryList;
