import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Header,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListCliente() {
  const [lista, setLista] = useState([]);
  const [openModalEnderecos, setOpenModalEnderecos] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/cliente").then((response) => {
      setLista(response.data);
    });
  }

  function visualizarEnderecos(cliente) {
    setClienteSelecionado(cliente);
    setOpenModalEnderecos(true);
  }
  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/cliente/" + idRemover)
      .then((response) => {
        console.log("Cliente removido com sucesso.");

        axios.get("http://localhost:8080/api/cliente").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        console.log("Erro ao remover um cliente.");
      });
    setOpenModal(false);
  }
  async function removerEndereco(idEndereco) {
    await axios
      .delete("http://localhost:8080/api/cliente/endereco/" + idEndereco)
      .then((response) => {
        console.log("Endereço removido com sucesso.");
        setOpenModalEnderecos(false);
        carregarLista();
      })
      .catch((error) => {
        console.log("Erro ao remover o endereço.");
      });
  }

  return (
    <div>
      <MenuSistema tela={"cliente"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Cliente </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-cliente"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell>Endereços</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((cliente) => (
                  <Table.Row key={cliente.id}>
                    <Table.Cell>{cliente.nome}</Table.Cell>
                    <Table.Cell>{cliente.cpf}</Table.Cell>
                    <Table.Cell>
                      {formatarData(cliente.dataNascimento)}
                    </Table.Cell>
                    <Table.Cell>{cliente.foneCelular}</Table.Cell>
                    <Table.Cell>{cliente.foneFixo}</Table.Cell>
                    <Table.Cell>
                      <Button
                        inverted
                        circular
                        color="orange"
                        title="Clique aqui para ver os endereços deste cliente"
                        onClick={() => visualizarEnderecos(cliente)}
                        icon="home"
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste cliente"
                        icon
                      >
                        <Link
                          to="/form-cliente"
                          state={{ id: cliente.id }}
                          style={{ color: "green" }}
                        >
                          {" "}
                          <Icon name="edit" />{" "}
                        </Link>
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este cliente"
                        icon
                        onClick={(e) => confirmaRemover(cliente.id)}
                      >
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
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            {" "}
            Tem certeza que deseja remover esse registro?{" "}
          </div>
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => setOpenModal(false)}
          >
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={() => remover()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal
        onClose={() => setOpenModalEnderecos(false)}
        open={openModalEnderecos}
        size="large"
      >
        <Header
          icon="map marker alternate"
          content={`Endereços de ${clienteSelecionado?.nome}`}
        />
        <Modal.Content>
          {clienteSelecionado?.enderecos &&
          clienteSelecionado.enderecos.length > 0 ? (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Rua</Table.HeaderCell>
                  <Table.HeaderCell>Número</Table.HeaderCell>
                  <Table.HeaderCell>Bairro</Table.HeaderCell>
                  <Table.HeaderCell>Cidade</Table.HeaderCell>
                  <Table.HeaderCell>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {clienteSelecionado.enderecos.map((end) => (
                  <Table.Row key={end.id}>
                    <Table.Cell>{end.rua}</Table.Cell>
                    <Table.Cell>{end.numero}</Table.Cell>
                    <Table.Cell>{end.bairro}</Table.Cell>
                    <Table.Cell>{end.cidade}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar este endereço"
                        icon
                        as={Link}
                        to="/form-endereco"
                        state={{
                          idEndereco: end.id,
                          idCliente: clienteSelecionado?.id,
                        }}
                      >
                        <Icon name="edit" />
                      </Button>
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este endereço"
                        icon
                        onClick={() => removerEndereco(end.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p style={{ textAlign: "center" }}>
              Este cliente não possui endereços cadastrados.
            </p>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            as={Link}
            to="/form-endereco"
            state={{ idCliente: clienteSelecionado?.id }}
            inverted
          >
            <Icon name="plus" /> Add endereço
          </Button>
          <Button color="red" onClick={() => setOpenModalEnderecos(false)}>
            <Icon name="close" /> Fechar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
