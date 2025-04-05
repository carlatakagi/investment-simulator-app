import { useState } from 'react';
import * as S from './styles';

export default function InvestmentSimulator() {
  const [amount, setAmount] = useState(1000);
  const [months, setMonths] = useState(12);
  const [type, setType] = useState<string>('CDB');


  return (
    <S.Container>
        <S.Title>Simulador de Investimentos</S.Title>

      <S.LabelContainer>
          <div>
              <div>
                  <p>Valor inicial:</p>
                  <S.Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  />
              </div>
          </div>

          <div>
              <div>
                  <p>Tempo (meses):</p>
                  <S.Input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  />
              </div>
          </div>

          <div>
              <div>
                <p>Investimento:</p>
                  <S.Select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="CDB">CDB (100% CDI)</option>
                    <option value="Tesouro IPCA">Tesouro IPCA</option>
                    <option value="Poupança">Poupança</option>
                  </S.Select>
              </div>
          </div>
      </S.LabelContainer>

      <S.Button
      type='submit'
      onClick={() => console.log('clicou')}
      >
        Simular
      </S.Button>


    </S.Container>
  );
}
