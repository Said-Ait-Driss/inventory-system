import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./CommandList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
    FILTER_COMMANDS,
  selectFilteredCommands,
} from "../../../redux/features/filter/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { getCommands,deleteCommand } from "../../../redux/features/command/commandSlice";

const CommandsList = ({ commands, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredCommands = useSelector(selectFilteredCommands);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delCommand = async (id) => {
    await dispatch(deleteCommand(id));
    await dispatch(getCommands());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete command",
      message: "Are you sure you want to delete this command.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCommand(id),
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

    setCurrentItems(filteredCommands?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredCommands?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredCommands]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCommands?.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_COMMANDS({ commands, search }));
  }, [commands, search, dispatch]);

  return (
    <div className="Command-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Commands List</h3>
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
          {!isLoading && commands?.length === 0 ? (
            <p>-- No Command found, please add an command...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems?.map((command, index) => {
                  const { _id, date, client } = command;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{date}</td>
                      <td>{client}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/edit-command/${_id}`}>
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

export default CommandsList;
