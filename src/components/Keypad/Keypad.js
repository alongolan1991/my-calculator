import React from "react";
import styled from "styled-components";

import Button from "../UI/Button/Button";
import * as constants from '../constants'

const Keypad = ({ onClick }) => {
  return (
    <Container>
      <Button value={constants.commands.AC} onClick={onClick} />
      <Button value={constants.parenthesis.opening} onClick={onClick} />
      <Button value={constants.parenthesis.closing} onClick={onClick} />
      <OperatorButton value={constants.operators.devide} onClick={onClick} />
      <Button value={constants.digits.seven} onClick={onClick} />
      <Button value={constants.digits.eight} onClick={onClick} />
      <Button value={constants.digits.nine} onClick={onClick} />
      <OperatorButton value={constants.operators.multiply} onClick={onClick} />
      <Button value={constants.digits.four} onClick={onClick} />
      <Button value={constants.digits.five} onClick={onClick} />
      <Button value={constants.digits.six} onClick={onClick} />
      <OperatorButton value={constants.operators.minus} onClick={onClick} />
      <Button value={constants.digits.one} onClick={onClick} />
      <Button value={constants.digits.two} onClick={onClick} />
      <Button value={constants.digits.three} onClick={onClick} />
      <OperatorButton value={constants.operators.plus} onClick={onClick} />
      <Button value={constants.digits.zero} onClick={onClick} />
      <Button value={constants.dot} onClick={onClick} />
      <Button value={constants.mod} onClick={onClick} />
      <EqualSignButton value={constants.commands.equal} onClick={onClick} />
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
