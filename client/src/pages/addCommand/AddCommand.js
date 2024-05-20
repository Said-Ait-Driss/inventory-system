import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CommandForm from "../../components/command/commandForm/CommandForm";
import {
  createCommand,
  selectIsLoading,
} from "../../redux/features/command/commandSlice";

const initialState = {
  name: ""
};

const AddCommand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [command, setCommand] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommand({ ...command, [name]: value });
  };

  const saveCommand = async (e) => {
    e.preventDefault();
    setCommand({ ...command });
    await dispatch(createCommand(command));

    navigate("/commands-list");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Command</h3>
      <CommandForm
        command={command}
        handleInputChange={handleInputChange}
        saveCommand={saveCommand}
      />
    </div>
  );
};

export default AddCommand;
