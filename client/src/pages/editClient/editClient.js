import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ClientForm from "../../components/client/clientForm/ClientForm";
import {
  getClient,
  getClients,
  selectIsLoading,
  selectClient,
  updateClient,
} from "../../redux/features/client/clientSlice";

const EditClient = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const clientEdit = useSelector(selectClient);

  const [client, setClient] = useState(clientEdit);

  useEffect(() => {
    dispatch(getClient(id));
  }, [dispatch, id]);

  useEffect(() => {
    setClient(clientEdit);
  }, [clientEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const saveClient = async (e) => {
    e.preventDefault();
    console.log(client);
    await dispatch(updateClient({ id, client }));
    await dispatch(getClients());
    navigate("/clients-list");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Client</h3>
      <ClientForm
        client={client}
        handleInputChange={handleInputChange}
        saveClient={saveClient}
      />
    </div>
  );
};

export default EditClient;
