import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ClientForm from "../../components/client/clientForm/ClientForm";
import {
  createClient,
  selectIsLoading,
} from "../../redux/features/client/clientSlice";

const initialState = {
  name: ""
};

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [client, setClient] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const saveClient = async (e) => {
    e.preventDefault();
    setClient({ ...client });
    await dispatch(createClient(client));

    navigate("/clients-list");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Client</h3>
      <ClientForm
        client={client}
        handleInputChange={handleInputChange}
        saveClient={saveClient}
      />
    </div>
  );
};

export default AddClient;
