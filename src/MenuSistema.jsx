import { Link } from "react-router-dom";
import { logout } from './views/util/AuthenticationService';
import { Menu } from "semantic-ui-react";

export default function MenuSistema(props) {
  return (
    <>
      <Menu inverted>
         <Menu.Item
                    className='navbar__item--mobile'
                    onClick={logout}
                    content='Sair'
                    as={Link}
                    to='/'
                />

        <Menu.Item
          content="Home"
          active={props.tela === "home"}
          as={Link}
          to="/home"
        />
        <Menu.Item
          content="Cliente"
          active={props.tela === "cliente"}
          as={Link}
          to="/list-cliente"
        />
                       <Menu.Item
          content="Endereço cliente"
          active={props.tela === "enderecocliente"}
          as={Link}
          to="/list-endereco"
        />
        <Menu.Item
          content="Produto"
          active={props.tela === "produto"}
          as={Link}
          to="/list-produto"
        />
               <Menu.Item
          content="Categoria Produto"
          active={props.tela === "categoriaproduto"}
          as={Link}
          to="/list-categoriaproduto"
        />


        <Menu.Item
          content="Entregador"
          active={props.tela === "entregador"}
          as={Link}
          to="/list-entregador"
        />
      </Menu>
    </>
  );
}
