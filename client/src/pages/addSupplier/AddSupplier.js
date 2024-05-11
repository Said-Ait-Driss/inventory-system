import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import SupplierForm from "../../components/supplier/supplierForm/SupplierForm";
import {
  createSupplier,
  selectIsLoading,
} from "../../redux/features/supplier/supplierSlice";

const initialState = {
  name: "",
  email: "",
  tel: "",
  address: "",
};

const AddSupplier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const saveSupplier = async (e) => {
    e.preventDefault();
    await dispatch(createSupplier(supplier));
    navigate("/suppliers-list");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Supplier</h3>
      <SupplierForm
        supplier={supplier}
        handleInputChange={handleInputChange}
        saveSupplier={saveSupplier}
      />
    </div>
  );
};

export default AddSupplier;
