import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const ClienteVista = () => {
  const { Id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

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
      }, 2000);
    };
    obtenerClienteById();
  }, []);

  return (
    <div>
      {cargando ? (
        <Spinner />
      ) : Object.keys(cliente).length === 0 ? (
        <h1 className="font-bold text-4xl text-pink-900 text-center mt-10">
          No se encontraron los datos del cliente solicitado!!!{" "}
        </h1>
      ) : (
        <>
          <h1 className="font-bold text-4xl text-blue-900 text-center mt-10">
            Vista del cliente:{" "}
            <span className="font-bold text-4xl text-pink-500 text-center mt-10">
              {cliente.nombre}
            </span>{" "}
          </h1>
          <p className="mt-5 text-xl text-pink-400 text-center mb-5">
            Datos registrados del cliente{" "}
          </p>
          <div className=" bg-gray-300 w-1/2 mx-auto rounded-lg shadow">
            <p className="text-2xl p-3  text-gray-600">
              Cliente:{" "}
              <span className="text-gray-800 uppercasefont-bold">
                {cliente.nombre}
              </span>
            </p>
            <p className="text-2xl p-3  text-gray-600">
              E-mail:{" "}
              <span className="text-gray-800 uppercasefont-bold">
                {cliente.email}
              </span>
            </p>
            <p className="text-2xl p-3  text-gray-600">
              Telefono:{" "}
              <span className="text-gray-800 uppercasefont-bold">
                {cliente.telefono}
              </span>
            </p>
            <p className="text-2xl p-3  text-gray-600">
              Empresa:{" "}
              <span className="text-gray-800 uppercasefont-bold">
                {cliente.empresa}
              </span>
            </p>
            {cliente.notas && (
              <p className="text-2xl p-3 text-gray-600">
                Notas:{" "}
                <span className="text-gray-800 uppercasefont-bold">
                  {cliente.notas}
                </span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ClienteVista;
