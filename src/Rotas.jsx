import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./views/util/ProtectedRoute";
import FormCategoriaProduto from "./views/categoriaProduto/FormCategoriaProduto";
import ListCategoriaProduto from "./views/categoriaProduto/ListCategoriaProduto";
import FormCliente from "./views/cliente/FormCliente";
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from "./views/entregador/FormEntregador";
import ListEntregador from "./views/entregador/ListEntregador";
import Home from './views/home/home';
import FormLogin from './views/login/FormLogin';
import FormProduto from "./views/produto/FormProduto";
import ListProduto from './views/produto/ListProduto';
import FormEnderecoCliente from "./views/EnderecoCliente/FormEnderecoCliente";
import ListEnderecoCliente from "./views/EnderecoCliente/ListEnderecoCliente";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <FormLogin/> } />
        <Route path="/home" element={
          <ProtectedRoute><Home/></ProtectedRoute>  } />
        <Route path="form-cliente" element={<FormCliente/>}/>
        <Route path="list-entregador" element={ <ProtectedRoute><ListEntregador/></ProtectedRoute> } />
        <Route path="list-cliente" element={ <ProtectedRoute><ListCliente/></ProtectedRoute> } />
        <Route path="list-produto" element={ <ProtectedRoute><ListProduto/></ProtectedRoute> } />
        <Route path="form-produto" element={<ProtectedRoute><FormProduto/></ProtectedRoute>} />
        <Route path="form-entregador" element={<ProtectedRoute><FormEntregador/></ProtectedRoute>} />
        <Route path="form-categoriaproduto" element={<ProtectedRoute><FormCategoriaProduto/></ProtectedRoute>} />
        <Route path="list-categoriaproduto" element={<ProtectedRoute><ListCategoriaProduto/></ProtectedRoute>} />
        <Route path="form-endereco" element={<ProtectedRoute><FormEnderecoCliente/></ProtectedRoute>} />
          <Route path="list-endereco" element={<ProtectedRoute><ListEnderecoCliente/></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default Rotas;
