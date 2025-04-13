import { Label } from '@radix-ui/react-label';
import * as S from './styles';

interface Props {
  title: string;
  type: string;
  handleChange: (value: string | number) => void;
  value: string | number;
}

export default function Input({
  title, type, handleChange, value
}: Props) {
  return (
    <div>
      <Label>{title}</Label>
      <S.Input
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
