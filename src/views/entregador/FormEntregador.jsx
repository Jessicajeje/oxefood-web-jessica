import InputMask from "comigo-tech-react-input-mask";
import React from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

export default function FormEntregador() {
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input required fluid label="Nome" maxLength="100" />

                <Form.Input fluid label="CPF" width={6}>
                  <InputMask
                    placeholder="999.999.999-99"
                    mask="999.999.999-99"
                  />
                </Form.Input>

                <Form.Input fluid label="RG" width={6}>
                  <InputMask placeholder="00.000.000" mask="99.999.999" />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label="Data de Nascimento">
                  <InputMask placeholder="00/00/0000" mask="99/99/9999" />
                </Form.Input>

                <Form.Input required fluid label="Fone Celular">
                  <InputMask
                    placeholder="(00)00000-0000"
                    mask="(99)9 9999-9999"
                  />
                </Form.Input>

                <Form.Input required fluid label="Fone Fixo"></Form.Input>

                <Form.Input
                  required
                  fluid
                  label="QTD Entregas Realizadas"
                ></Form.Input>

                <Form.Input required fluid label="Valor por Frete"></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Rua" width={6}></Form.Input>

                <Form.Input fluid label="Número" width={6}>
                  <InputMask placeholder="0000" />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Bairro" width={6}></Form.Input>

                <Form.Input fluid label="Cidade" width={6}></Form.Input>

                <Form.Input fluid label="CEP" width={6}>
                  <InputMask placeholder="00000-000" />
                </Form.Input>
              </Form.Group>

              <Form.Input fluid label="UF"></Form.Input>

              <Form.Input fluid label="Complemento"></Form.Input>

              <Form.Group inline>
                <label>Ativo:</label>

                <Form.Radio label="Sim" name="ativo" value="true" />

                <Form.Radio label="Não" name="ativo" value="false" />
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
