import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre del cliente es obligatorio")
      .min(3, "El nombre es muy corto")
      .max(30, "El nombre es muy largo"),
    empresa: Yup.string()
      .required("El nombre de la empresa es obligatorio")
      .min(3, "El nombre de la empresa es obligatorio ")
      .max(40, "El nombre es demaciado largo"),
    email: Yup.string()
      .required("El E-mail es requerido")
      .email("El E-mail ingresado es invalido"),
    telefono: Yup.number()
      .typeError("El telefono es invalido")
      .integer("Numero no valido")
      .positive("Numero no valido"),
    notas: Yup.string().max(100, "Excede el numero de caracteres"),
  });

  const handleSubmit = async (values) => {
    try {
      if (cliente.id) {
        //Editar registro
        const url = `http://localhost:3000/posts/${cliente.id}`;
        const respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate("/clientes");
      } else {
        //Nuevo resgitro
        const url = "http://localhost:3000/posts";
        const respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        navigate("/clientes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-gray-300 mt-10 px-5 py-10 rounded-lg shadow-md md:w-3/4 mx-auto">
      <h1 className="font-bold text-gray-700  text-2xl text-center uppercase">
        {cliente.nombre ? "Editar cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="nombre">
                  Nombre: <span className="text-red-400">*</span>
                </label>
                <Field
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="bg-gray-200 mt-2 block w-full p-3 rounded-md"
                  placeholder="Nombre del Cliente"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="empresa">
                  Empresa: <span className="text-red-400">*</span>
                </label>
                <Field
                  type="text"
                  id="empresa"
                  name="empresa"
                  className="bg-gray-200 mt-2 block w-full p-3 rounded-md"
                  placeholder="Empresa del Cliente"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-5">
                <label className="text-gray-800 " htmlFor="email">
                  E-mail: <span className="text-red-400">*</span>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-200 mt-2 block w-full p-3 rounded-md"
                  placeholder="Email del Cliente"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-5">
                <label className="text-gray-800 " htmlFor="telefono">
                  Telefono:{" "}
                </label>
                <Field
                  type="tel"
                  id="telefono"
                  name="telefono"
                  className="bg-gray-200 mt-2 block w-full p-3 rounded-md"
                  placeholder="Telefono del Cliente.  Ej:458555"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-5">
                <label className="text-gray-800 " htmlFor="notas">
                  Notas:{" "}
                </label>
                <Field
                  as="textarea"
                  type="tel"
                  id="notas"
                  name="notas"
                  className="bg-gray-200 mt-2 block w-full p-3 rounded-md h-40"
                  placeholder="Notas del cliente"
                />
                {errors.notas && touched.notas ? (
                  <Alerta>{errors.notas}</Alerta>
                ) : null}
              </div>
              <input
                type="submit"
                value={cliente.nombre ? "Editar cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-center text-lg text-white uppercase font-bold rounded-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
