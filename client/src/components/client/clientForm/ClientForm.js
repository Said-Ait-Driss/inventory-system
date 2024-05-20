import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ClientForm.scss";

const ClientForm = ({
  client,
  handleInputChange,
  saveClient,
}) => {
  return (
    <div className="add-client">
      <Card cardClass={"card"}>
        <form onSubmit={saveClient}>
          <label>Nom:</label>
          <input
            type="text"
            placeholder="Nom"
            name="nom"
            value={client?.nom}
            onChange={handleInputChange}
          />
          <label>Prenom:</label>
          <input
            type="text"
            placeholder="Prenom"
            name="prenom"
            value={client?.prenom}
            onChange={handleInputChange}
          />
          <label>Client email:</label>
          <input
            type="email"
            placeholder="Client email"
            name="email"
            value={client?.email}
            onChange={handleInputChange}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Client
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ClientForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ClientForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ClientForm;
