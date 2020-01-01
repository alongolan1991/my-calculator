import React from "react";
import styled from "styled-components";

import Icon from "../UI/Icon/Icon";
import backSpaceIcon from "../../assets/backspace.png";
import * as constants from "../../constants";

const Screen = ({ expression, result, onBackspaceClick }) => {
  return (
    <Container>
      <Icon
        onClick={() => onBackspaceClick(constants.commands.backspace)}
        icon={backSpaceIcon}
      />
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
  align-items: flex-end;
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
