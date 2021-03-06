import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  BASE_USUARIOS,
} from "../../types/index";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
    usuarios: [],
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //fuinciones
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });

      //obtener usuario
      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  // retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //TODO : Funcion para enviar el token por headers
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth");
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //cuando el usuario inicia sesion
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      //obtener usuario
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  //cierra la session del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  //Obtener todos los usuarios desde el admin
  const obtenerTodosUsuarios = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //TODO : Funcion para enviar el token por headers
      tokenAuth(token);
    }
    try {
      const resultado = await clienteAxios.get("/api/authUsers");
      dispatch({
        type: BASE_USUARIOS,
        payload: resultado.data.usuarios,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        usuarios: state.usuarios,
        registrarUsuario,
        usuarioAutenticado,
        iniciarSesion,
        cerrarSesion,
        obtenerTodosUsuarios,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
