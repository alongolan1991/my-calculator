import React from "react";
import styled from "styled-components";

const result = props => {
  return (
    <>
      <CalculatorResult>
        <MathExpressioni>{props.Expression}</MathExpressioni>
        <Result>{props.result}</Result>
      </CalculatorResult>
    </>
  );
};

export default result;

const CalculatorResult = styled.div`
  width: 100%;
  height: 200px;
  padding: 20px;
  /* border : 1px solid black; */
  background-color : #edebe6;
  box-sizing: border-box;
`;

const MathExpressioni = styled.p`
  width: 100%;
  height: 50%;
  text-align: right;
  font-weight: bold;
`;

const Result = styled.h1`
  width: 100%;
  height: 50%;
  text-align: right;
  font-weight: bold;
`;
