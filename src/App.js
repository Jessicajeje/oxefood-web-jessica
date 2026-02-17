
import './App.css';
import { Segment } from 'semantic-ui-react';
import Home from './views/home/home';
import FormCliente from './views/cliente/FormCliente';
import FormProduto from './views/produto/FormProduto';
import FormEntregador from './views/entregador/FormEntregador';

function App() {
  return (
    <div className="App">
      <Home />

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2025 - Projeto WEB IV - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

  <FormCliente />

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2025 - Projeto WEB IV - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

        <FormProduto />

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2025 - Projeto WEB IV - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

              <FormEntregador />

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2025 - Projeto WEB IV - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>


    </div>
  );
}

export default App;
