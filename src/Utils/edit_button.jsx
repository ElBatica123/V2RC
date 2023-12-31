/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import {
  changeData,
  changeModal,
  changeUrl,
} from "../features/modal/moda.slice";

export function EditButton({ title, URL, table }) {
  const dispatch = useDispatch();
  const handleClickEdit = () => {
    dispatch(changeData(table));
    dispatch(changeModal(title));
    dispatch(changeUrl(URL));
  };
  return (
    <>
      <span
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Actualizar"
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#ModalFather"
          className="btn btn-warning"
          onClick={handleClickEdit}
        >
          <i className="fas fa-edit"></i>
        </button>
      </span>
    </>
  );
}
