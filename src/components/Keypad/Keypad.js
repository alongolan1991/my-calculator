import React from "react";
import styled from "styled-components";

import Button from "../UI/Button/Button";

const Keypad = ({ onClick }) => {
  return (
    <Container>
      <Button value="AC" onClick={onClick} />
      <Button value="(" onClick={onClick} />
      <Button value=")" onClick={onClick} />
      <OperatorButton value="/" onClick={onClick} />
      <Button value="7" onClick={onClick} />
      <Button value="8" onClick={onClick} />
      <Button value="9" onClick={onClick} />
      <OperatorButton value="*" onClick={onClick} />
      <Button value="4" onClick={onClick} />
      <Button value="5" onClick={onClick} />
      <Button value="6" onClick={onClick} />
      <OperatorButton value="-" onClick={onClick} />
      <Button value="1" onClick={onClick} />
      <Button value="2" onClick={onClick} />
      <Button value="3" onClick={onClick} />
      <OperatorButton value="+" onClick={onClick} />
      <Button value="0" onClick={onClick} />
      <Button value="." onClick={onClick} />
      <Button value="%" onClick={onClick} />
      <EqualSignButton value="=" onClick={onClick} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 400px;
  border-top: 1px solid black;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;

const OperatorButton = styled(Button)`
  color: #ffd133;
`;

const EqualSignButton = styled(Button)`
  background-color: #ffd133;
  color: white;
`;

export default Keypad;
