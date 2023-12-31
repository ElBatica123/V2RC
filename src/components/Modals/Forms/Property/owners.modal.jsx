import { useDispatch, useSelector } from "react-redux";
import { ApiPut, ApiPost } from "../../../../hooks/useApi";
import { useEffect, useState } from "react";
import { changeDataVoid, changeReload } from "../../../../features/modal/moda.slice";
import { CloseModal } from "../../../../assets/js/CloseModal";
const urlOwner = "https://rcservice.onrender.com/api/inmuebles/propietario";

export function FormOwner() {
  const [empty, setEmpty] = useState(true);

  const dispatch = useDispatch();

  let data = useSelector((state) => state.modal.data);

  const HandlePost = (e) => {
    e.preventDefault();

    const resultado = {
      documento: e.target.documento.value,
      nombre: e.target.nombre.value,
      correo: e.target.correo.value,
      telefono: e.target.telefono.value,
      direccion: e.target.direccion.value,
    };

    // dispatch(changeDataVoid());
    ApiPost(urlOwner, resultado)
      .then((res) => {
        console.log(res);
        dispatch(changeReload());
        CloseModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(changeDataVoid());
      });
  };

  const HandlePut = (e) => {
    e.preventDefault();

    const resultado = {
      id: data.id,
      documento: e.target.documento.value,
      nombre: e.target.nombre.value,
      correo: e.target.correo.value,
      telefono: e.target.telefono.value,
      direccion: e.target.direccion.value,
    };
    ApiPut(urlOwner, resultado)
      .then((res) => {
        console.log(res);
        if (res.status === 200) dispatch(changeReload());
        CloseModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(changeDataVoid());
      });
  };

  useEffect(() => {
    console.log("effect");
    if (Object.keys(data).length != 0) {
      setEmpty(false);
    }
  }, [data]);

  return (
    <>
      <form className="row g-3" onSubmit={empty ? HandlePost : HandlePut}>
        <div className="col-md-6">
          <label htmlFor="inputDocument" className="form-label">
            Documento
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingrese su Documento"
            name="documento"
            defaultValue={empty ? "" : data.documento} required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese su nombre"
            name="nombre"
            defaultValue={empty ? "" : data.nombre} required
          />
        </div>

        {/* <div className="col-md-6">
          <label htmlFor="inputLastName" className="form-label">
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            name="apellidos"
            placeholder="Ingrese sus apellidos"
            defaultValue={empty ? "" : data.apellidos}
          />
        </div> */}

        <div className="col-md-6">
          <label htmlFor="inputcorreo" className="form-label">
            correo
          </label>
          <input
            type="email"
            className="form-control"
            name="correo"
            placeholder="Ingrese su correo"
            defaultValue={empty ? "" : data.correo} required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputPhone" className="form-label">
            Teléfono
          </label>
          <input
            type="tel"
            className="form-control"
            name="telefono"
            placeholder="Ingrese su teléfono"
            defaultValue={empty ? "" : data.telefono} required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            name="direccion"
            placeholder="Ingrese su dirección"
            defaultValue={empty ? "" : data.direccion} required
          />
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">
            {empty ? "Crear" : "Actualizar"}
          </button>
        </div>
      </form>
    </>
  );
}
