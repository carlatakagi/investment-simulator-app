import * as S from './styles';

interface Props {
  title: string;
  type: 'button' | 'submit' | 'reset';
  handleClick: (value: string) => void;
  ariaLabel: string;
}

export default function Button({
  title, type, handleClick, ariaLabel
}: Props) {
  return (
    <div>
      <S.Button
        type={type}
        aria-label={ariaLabel}
        onClick={() => handleClick('clicou')}
      >
        {title}
      </S.Button>
    </div>
  );
}
