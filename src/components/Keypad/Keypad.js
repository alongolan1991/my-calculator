import React from "react";
import styled from 'styled-components';
import Button from '../UI/Button/Button';

const key = ['AC','(',')','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','%','='];

const keypad = props => {
  return <CalculatorKeyPad>
      {key.map(button => {
          return <Button key={button} clicked={() => props.clicked(button)} command={button} />
      })}

  </CalculatorKeyPad>;
};

export default keypad;

const CalculatorKeyPad = styled.div`
width : 100%;
height : 400px;
border-top : 1px solid black;
box-sizing : border-box;
display : flex;
flex-wrap : wrap;
`