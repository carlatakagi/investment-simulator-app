// biome-ignore lint/style/useImportType: <explanation>
import { InvestmentType } from '../../pages/InvestmentSimulator';
import * as S from './styles';

interface Props {
  title: string;
  ariaLabel: string;
  handleChange: (value: string | InvestmentType | number) => void;
  value: string | number | InvestmentType;
  options: Array<{ value: string; label: string }>;
}

export default function Select({
  title, ariaLabel, handleChange, value, options
}: Props) {
  return (
    <div>
      <div>
          <p>{title}</p>
          <S.Select
            value={value}
            aria-label={ariaLabel}
            onChange={(e) => handleChange(e.target.value)}
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </S.Select>
      </div>
    </div>
  );
}
