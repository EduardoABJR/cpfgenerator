import React from 'react';
import './GeradorCPF.css'

class GeradorCPF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpfs: [],
      quantidade: 1 // Definir o valor padrão da quantidade como 1
    };
    this.gerarCPF = this.gerarCPF.bind(this);
    this.selecionarQuantidade = this.selecionarQuantidade.bind(this);
    this.limparCPFs = this.limparCPFs.bind(this); // Adicionamos a função para limpar os CPFs
  }

  gerarCPF() {
    function gerarNumeroAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function calcularDigitoVerificador(cpfParcial) {
      const soma = cpfParcial.reduce((acc, digit, i) => {
        return acc + digit * (cpfParcial.length + 1 - i);
      }, 0);

      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    }

    function formatarCPF(cpf) {
      const bloco1 = cpf.slice(0, 3);
      const bloco2 = cpf.slice(3, 6);
      const bloco3 = cpf.slice(6, 9);
      const digitoVerificador = cpf.slice(9, 11);

      return `${bloco1}.${bloco2}.${bloco3}-${digitoVerificador}`;
    }

    function todosDigitosIguais(cpfParcial) {
      const primeiroDigito = cpfParcial[0];
      return cpfParcial.every(digit => digit === primeiroDigito);
    }

    const quantidade = this.state.quantidade;
    const cpfsGerados = [];

    while (cpfsGerados.length < quantidade) {
      let cpfParcial = Array.from({ length: 9 }, () => gerarNumeroAleatorio(0, 9));
      const digitoVerificador1 = calcularDigitoVerificador(cpfParcial);
      cpfParcial.push(digitoVerificador1);
      const digitoVerificador2 = calcularDigitoVerificador(cpfParcial);
      cpfParcial.push(digitoVerificador2);

      if (!todosDigitosIguais(cpfParcial)) {
        const novoCPF = formatarCPF(cpfParcial.join(''));
        cpfsGerados.push(novoCPF);
      }
    }

    this.setState({ cpfs: cpfsGerados });
  }

  selecionarQuantidade(event) {
    const quantidade = parseInt(event.target.value);
    this.setState({ quantidade });
  }

  limparCPFs() {
    this.setState({ cpfs: [] });
  }

  render() {
    const { cpfs } = this.state;

    return (
      <div>
        <div>
          <label htmlFor="quantidade">Quantidade de CPFs a ser gerados:</label>
          <input type="number" id="quantidade" min="1" max='100' onChange={this.selecionarQuantidade} />
        </div>
        <button onClick={this.gerarCPF} disabled={cpfs.length > 0}>Gerar CPFs</button>

        
        <button onClick={this.limparCPFs} disabled={cpfs.length === 0}>Limpar CPFs</button>
        {cpfs.length > 0 && (
          <div>
            <h4>CPFs gerados:</h4>
            <ul>
              {cpfs.map((cpf, index) => (
                <li key={index}>{cpf}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default GeradorCPF;

