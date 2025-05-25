import styled from "styled-components";

export const Container = styled.div`
  max-width: 750px;
  margin: auto;
  padding: 2rem;
  font-family: sans-serif;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

export const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
`;



export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TabsContainer = styled.div`
  overflow: hidden;
  border: 1px solid rgb(247, 247, 247);
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 0px;
`;

export const Tab = styled.button`
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  width: 150px;
`;

export const CardContent = styled.div`
  padding: 16px;
  font-size: 1rem;
  color: #333;
  gap: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const ResultText = styled.p`
  font-size: 1rem;
  color: #333;
  text-align: center;
  font-weight: bold;
`;
