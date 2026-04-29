import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import axios from "axios";
import { notifyError, notifySuccess } from "../util/Util";

export default function FormEnderecoCliente() {

    const { id } = useParams();

    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [complemento, setComplemento] = useState('');

    function salvar() {
        let enderecoRequest = {
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            estado: estado,
            complemento: complemento
        }

        axios.post("http://localhost:8080/api/cliente/endereco/" + id, enderecoRequest)
            .then((response) => {
                notifySuccess('Endereço cadastrado com sucesso.');
            })
            .catch((error) => {
                notifyError('Erro ao incluir o endereço.');
            })
    }

    return (
        <div>
            <MenuSistema tela={"EnderecoCliente"} />

            <div style={{ marginTop: "3%" }}>
                <Container textAlign="justified">

                    <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Endereço </h2>

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
