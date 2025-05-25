import { useState } from 'react';
import * as S from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import { Tabs } from "radix-ui";
import Card from '../components/Card';
import { calculateCDB, calculatePoupanca, calculateTesouroDireto } from '../utils/simulateInvestment';

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
  const [isLoading, setIsLoading] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const isDisabled = amount <= 0 || monthlyAmount < 0 || months <= 0;

  const simulateInvestment = (
    activeTab: InvestmentType,
    months: number,
    amount: number,
    monthlyAmount: number,
    cdiFee: number,
    cdiPercentage: number,
    selicFee: number,
  ) => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        if (activeTab === 'CDB') {
          const cdbResult = calculateCDB(amount, monthlyAmount, months, cdiFee, cdiPercentage);
          setFinalAmount(cdbResult.finalAmount);
          console.log('CDB Result:', cdbResult);
        }
        if (activeTab === 'Poupança') {
          const poupancaResult = calculatePoupanca(amount, monthlyAmount, months);
          setFinalAmount(poupancaResult.finalAmount);
          console.log('Poupança Result:', poupancaResult);
        }
        if (activeTab === 'Tesouro Direto') {
          const tesouroResult = calculateTesouroDireto(amount, monthlyAmount, months, selicFee);
          setFinalAmount(tesouroResult.finalAmount);
          console.log('Tesouro Direto Result:', tesouroResult);
        }
      } catch (error) {
        console.error('Error simulating investment:', error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.Title>Simulador de Investimentos</S.Title>
        <S.LoadingMessage>Carregando...</S.LoadingMessage>
      </S.Container>
    )
  }

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
            {finalAmount > 0 && (
              <S.ResultText>
                Valor final: R$ {finalAmount.toFixed(2)}
              </S.ResultText>
            )}
          </Card>

          <Button
            title='Simular'
            type='button'
            handleClick={() => {
              simulateInvestment(
                activeTab,
                months,
                amount,
                monthlyAmount,
                cdiFee,
                cdiPercentage,
                selicFee
              );
            }}
            disabled={isDisabled}
            ariaLabel='Clique para simular o investimento'
          />
        </Tabs.Root>
    </S.Container>
  );
}
