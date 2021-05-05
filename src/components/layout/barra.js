import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {
  //extraer la informacion de autenticacion
  const authContext = useContext(AuthContext);
  const {
    usuario,
    usuarioAutenticado,
    cerrarSesion,
    obtenerTodosUsuarios,
  } = authContext;
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);
  let rol = "";
  if (usuario) {
    rol = usuario.rol;
  }
  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}
      <nav className="nav-principal">
        {rol === "admin" ? (
          <button
            className="btn btn-blank cerrar-sesion"
            onClick={() => obtenerTodosUsuarios()}
          >
            Obtener usuario
          </button>
        ) : null}
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => cerrarSesion()}
        >
          Cerrar Session
        </button>
      </nav>
    </header>
  );
};

export default Barra;
