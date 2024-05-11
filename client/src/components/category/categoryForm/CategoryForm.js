import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./CategoryForm.scss";

const CategoryForm = ({
  category,
  handleInputChange,
  saveCategory,
}) => {
  return (
    <div className="add-category">
      <Card cardClass={"card"}>
        <form onSubmit={saveCategory}>
          <label>Category Name:</label>
          <input
            type="text"
            placeholder="Category name"
            name="name"
            value={category?.name}
            onChange={handleInputChange}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Category
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

CategoryForm.modules = {
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
CategoryForm.formats = [
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

export default CategoryForm;
