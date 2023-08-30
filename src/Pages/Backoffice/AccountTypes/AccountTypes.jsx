/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import AddAccountTypeModal from "./AddAccountType/AddAccountTypeModal.jsx";
import EditAccountTypeModal from "./EditAccountType/EditAccountTypeModal.jsx";
import DeleteAccountTypeModal from "./DeleteAccountType/DeleteAccountTypeModal.jsx";

import { useSelector, useDispatch } from "react-redux";
import {
  addNewAccountType,
  selectAllAccTypes,
  getAccTypesStatus,
  getAccTypesError,
  fetchAccountTypes,
} from "../../../Reducers/accountTypesSlice";
// import { useParams }from 'react-router-dom';

// const accountTypesList = [
//     { name:"Income", category:1 },
//     { name:"Expenses", category:1 },
//     { name:"Current Asset", category:2 },
//     { name:"Fixed Asset", category:2 },
//     { name:"Current Liabilities", category:2 },
//     { name:"Long Term Liabilities", category:2 },
//     { name:"Equity", category:2 },
//     { name:"Item Receivable", category:2 },
//     { name:"Item Payable", category:2 },
// ];

const categoryList = [
  { id: 1, name: "Income/Expenses" },
  { id: 2, name: "Others" },
  { id: 3, name: "Custom" },
];

function AccountTypesList(props) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  const accTypes = useSelector(selectAllAccTypes);
  const accTypesStatus = useSelector(getAccTypesStatus);
  const accTypesError = useSelector(getAccTypesError);

  const handleModalOpen = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };
  const handleEditModalOpen = (id) => {
    if (editModalOpen) {
      setIdToEdit(null);
      setEditModalOpen(false);
    } else {
      setIdToEdit(id);
      setEditModalOpen(true);
    }
  };
  const handleDeleteModalOpen = (id) => {
    if (deleteModalOpen) {
      setIdToDelete(null);
      setDeleteModalOpen(false);
    } else {
      setIdToDelete(id);
      setDeleteModalOpen(true);
    }
  };

  useEffect(() => {
    if (accTypesStatus === "idle") {
      dispatch(fetchAccountTypes());
    }
    // else if (accTypesStatus == 'succeeded'){
    //     if (accTypes.length == 0) {
    //         accountTypesList.map((accType) => {
    //             dispatch(addNewAccountType(accType))
    //         })
    //         dispatch(fetchAccountTypes())
    //         // accountTypesSlice.extraReducers.builder.fetchAccountTypes();
    //     }
    // }
  }, [accTypesStatus, dispatch]);

  let renderedAccountTypes;
  if (accTypesStatus === "loading") {
    renderedAccountTypes = (
      <tr>
        <td>...</td>
      </tr>
    );
  } else if (accTypesStatus === "succeeded") {
    renderedAccountTypes = accTypes.map((accType, index) => (
      <tr key={index} className="table_row_w border border-b-slate-300">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {index}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {accType.name}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {
            categoryList.filter(
              (category) => category.id == accType.category
            )[0].name
          }
        </td>
        <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {/* <BsThreeDots size={18} color={"#41436a"}/> */}
          <div
            className="hover:cursor-pointer"
            onClick={() => handleEditModalOpen(accType.id)}
          >
            <AiOutlineEdit size={18} color={"#41436a"} />
          </div>
          {!accType.prime ? (
            <div
              className="hover:cursor-pointer"
              onClick={() => handleDeleteModalOpen(accType.id)}
            >
              <RiDeleteBinLine size={18} color={"#41436a"} />
            </div>
          ) : (
            <></>
          )}
        </td>
      </tr>
    ));
  } else if (accTypesStatus === "failed") {
    renderedAccountTypes = (
      <tr>
        <td>{accTypesError}</td>
      </tr>
    );
  }

  return (
    <>
      <div className="main_page_container bg-[#F0F0F0] flex flex-col justify-between">
        <div>
          <div className="flex px-10 pt-3 justify-between gap-10">
            <div className="myprimarytextcolor text-xl font-bold">
              Account types
            </div>
          </div>
          <div className="flex px-10 py-3 justify-between gap-10  border border-b-slate-300">
            <Link
              to={""}
              onClick={() => navigate(-1)}
              className="flex gap-1 items-center"
            >
              <FiChevronLeft size={20} color={"#white"} />
              <span className="myprimarytextcolor">Back</span>
            </Link>

            <Link
              to={"#"}
              onClick={handleModalOpen}
              className="outline-none flex gap-1 items-center bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2"
            >
              <FiPlus size={20} color={"#white"} />
              New Account Type
            </Link>
          </div>

          <div className="table_container">
            <table className="w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody>{renderedAccountTypes}</tbody>
            </table>
          </div>
        </div>

        <div className="flex px-5 py-3 gap-10 "></div>
      </div>

      {modalOpen ? (
        <>
          <AddAccountTypeModal
            handleModalOpen={handleModalOpen}
            modalOpen={modalOpen}
          />
        </>
      ) : (
        <></>
      )}
      {editModalOpen ? (
        <>
          <EditAccountTypeModal
            handleEditModalOpen={handleEditModalOpen}
            editModalOpen={editModalOpen}
            accTypeId={idToEdit}
          />
        </>
      ) : (
        <></>
      )}
      {deleteModalOpen ? (
        <>
          <DeleteAccountTypeModal
            handleDeleteModalOpen={handleDeleteModalOpen}
            deleteModalOpen={deleteModalOpen}
            accTypeId={idToDelete}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default AccountTypesList;
