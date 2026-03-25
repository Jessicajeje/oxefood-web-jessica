import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import {useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormEntregador() {

    const {state} = useLocation();
  const [idEntregador, setIdEntregador] = useState();
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [rg, setRg] = useState();
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
  const [valorFrete, setValorFrete] = useState();
  const [dataNascimento, setDataNascimento] = useState();
const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [enderecoRua, setEnderecoRua] = useState();
  const [enderecoComplemento, setEnderecoComplemento] = useState();
  const [enderecoNumero, setEnderecoNumero] = useState();
  const [enderecoBairro, setEnderecoBairro] = useState();
  const [enderecoCidade, setEnderecoCidade] = useState();
  const [enderecoCep, setEnderecoCep] = useState();
  const [ativo, setAtivo] = useState();
  const [enderecoUf, setEnderecoUf] = useState();
  const opcoesEstados = [
    { key: "AC", text: "Acre", value: "AC" },
    { key: "AL", text: "Alagoas", value: "AL" },
    { key: "AP", text: "Amapá", value: "AP" },
    { key: "AM", text: "Amazonas", value: "AM" },
    { key: "BA", text: "Bahia", value: "BA" },
    { key: "CE", text: "Ceará", value: "CE" },
    { key: "DF", text: "Distrito Federal", value: "DF" },
    { key: "ES", text: "Espírito Santo", value: "ES" },
    { key: "GO", text: "Goiás", value: "GO" },
    { key: "MA", text: "Maranhão", value: "MA" },
    { key: "MT", text: "Mato Grosso", value: "MT" },
    { key: "MS", text: "Mato Grosso do Sul", value: "MS" },
    { key: "MG", text: "Minas Gerais", value: "MG" },
    { key: "PA", text: "Pará", value: "PA" },
    { key: "PB", text: "Paraíba", value: "PB" },
    { key: "PR", text: "Paraná", value: "PR" },
    { key: "PE", text: "Pernambuco", value: "PE" },
    { key: "PI", text: "Piauí", value: "PI" },
    { key: "RJ", text: "Rio de Janeiro", value: "RJ" },
    { key: "RN", text: "Rio Grande do Norte", value: "RN" },
    { key: "RS", text: "Rio Grande do Sul", value: "RS" },
    { key: "RO", text: "Rondônia", value: "RO" },
    { key: "RR", text: "Roraima", value: "RR" },
    { key: "SC", text: "Santa Catarina", value: "SC" },
    { key: "SP", text: "São Paulo", value: "SP" },
    { key: "SE", text: "Sergipe", value: "SE" },
    { key: "TO", text: "Tocantins", value: "TO" },
  ];
  
  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/entregador/" + state.id)
        .then((response) => {
          setIdEntregador(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setRg(response.data.rg);
          setDataNascimento(response.data.dataNascimento);
          setFoneCelular(response.data.foneCelular);
          setValorFrete(response.data.valorFrete);
          setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas);
          setEnderecoRua(response.data.enderecoRua);
          setEnderecoComplemento(response.data.enderecoComplemento);
          setEnderecoCep(response.data.enderecoCep);
          setEnderecoBairro(response.data.enderecoBairro);
          setEnderecoCidade(response.data.enderecoCidade);
          setEnderecoNumero(response.data.enderecoNumero);
          setEnderecoUf(response.data.enderecoUf);
          setAtivo(response.data.ativo);
        });
    }
  }, [state]);

  function salvar() {
    let entregadorRequest = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: qtdEntregasRealizadas,
      valorFrete: valorFrete,
      enderecoRua: enderecoRua,
      enderecoComplemento: enderecoComplemento,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCidade: enderecoCidade,
      enderecoCep: enderecoCep,
      enderecoUf: enderecoUf,
      ativo: ativo,
    };

 if (idEntregador != null) {
      //Alteração:
      axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
        .then((response) => {
          console.log("Entregador alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alterar um Entregador.");
        });
    } else {
      //Cadastro:
      axios.post("http://localhost:8080/api/entregador", entregadorRequest)
        .then((response) => {
          console.log("Entregador cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o entregador.");
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"Entregador"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
 
 { idEntregador === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}

{ idEntregador !== undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Form.Input fluid label="CPF" width={6}>
                  <InputMask
                    placeholder="999.999.999-99"
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="RG" width={6}>
                  <InputMask
                    placeholder="00.000.000"
                    mask="99.999.999"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label="Data de Nascimento">
                  <InputMask
                    placeholder="00/00/0000"
                    mask="99/99/9999"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required fluid label="Fone Celular">
                  <InputMask
                    placeholder="(00)00000-0000"
                    mask="(99)9 9999-9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required fluid label="Fone Fixo">
                  <InputMask
                    placeholder="(00)00000-0000"
                    mask="(99)9 9999-9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required fluid label="QTD Entregas Realizadas">
                  <InputMask
                    value={qtdEntregasRealizadas}
                    onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                  ></InputMask>
                </Form.Input>

                <Form.Input required fluid label="Valor por Frete">
                  <InputMask
                    value={valorFrete}
                    onChange={(e) => setValorFrete(e.target.value)}
                  ></InputMask>
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label="Rua"
                  width={6}
                  value={enderecoRua}
                  onChange={(e) => setEnderecoRua(e.target.value)}
                ></Form.Input>

                <Form.Input fluid label="Número" width={6}>
                  <InputMask
                    placeholder="0000"
                    value={enderecoNumero}
                    onChange={(e) => setEnderecoNumero(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label="Bairro"
                  width={6}
                  value={enderecoBairro}
                  onChange={(e) => setEnderecoBairro(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Cidade"
                  width={6}
                  value={enderecoCidade}
                  onChange={(e) => setEnderecoCidade(e.target.value)}
                ></Form.Input>

                <Form.Input fluid label="CEP" width={6}>
                  <InputMask
                    placeholder="00000-000"
                    value={enderecoCep}
                    onChange={(e) => setEnderecoCep(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Select
                fluid
                label="UF"
                options={opcoesEstados}
                placeholder="Selecione"
                value={enderecoUf}
                onChange={(e, { value }) => setEnderecoUf(value)}
              />

              <Form.Input
                fluid
                label="Complemento"
                value={enderecoComplemento}
                onChange={(e) => setEnderecoComplemento(e.target.value)}
              ></Form.Input>

              <Form.Group inline>
                <label>Ativo:</label>
                <Form.Radio
                  label="Sim"
                  name="radioGroup"
                  value={true}
                  checked={ativo === true}
                  onChange={() => setAtivo(true)}
                />
                <Form.Radio
                  label="Não"
                  name="radioGroup"
                  value={false}
                  checked={ativo === false}
                  onChange={() => setAtivo(false)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={'/list-entregador'}>
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
