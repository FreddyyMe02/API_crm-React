import Formulario from "../components/Formulario";

const NuevoCliente = () => {
  return (
    <>
      <h1 className="font-bold text-4xl text-blue-900 text-center mt-10">
        {" "}
        Nuevo Cliente
      </h1>
      <p className="mt-5 text-xl text-pink-400 text-center mb-5">
        LLena los siguintes campos para ingresar un nuevo cliente{" "}
      </p>
      <Formulario />
    </>
  );
};

export default NuevoCliente;
