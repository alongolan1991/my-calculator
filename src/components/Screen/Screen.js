import React from "react";
import styled from "styled-components";

import Icon from "../UI/Icon/Icon";
import backSpaceIcon from "../../assets/backspace.png";

const Screen = ({ expression, result, onClick }) => {
  return (
    <Container>
      <Icon command="BACKSPACE" onClick={onClick} icon={backSpaceIcon} />
      <MathExpression>{expression}</MathExpression>
      <Result error={result === "error"}>{result}</Result>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 200px;
  padding: 20px;
  background-color: #edebe6;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const MathExpression = styled.h2`
  flex: 1;
  font-weight: bold;
  margin: 0;
`;

const Result = styled.h2`
  flex: 1;
  font-weight: bold;
  margin: 0;
  color: ${props => (props.error ? "red" : "black")};
`;

export default Screen;
