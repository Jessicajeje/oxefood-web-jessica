import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListEntregador() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [openModalVisualizar, setOpenModalVisualizar] = useState(false);
  const[entregadorSelecionado, setEntregadorSelecionado]= useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/entregador").then((response) => {
      setLista(response.data);
    });
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

       await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
       .then((response) => {
 
           console.log('Entregador removido com sucesso.')
 
           axios.get("http://localhost:8080/api/entregador")
           .then((response) => {
               setLista(response.data)
           })
       })
       .catch((error) => {
           console.log('Erro ao remover um entregador.')
       })
       setOpenModal(false)
   }

   async function verDados(id){
  try {
    const response = await axios.get(`http://localhost:8080/api/entregador/${id}`);
    setEntregadorSelecionado(response.data);
    setOpenModalVisualizar(true);
  } catch (error) {
    console.error("Erro ao buscar detalhes do entregador:", error);
  }
   
   }
  return (
    <div>
      <MenuSistema tela={"entregador"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Entregador </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-entregador"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>RG</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
   
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                  

                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((entregador) => (
                  <Table.Row key={entregador.id}>
                    <Table.Cell>{entregador.nome}</Table.Cell>
                    <Table.Cell>{entregador.cpf}</Table.Cell>
                    <Table.Cell>{entregador.rg}</Table.Cell>
                    <Table.Cell>
                      {formatarData(entregador.dataNascimento)}
                    </Table.Cell>
                    <Table.Cell>{entregador.foneCelular}</Table.Cell>
                    <Table.Cell>{entregador.foneFixo}</Table.Cell>
                    <Table.Cell textAlign="center">

                              <Button
          inverted
          circular
          icon='eye'
          color='orange'
          title="Clique aqui para visualizar os dados"
          onClick={() => verDados(entregador.id)}
        />

                     <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste entregador"
                        icon
                      >
                        <Link
                          to="/form-entregador"
                          state={{ id: entregador.id }}
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
                        title="Clique aqui para remover este entregador"
                        icon
                       onClick={e => confirmaRemover(entregador.id)}>
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
                   <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
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


<Modal
  onClose={() => setOpenModalVisualizar(false)}
  open={openModalVisualizar}
  size="large"
>
  <Header content='Detalhes Completos do Entregador' />
  <Modal.Content scrolling>
    {entregadorSelecionado &&(
      <Table definition celled color="orange">
        <Table.Body>
          <Table.Row>
            <Table.Cell width={4}>Nome</Table.Cell>
            <Table.Cell>{entregadorSelecionado.nome}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>CPF</Table.Cell>
            <Table.Cell>{entregadorSelecionado.cpf}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>RG</Table.Cell>
            <Table.Cell>{entregadorSelecionado.rg}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Data de Nascimento</Table.Cell>
            <Table.Cell>{formatarData(entregadorSelecionado.dataNascimento)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Fone Celular</Table.Cell>
            <Table.Cell>{entregadorSelecionado.foneCelular}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Fone Fixo</Table.Cell>
            <Table.Cell>{entregadorSelecionado.foneFixo}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>QTD. Entregas Realizadas</Table.Cell>
            <Table.Cell>{entregadorSelecionado.qtdEntregasRealizadas}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Valor Frete</Table.Cell>
            <Table.Cell>R$ {entregadorSelecionado.valorFrete}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Endereço (Rua/Nº)</Table.Cell>
            <Table.Cell>{entregadorSelecionado.enderecoRua}, {entregadorSelecionado.enderecoNumero}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Complemento</Table.Cell>
            <Table.Cell>{entregadorSelecionado.enderecoComplemento}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bairro</Table.Cell>
            <Table.Cell>{entregadorSelecionado.enderecoBairro}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cidade / UF</Table.Cell>
            <Table.Cell>{entregadorSelecionado.enderecoCidade} / {entregadorSelecionado.enderecoUf}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>CEP</Table.Cell>
            <Table.Cell>{entregadorSelecionado.enderecoCep}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Ativo</Table.Cell>
            <Table.Cell>{entregadorSelecionado.ativo ? "Sim" : "Não"}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )}
  </Modal.Content>
  <Modal.Actions>
    <Button color='orange' onClick={() => setOpenModalVisualizar(false)}>
      <Icon name='remove' /> sair
    </Button>
  </Modal.Actions>
</Modal>

    </div>
  );
}
