import { useState } from 'react';
import * as S from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';

const options = [
  { value: 'CDB', label: 'CDB (100% CDI)' },
  { value: 'Tesouro IPCA', label: 'Tesouro IPCA' },
  { value: 'Poupança', label: 'Poupança' },
];

export default function InvestmentSimulator() {
  const [amount, setAmount] = useState(1000);
  const [months, setMonths] = useState(12);
  const [type, setType] = useState<string>('CDB');


  return (
    <S.Container>
        <S.Title>Simulador de Investimentos</S.Title>
      <S.LabelContainer>
        <Input
          title='Valor inicial'
          type='number'
          value={amount}
          handleChange={(value: string | number) => setAmount(Number(value))}
        />
        <Input
          title='Tempo em meses'
          type='number'
          value={months}
          handleChange={(value: string | number) => setMonths(Number(value))}
        />
        <Select
          title='Tipo de investimento'
          ariaLabel='Selecione o tipo de investimento'
          handleChange={(value: string) => setType(value)}
          value={type}
          options={options}
        />
      </S.LabelContainer>

      <Button
        title='Simular'
        type='button'
        handleClick={() => console.log('Simulando...')}
        ariaLabel='Clique para simular o investimento'
      />
    </S.Container>
  );
}
