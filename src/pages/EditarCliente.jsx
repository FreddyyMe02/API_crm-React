import { useState, useEffect } from "react";
import Formulario from "../components/Formulario";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const EditarCliente = () => {
  const { Id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClienteById = async () => {
      try {
        const url = `http://localhost:3000/posts/${Id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {
        setCargando(!cargando);
      }, 2500);
    };

    obtenerClienteById();
  }, []);

  return (
    <>
      <h1 className="font-bold text-4xl text-blue-900 text-center mt-10">
        {" "}
        Editando Cliente
      </h1>
      <p className="mt-5 text-xl text-pink-400 text-center mb-5">
        Edita la informacion necesaria
      </p>
      {cliente.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <h1 className="font-bold text-4xl text-pink-900 text-center mt-10">
          {" "}
          Cliente no valido!!!
        </h1>
      )}
    </>
  );
};

export default EditarCliente;
