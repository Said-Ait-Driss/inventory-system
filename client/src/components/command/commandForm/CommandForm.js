import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";

import "./CommandForm.scss";

const CommandForm = ({
  command,
  handleInputChange,
  saveCommand,
}) => {

    const delProduct = async (id) => {
        // await dispatch(deleteCategory(id));
        // await dispatch(getCategories());
      };
    
      const confirmDelete = (id) => {
        confirmAlert({
          title: "Delete category",
          message: "Are you sure you want to delete this product.",
          buttons: [
            {
              label: "Delete",
              onClick: () => delProduct(id),
            },
            {
              label: "Cancel",
            },
          ],
        });
      };

  return (
    <div className="add-command">
      <Card cardClass={"card"}>
        <form onSubmit={saveCommand}>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="command name"
            name="name"
            value={command?.productName}
            onChange={handleInputChange}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Search
            </button>
          </div>
          <div className="products-list">
                <Card cardClass={"product"}>
                    <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review.jpg" />
                    <h4>product name</h4>
                    <h5>supplier</h5>
                    <h4>34DH</h4>
                    <button className="--btn --btn-success"> Add </button>
                </Card>

          </div>
        </form>
      </Card>
      <Card cardClass={"card"}>
        <form onSubmit={saveCommand}>
          <h4>Ticket</h4>
          <label>Client:</label>
          <select >
            <option></option>
          </select>
          <div className="table" >
            <table>
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Prix</th>
                  <th>Quantitie</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>sfsdf</td>
                    <td>123</td>
                    <td>
                        <input type="text" name="quantitie" className="qty-input" disabled />
                    </td>
                    <td>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete()}
                          />
                        </span>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save command
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

CommandForm.modules = {
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
CommandForm.formats = [
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

export default CommandForm;
