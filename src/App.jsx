import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import ClienteVista from "./pages/ClienteVista";
import EditarCliente from "./pages/EditarCliente";
import Inicio from "./pages/Inicio";
import NuevoCliente from "./pages/NuevoCliente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:Id" element={<EditarCliente />} />
          <Route path=":Id" element={<ClienteVista />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
