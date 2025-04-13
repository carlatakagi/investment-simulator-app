import * as S from './styles.ts';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Card({
  title, children
}: Props) {
  console.log('Card component rendered');
  return (
    <S.CardContainer>
      <S.CardHeader>{title}</S.CardHeader>
      {children}
    </S.CardContainer>
  );
}
