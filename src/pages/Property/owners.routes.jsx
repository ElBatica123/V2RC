import { useState, useEffect } from "react";
import { Datatables } from "../../components/Tables/Datatables";
import { ApiGet } from "../../hooks/useApi";
import { ButtonAction } from "../../Utils/ActionsTable";
import { IconLoading } from "../../Utils/IconsLoading";

const ColumnsDefault = (list, url, title) => {
  return [
    {
      name: "index",
      label: "Index",
      options: {
        sort: true,
        sortIndex: 0,
        filter: true,
        customBodyRender: (value) => <div className="center-cell">{value}</div>,
      },
    },
    {
      name: "nombreCompleto",
      label: "Nombres",
    },
    {
      name: "documento",
      label: "Documento",
    },
    {
      name: "email",
      label: "Correo",
      sort: true,
    },
    {
      name: "telefono",
      label: "Teléfono",
    },
    {
      name: "direccion",
      label: "Dirección",
    },
    {
      name: "estadoPropietario",
      label: "Estado",
      sort: true,
    },
    {
      name: "actions",
      label: "Acciones",
      options: {
        // sort: false,
        filter: false,
        customBodyRender: (value, tableMeta) =>
          ButtonAction({ value, tableMeta, list, url, title }),
      },
    },
  ];
};

// "fechCreacion": "2023-09-01T21:00:27.370Z",
// "_id": "64deb1be02ebf39a72715c3e",
// "documento": 67673048,
// "nombres": "Madge",
// "apellidos": "Stubbs",
// "correo": "mstubbsc@java.com",
// "gender": "Female",
// "telefono": "+1 850 185 2577",
// "direccion": "10-260 - Wall and Corner Guards"

export function Owners() {
  const url = "https://rcservice.onrender.com/api/inmuebles/propietario";
  const title = "Propietario";
  const [list, setList] = useState([]);

  let [data, loading, error] = ApiGet(url);

  useEffect(() => {
    if (data) {
      const newList = data.map((Owner, index) => {
        let status = Owner.estado ? "Activo" : "inactivo";
        return {
          id: Owner._id,
          index: index + 1,

          nombreCompleto: Owner.nombre,
          email: `${Owner.correo}`,
          estadoPropietario: status,
          //
          nombres: Owner.nombres,
          apellidos: Owner.apellidos,
          documento: Owner.documento,
          correo: Owner.correo,
          telefono: Owner.telefono,
          direccion: Owner.direccion,
        };
      });
      setList(newList);
    }
  }, [data]);

  return (
    <section className="sections" id="section__property">
      <IconLoading isLoading={loading} />
      {error && <div>{error}</div>}
      {!loading && !error && (
        <Datatables
          data={list}
          col={ColumnsDefault(list, url, title)}
          title={title}
          url={url}
        />
      )}
    </section>
  );
}
export default Owners;
