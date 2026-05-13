import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import axios from "axios";
import { notifyError, notifySuccess } from "../util/Util";

export default function FormEnderecoCliente() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [idEndereco, setIdEndereco] = useState(state?.idEndereco);
  const [idCliente, setIdCliente] = useState(state?.idCliente);
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");

  useEffect(() => {
    if (state != null && state.idEndereco != null) {
      axios
        .get("http://localhost:8080/api/cliente/endereco/" + state.idEndereco)
        .then((response) => {
          const endereco = response.data;
          if (endereco.cliente) {
            setIdCliente(endereco.cliente.id);
          }
          setIdEndereco(endereco.id);
          setRua(endereco.rua);
          setNumero(endereco.numero);
          setBairro(endereco.bairro);
          setCep(endereco.cep);
          setCidade(endereco.cidade);
          setEstado(endereco.estado);
          setComplemento(endereco.complemento);
        })
        .catch((error) => {
          notifyError("Erro ao buscar o endereço.");
        });
    }
  }, [state]);

  function salvar() {
    let enderecoRequest = {
      rua: rua,
      numero: numero,
      bairro: bairro,
      cep: cep,
      cidade: cidade,
      estado: estado,
      complemento: complemento,
    };

    if (idEndereco != null) {
      // ALTERAÇÃO
      axios
        .put(
          "http://localhost:8080/api/cliente/endereco/" + idEndereco,
          enderecoRequest,
        )
        .then((response) => {
          notifySuccess("Endereço alterado com sucesso.");
          navigate("/list-cliente");
        })
        .catch((error) => notifyError("Erro ao alterar o endereço."));
    } else {
      // CADASTRO
      axios
        .post(
          "http://localhost:8080/api/cliente/endereco/" + idCliente,
          enderecoRequest,
        )
        .then((response) => {
          notifySuccess("Endereço cadastrado com sucesso.");
          navigate("/list-cliente");
        })
        .catch((error) => notifyError("Erro ao incluir o endereço."));
    }
  }

  return (
    <div>
      <MenuSistema tela={"EnderecoCliente"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEndereco === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Endereço &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}

          {idEndereco !== undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Endereço &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Rua (Logradouro)"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Número"
                  width={4}
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                />
              </Form.Group>

              <Form.Input
                fluid
                label="Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-cliente"}>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  Voltar
                </Button>
              </Link>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar Endereço
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
