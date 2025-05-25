import * as S from './styles';

interface Props {
  title: string;
  type: 'button' | 'submit' | 'reset';
  handleClick: (value: string) => void;
  ariaLabel: string;
  disabled?: boolean;
}

export default function Button({
  title, type, handleClick, ariaLabel, disabled = false,
}: Props) {
  return (
    <div>
      <S.Button
        type={type}
        aria-label={ariaLabel}
        onClick={() => handleClick('clicou')}
        disabled={disabled}
      >
        {title}
      </S.Button>
    </div>
  );
}
