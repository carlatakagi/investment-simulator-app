import { useState } from 'react';
import * as S from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import { Tabs } from "radix-ui";
import Card from '../components/Card';

export type Option = {
  value: string;
  label: string;
}

export type InvestmentType = 'CDB' | 'Tesouro Direto' | 'Poupança';

const options: Option[] = [
  { value: 'Poupança', label: 'Poupança' },
  { value: 'Tesouro Direto', label: 'Tesouro Direto' },
  { value: 'CDB', label: 'CDB (100% CDI)' },
];

export default function InvestmentSimulator() {
  const [amount, setAmount] = useState(1000);
  const [monthlyAmount, setMonthlyAmount] = useState(100);
  const [months, setMonths] = useState(12);
  const [activeTab, setActiveTab] = useState<InvestmentType>('Poupança');
  const [selicFee, setSelicFee] = useState(14.25);
  const [cdiFee, setCdiFee] = useState(0);
  const [cdiPercentage, setCdiPercentage] = useState(100);

  const simulateInvestment = (activeTab: InvestmentType, months: number, amount: number) => {
    switch (activeTab) {
      case 'CDB':
        console.log('Simulando CDB...', activeTab);
        break;
      case 'Tesouro Direto':
        console.log('Simulando Tesouro Direto...', months);
        break;
      case 'Poupança':
        console.log('Simulando Poupança...', amount);
        break;
      default:
        console.log('Tipo de investimento inválido.');
    }
  };

  return (
    <S.Container>
      <S.Title>Simulador de Investimentos</S.Title>
        <Tabs.Root value={activeTab} orientation="horizontal" onValueChange={(value: string) => setActiveTab(value as InvestmentType)}>
          <S.TabsContainer>
              <Tabs.List aria-label="Investment Types">
                {options.map((option) => (
                  <Tabs.Trigger
                    key={option.value}
                    value={option.value}
                    aria-label={option.label}
                    style={{
                      width: 225,
                      backgroundColor: activeTab === option.value ? '#ddd' : 'transparent',
                    }}
                  >
                    {option.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
          </S.TabsContainer>
          <Card title="Preencha os dados abaixo para simular o seu investimento.">
            <S.CardContent>
              <Input
                title='Valor inicial (R$)'
                type='text'
                value={amount}
                handleChange={(value: string | number) => setAmount(Number(value))}
              />
              <Input
                title='Aporte mensal (R$)'
                type='text'
                value={monthlyAmount}
                handleChange={(value: string | number) => setMonthlyAmount(Number(value))}
              />
              <Input
                title='Tempo em meses'
                type='text'
                value={months}
                handleChange={(value: string | number) => setMonths(Number(value))}
              />
            </S.CardContent>
            {activeTab === 'Tesouro Direto' && (
              <S.CardContent>
                <Input
                  title='Taxa SELIC (% ao ano)'
                  type='text'
                  value={selicFee}
                  handleChange={(value: string | number) => setSelicFee(Number(value))}
                />
              </S.CardContent>
            )}
            {activeTab === 'CDB' && (
              <S.CardContent>
                <Input
                  title='Taxa CDI (% ao ano)'
                  type='text'
                  value={cdiFee}
                  handleChange={(value: string | number) => setCdiFee(Number(value))}
                />
                <Input
                  title='% do CDI'
                  type='text'
                  value={cdiPercentage}
                  handleChange={(value: string | number) => setCdiPercentage(Number(value))}
                />
              </S.CardContent>
            )}
          </Card>

          <Button
            title='Simular'
            type='button'
            handleClick={() => simulateInvestment(activeTab, months, amount)}
            ariaLabel='Clique para simular o investimento'
          />
        </Tabs.Root>
    </S.Container>
  );
}
