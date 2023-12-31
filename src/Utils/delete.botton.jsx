/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { AlertDelete } from "../assets/js/Alerts";
import { changeReload } from "../features/modal/moda.slice";

export function DeleteBottom({ URL, table }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    AlertDelete(URL, table, "Actualizado")
      .then((res) => {
        console.log(res);
        if (res.isConfirmed) {
          dispatch(changeReload());
        }
      })
      .catch((e) => {
        console.log(e + "<- <-");
      });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Eliminar"
        onClick={handleClick}
      >
        <i className="fas fa-trash"></i>
      </button>
    </>
  );
}
