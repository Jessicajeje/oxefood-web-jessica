import InputMask from "comigo-tech-react-input-mask";
import React from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

export default function FormProduto() {
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Produto &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input required fluid label="Título" maxLength="100" />

                <Form.Input fluid label="Código do Produto" maxLength="100">
                  <InputMask 
                  placeholder="Informe o código do Produto" 
                  />
                </Form.Input>
              </Form.Group>

              <Form.Input 
              required fluid label="Descrição">

                <InputMask
                 placeholder="Informe a descrição do produto"
                  />
              </Form.Input>

              <Form.Group>
                <Form.Input 
                
                fluid label="Valor unitário" width={6}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de Entrega Mínimo em Minutos"
                  width={6}
                >
                  <InputMask placeholder="30" />
                </Form.Input>

                      <Form.Input
                  fluid
                  label="Tempo de Entrega Máximo em Minutos"
                  width={6}
                >
                  <InputMask
                  placeholder="40" />

                </Form.Input>

              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
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

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
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
