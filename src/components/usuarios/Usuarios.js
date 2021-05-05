import React, { Fragment, useContext } from "react";
import Users from "./Users";
import AuthContext from "../../context/autenticacion/authContext";

const Usuarios = () => {
  const authContext = useContext(AuthContext);
  const { usuarios } = authContext;
  return (
    <Fragment>
      <h2>Lista de Usuarios</h2>
      <ul className="listado-tareas">
        {usuarios.map((users) => (
          <Users key={users._id} users={users} />
        ))}
      </ul>
      <button type="button" className="btn btn-eliminar">
        Eliminar Usuario &times;
      </button>
    </Fragment>
  );
};

export default Usuarios;
