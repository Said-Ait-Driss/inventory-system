import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./SupplierForm.scss";

const SupplierForm = ({ supplier, handleInputChange, saveSupplier }) => {
  return (
    <div className="add-category">
      <Card cardClass={"card"}>
        <form onSubmit={saveSupplier}>
          <label>Supplier Name:</label>
          <input
            type="text"
            placeholder="Supplier name"
            name="name"
            value={supplier?.name}
            onChange={handleInputChange}
          />
          <label>Supplier Email:</label>
          <input
            type="email"
            placeholder="Supplier email"
            name="email"
            value={supplier?.email}
            onChange={handleInputChange}
          />
          <label>Supplier Tel:</label>
          <input
            type="text"
            placeholder="Supplier tel"
            name="tel"
            maxLength={10}
            minLength={10}
            value={supplier?.tel}
            onChange={handleInputChange}
          />
                    <label>Supplier Address:</label>
          <input
            type="text"
            placeholder="Supplier address"
            name="address"
            value={supplier?.address}
            onChange={handleInputChange}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Supplier
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

SupplierForm.modules = {
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
SupplierForm.formats = [
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

export default SupplierForm;
