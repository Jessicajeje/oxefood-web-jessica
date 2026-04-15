import { Route, Routes } from "react-router-dom";
import FormCliente from "./views/cliente/FormCliente";
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from "./views/entregador/FormEntregador";
import ListEntregador from "./views/entregador/ListEntregador";
import Home from "./views/home/home";
import FormProduto from "./views/produto/FormProduto";
import ListProduto from './views/produto/ListProduto';
import FormCategoriaProduto from "./views/categoriaProduto/FormCategoriaProduto";
import ListCategoriaProduto from "./views/categoriaProduto/ListCategoriaProduto";

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
        <Route path="form-categoriaproduto" element={<FormCategoriaProduto />} />
        <Route path="list-categoriaproduto" element={<ListCategoriaProduto />} />
      </Routes>
    </>
  );
}

export default Rotas;
