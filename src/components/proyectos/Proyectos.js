import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/autenticacion/authContext";
import Usuarios from "../usuarios/Usuarios";

const Proyectos = () => {
  //extraer la informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuarios, usuarioAutenticado } = authContext;
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            {usuarios.length > 1 ? <Usuarios /> : <ListadoTareas />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
