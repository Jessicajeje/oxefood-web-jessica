import { Route, Routes } from "react-router-dom";
import FormCliente from "./views/cliente/FormCliente";
import ListCliente from './views/cliente/ListCliente';
import ListProduto from './views/produto/ListProduto';
import FormEntregador from "./views/entregador/FormEntregador";
import ListEntregador from "./views/entregador/ListEntregador";
import Home from "./views/home/home";
import FormProduto from "./views/produto/FormProduto";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form-cliente" element={<FormCliente />} />
        <Route path="list-entregador" element={ <ListEntregador/> } />
        <Route path="list-cliente" element={ <ListCliente/> } />
        <Route path="list-produto" element={ <ListProduto/> } />
        <Route path="form-produto" element={<FormProduto />} />
        <Route path="form-entregador" element={<FormEntregador />} />
      </Routes>
    </>
  );
}

export default Rotas;
