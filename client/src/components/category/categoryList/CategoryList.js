import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./categoryList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
    FILTER_CATEGORIES,
  selectFilteredCategories,
} from "../../../redux/features/filter/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { getCategories,deleteCategory } from "../../../redux/features/category/categorySlice";

const CategoriesList = ({ categories, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredCategories = useSelector(selectFilteredCategories);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delCategory = async (id) => {
    await dispatch(deleteCategory(id));
    await dispatch(getCategories());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete category",
      message: "Are you sure you want to delete this category.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCategory(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredCategories.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredCategories.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredCategories]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCategories.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_CATEGORIES({ categories, search }));
  }, [categories, search, dispatch]);

  return (
    <div className="Category-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>CategoriesList List</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && categories.length === 0 ? (
            <p>-- No Category found, please add an category...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((category, index) => {
                  const { _id, name} = category;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/edit-category/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default CategoriesList;
