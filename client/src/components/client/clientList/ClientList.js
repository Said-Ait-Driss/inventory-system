import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./ClientList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_CLIENTS,
  selectFilteredClients,
} from "../../../redux/features/filter/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { getClients,deleteClient } from "../../../redux/features/client/clientSlice";

const ClientList = ({ clients, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredClients = useSelector(selectFilteredClients);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delClient = async (id) => {
    await dispatch(deleteClient(id));
    await dispatch(getClients());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete client",
      message: "Are you sure you want to delete this client.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delClient(id),
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

    setCurrentItems(filteredClients?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredClients?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredClients]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredClients?.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_CLIENTS({ clients, search }));
  }, [clients, search, dispatch]);

  return (
    <div className="Category-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Client List</h3>
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
          {!isLoading && clients && clients.length === 0 ? (
            <p>-- No client found, please add an client...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems?.map((client, index) => {
                  const { _id, nom,prenom,email} = client;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(nom, 16)}</td>
                      <td>{shortenText(prenom, 16)}</td>
                      <td>{shortenText(email, 16)}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/edit-client/${_id}`}>
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

export default ClientList;
