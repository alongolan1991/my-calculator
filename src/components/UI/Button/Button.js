import React from "react";
import styled from "styled-components";

const Button = ({ onClick, className, value }) => {
  return (
    <Container className={className} onClick={() => onClick(value)}>
      {value}
    </Container>
  );
};

const Container = styled.button`
  width: 25%;
  height: 20%;
  padding: 3px;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  box-sizing: border-box;
  background-color: white;
  color: black;
  outline: none;

  &:hover {
    background-color: rgba(255, 134, 51, 0.3);
  }

  &:active {
    background-color: rgba(255, 134, 51, 0.7);
  }
`;

export default Button;
