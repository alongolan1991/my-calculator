import React from "react";
import styled from "styled-components";

const button = ({ command, clicked }) => {
  let text,
    bgcolor = null;
  if (
    command === "+" ||
    command === "-" ||
    command === "/" ||
    command === "*"
  ) {
    text = "#FFD133";
  }
  if (command === "=") {
    bgcolor = "#FFD133";
    text = "white";
  }

  return (
    <>
      <CalculatorButton text={text} bgcolor={bgcolor} onClick={clicked}>
        {command}
      </CalculatorButton>
    </>
  );
};

export default button;

const CalculatorButton = styled.button`
  width: 25%;
  height: 20%;
  padding: 3px;
  border: none;
  font-size: 150%;
  font-weight: bold;
  box-sizing: border-box;
  background-color: ${props => props.bgcolor || "white"};
  color: ${props => props.text || "black"};
  outline : none;
  &:hover {
    background-color: rgba(255, 134, 51, 0.3);
    border-radius: 500px;
    color: black;
  }
`;
