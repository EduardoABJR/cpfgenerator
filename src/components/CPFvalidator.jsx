import { useState } from 'react';


const CpfValidator = () => {
  const [cpf, setCpf] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [state, setState] = useState('');
  const [error, setError] = useState('');

  const handleCpfChange = (event) => {
    const { value } = event.target;
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length <= 11) {
      setCpf(cleanedValue);
      setError('');
    }
  };

  const validateCpf = () => {
    if (cpf.length !== 11) {
      setError('CPF deve conter 11 dígitos');
      setIsValid(false);
      setState('');
      return;
    }

    const isValidCpf = validateDigits(cpf);

    setIsValid(isValidCpf);

    if (isValidCpf) {
      const stateCode = cpf.charAt(8);
      setState(getStateName(stateCode));
    } else {
      setState('');
    }
  };

  const validateDigits = (cleanedCpf) => {
    const digits = Array.from(cleanedCpf, Number);

    // Check if all digits are the same
    if (digits.every((digit) => digit === digits[0])) {
      return false;
    }

    let sum = 0;
    let weight = 10;

    // Calculate the first verification digit
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * weight;
      weight--;
    }

    let verificationDigit1 = (sum * 10) % 11;
    if (verificationDigit1 === 10) {
      verificationDigit1 = 0;
    }

    sum = 0;
    weight = 11;

    // Calculate the second verification digit
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * weight;
      weight--;
    }

    let verificationDigit2 = (sum * 10) % 11;
    if (verificationDigit2 === 10) {
      verificationDigit2 = 0;
    }

    return (
      verificationDigit1 === digits[9] && verificationDigit2 === digits[10]
    );
  };

  const getStateName = (stateCode) => {
    const states = {
      '1': 'Distrito Federal, Goiás, Mato Grosso do Sul e Tocantins',
      '2': 'Pará, Amazonas, Acre, Amapá, Rondônia e Roraima',
      '3': 'Ceará, Maranhão e Piauí',
      '4': 'Pernambuco, Rio Grande do Norte, Paraíba e Alagoas',
      '5': 'Bahia e Sergipe',
      '6': 'Minas Gerais',
      '7': 'Rio de Janeiro e Espírito Santo',
      '8': 'São Paulo',
      '9': 'Paraná e Santa Catarina',
      '0': 'Rio Grande do Sul',
    };

    return states[stateCode] || 'Estado desconhecido';
  };

  const clearCpf = () => {
    setCpf('');
    setIsValid(false);
    setState('');
    setError('');
  };

  return (
    <div>
      <input
        type="text"
       value={cpf}
        onChange={handleCpfChange}
        maxLength={11}
        placeholder="Digite o CPF (somente números)"
      />
      <button onClick={validateCpf}>Validar</button>
      <button onClick={clearCpf}>Limpar</button>
      {error && <p>{error}</p>}
      {isValid && <p>CPF é válido</p>}
      {!isValid && cpf.length === 11 && state.length >= 1 &&<p>CPF é inválido</p>}
      {state && <p>Estado: {state}</p>}
    </div>
  );
};

export default CpfValidator;

