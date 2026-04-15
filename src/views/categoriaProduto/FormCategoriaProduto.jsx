import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../../views/util/Util";

export default function FormCategoriaProduto() {

  const { state } = useLocation();

  const [idCategoria, setIdCategoria] = useState();
  const [descricao, setDescricao] = useState();

  useEffect(() => {

    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/CategoriaProduto/" + state.id)
        .then((response) => {
          setIdCategoria(response.data.id);
          setDescricao(response.data.descricao);
        });
    }

  }, [state]);

  function salvar() {

    let categoriaRequest = {
      descricao: descricao
    };

    if (idCategoria != null) {
      // Alteração
      axios
        .put("http://localhost:8080/api/CategoriaProduto/" + idCategoria, categoriaRequest)
        .then((response) => {
          notifySuccess("Categoria alterada com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao alterar a categoria.");
        });

    } else {
      // Cadastro
      axios
        .post("http://localhost:8080/api/CategoriaProduto", categoriaRequest)
        .then((response) => {
          notifySuccess("Categoria cadastrada com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao incluir a categoria.");
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"CategoriaProduto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">

          {!idCategoria && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Categoria &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Cadastro
            </h2>
          )}

          {idCategoria && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Categoria &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>

              <Form.Input
                required
                fluid
                label="Descrição da Categoria"
                maxLength="100"
                value={descricao || ""}
                onChange={(e) => setDescricao(e.target.value)}
              />

            </Form>

            <div style={{ marginTop: "4%" }}>

              <Link to={"/list-categoriaproduto"}>
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
                Salvar
              </Button>

            </div>

          </div>
        </Container>
      </div>
    </div>
  );
}