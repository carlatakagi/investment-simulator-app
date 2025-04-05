import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  font-family: sans-serif;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-weight: bold;
`;

export const Input = styled.input`
  display: block;
  width: 150px;
  font-size: 1rem;
`;

export const Select = styled.select`
  display: block;
  font-size: 1rem;
  width: 150px;
`;

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  border-radius: 6px;

  &:hover {
    background-color: #45a049;
  }
`;

export const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;
