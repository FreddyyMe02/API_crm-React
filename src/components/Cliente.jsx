import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleDelete }) => {
  const { nombre, empresa, email, telefono, id } = cliente;

  const navigate = useNavigate();
  return (
    <tr className="border-b hover:bg-gray-200">
      <td className="p-2">{nombre}</td>
      <td className="p-2">
        <p>
          <span className="text-gray-800 font-bold uppercase">E-mail: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 font-bold uppercase">Telefono: </span>
          {telefono}
        </p>
      </td>
      <td className="p-2">{empresa}</td>
      <td className="p-2">
        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 block text-white font-bold w-full p-2 uppercase text-xs mt-2"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          Ver
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 block text-white font-bold w-full p-2 uppercase text-xs mt-2"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 block text-white font-bold w-full p-2 uppercase text-xs mt-2"
          onClick={() => handleDelete(id)}
        >
          Borrar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
