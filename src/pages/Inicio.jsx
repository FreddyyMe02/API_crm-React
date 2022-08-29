import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";
import Swal from "sweetalert2";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = "http://localhost:3000/posts";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClientesAPI();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Deseas eliminar este registro?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then(async (result) => {
      //opcion 'Si'
      if (result.isConfirmed) {
        try {
          const url = `http://localhost:3000/posts/${id}`;
          const respuesta = await fetch(url, {
            method: "DELETE",
          });
          const resultado = await respuesta.json();

          const clientesSinClienteEliminado = clientes.filter(
            (cliente) => cliente.id !== id,
          );

          Swal.fire("Eliminado!", "", "success");

          setClientes(clientesSinClienteEliminado);
        } catch (error) {
          Swal.fire("Algo fue mal!", "", "warning");
        }
      } else if (result.isDenied) {
        Swal.fire("Bien, No se elimino el registro", "", "info");
      }
    });
  };

  return (
    <>
      <h1 className="font-bold text-4xl text-blue-900 text-center mt-10">
        Clientes
      </h1>
      <p className="mt-5 text-xl text-pink-400 text-center mb-5">
        Administra tus clientes{" "}
      </p>

      <table className="w-full mt-5 table-auto shadow bg-gray-300">
        <thead className="bg-pink-500 text-white text-bold uppercase">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        {clientes.map((cliente) => (
          <Cliente
            key={cliente.id}
            cliente={cliente}
            handleDelete={handleDelete}
          />
        ))}

        <tbody></tbody>
      </table>
    </>
  );
};

export default Inicio;
