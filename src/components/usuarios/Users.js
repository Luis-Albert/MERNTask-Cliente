import React from "react";

const Users = ({ users }) => {
  let hora = new Date(users.registro);
  return (
    <li className="tarea sombra">
      <p>{users.nombre}</p>
      <p>{users.email}</p>
      <p>{users.rol}</p>
      <p>{hora.toLocaleString()}</p>
    </li>
  );
};

export default Users;
