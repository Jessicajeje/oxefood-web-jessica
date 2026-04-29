import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/Util";

export default function ListEnderecoCliente() {
  const [lista, setLista] = useState([]);
  const [idCliente, setIdCliente] = useState(1); // Substitua pelo ID do cliente desejado
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get(`http://localhost:8080/api/cliente/${idCliente}/endereco`).then((response) => {
      setLista(response.data);
    });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios.delete('http://localhost:8080/api/cliente/endereco/' + idRemover)
      .then((response) => {
        notifySuccess('Endereço removido com sucesso.')
        carregarLista();
      })
      .catch((error) => {
        notifyError('Erro ao remover o endereço.')
      })
    setOpenModal(false)
  }

  return (
    <div>
      <MenuSistema tela={"EnderecoCliente"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Endereços </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="map pin"
              floated="right"
              as={Link}
              to="/form-endereco"
            />
            <br /><br /><br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Rua</Table.HeaderCell>
                  <Table.HeaderCell>Número</Table.HeaderCell>
                  <Table.HeaderCell>Bairro</Table.HeaderCell>
                  <Table.HeaderCell>CEP</Table.HeaderCell>
                  <Table.HeaderCell>Cidade</Table.HeaderCell>
                  <Table.HeaderCell>Estado</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((endereco) => (
                  <Table.Row key={endereco.id}>
                    <Table.Cell>{endereco.rua}</Table.Cell>
                    <Table.Cell>{endereco.numero}</Table.Cell>
                    <Table.Cell>{endereco.bairro}</Table.Cell>
                    <Table.Cell>{endereco.cep}</Table.Cell>
                    <Table.Cell>{endereco.cidade}</Table.Cell>
                    <Table.Cell>{endereco.estado}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar este endereço"
                        icon
                      >
                        <Link
                          to="/form-endereco"
                          state={{ id: endereco.id }}
                          style={{ color: "green" }}
                        >
                          <Icon name="edit" />
                        </Link>
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este endereço"
                        icon
                        onClick={() => confirmaRemover(endereco.id)}>
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>

      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name='trash' />
          <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse endereço? </div>
        </Header>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
            <Icon name='remove' /> Não
          </Button>
          <Button color='green' inverted onClick={() => remover()}>
            <Icon name='checkmark' /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
