import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuppliersList from "../../components/supplier/supplierList/SupplierList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getSuppliers } from "../../redux/features/supplier/supplierSlice";

const SupplierList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { suppliers, isLoading, isError, message } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSuppliers());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <SuppliersList suppliers={suppliers} isLoading={isLoading} />
    </div>
  );
};

export default SupplierList;
