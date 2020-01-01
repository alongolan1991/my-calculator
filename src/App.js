import React, { Component } from "react";
import styled from "styled-components";

import Screen from "./components/Screen/Screen";
import Keypad from "./components/Keypad/Keypad";
import * as constants from "./components/constants";

class App extends Component {
  state = {
    mathExpression: "",
    result: "0",
    finishedCalculation: false // determines if to start a new expression or continue constructing result
  };

  buttonClickedHandler = command => {
    switch (command) {
      case constants.commands.equal: {
        this.setResult();
        break;
      }
      case constants.commands.AC: {
        this.reset();
        break;
      }
      case constants.commands.backspace: {
        this.backSpace();
        break;
      }
      default: {
        this.updateScreen(command); // all other command go here!!
      }
    }
  };

  updateScreen = command => {
    let newState = { finishedCalculation: false };
    if (this.state.finishedCalculation && this.isNumber(command)) {
      newState = { ...newState, mathExpression: "", result: 0 };
    }
    this.setState(newState, () => {
      const nextChar = this.getNextChar(command); // determine next char to append
      if (nextChar !== "") {
        let tempExpression = this.state.mathExpression;
        tempExpression = `${tempExpression}${nextChar}`;
        this.setState({ mathExpression: tempExpression });
      }
    });
  };

  // restart the calculator after AC button clicked
  reset = () => {
    this.setState({
      mathExpression: "",
      result: 0,
      finishedCalculation: false
    });
  };

  // delete the last char from mathExpression after backspace button clicked
  backSpace = () => {
    let tempMathExpression = this.state.mathExpression.slice(0, -1);
    this.setState({ mathExpression: tempMathExpression });
  };

  // calculate the mathExpression & update the result
  setResult = () => {
    if (this.state.mathExpression.length === 0) {
      return;
    }
    try {
      // eslint-disable-next-line
      const tempResult = eval(this.state.mathExpression);
      this.setState({
        result: tempResult,
        mathExpression: tempResult.toString(),
        finishedCalculation: true
      });
    } catch (error) {
      console.log(error);
      this.setState({ result: "error", finishedCalculation: true });
    }
  };

  // determine the next char/characters to append
  getNextChar = command => {
    let nextChar = command;
    const { mathExpression } = this.state;
    const lastExpressionChar = mathExpression[mathExpression.length - 1];
    
    // if the first command is "." so add 0 to begin
    if (mathExpression === "" && command === constants.dot) {
      nextChar = `${constants.digits.zero}${constants.dot}`;
    }
    // check if the first command is "* / 0"
    if (
      mathExpression === "" &&
      (command === constants.operators.multiply || command === constants.operators.devide || command === constants.digits.zero)
    ) {
      nextChar = "";
    }
    // check if "(" comes after a number and if does not add "*"
    if (this.isNumber(lastExpressionChar) && command === constants.parenthesis.opening) {
      nextChar = `${constants.operators.multiply}${command}`;
    }
    // check if number comes after ")" and if it does add "*"
    if (lastExpressionChar === constants.parenthesis.closing && this.isNumber(command)) {
      nextChar = `${constants.operators.multiply}${command}`;
    }
    // check if that there is only 1 dot in single number
    if (command === constants.dot) {
      let dotFlag = false;
      mathExpression.split("").forEach(el => {
        if (el === constants.dot) {
          dotFlag = true;
        }
        if (Object.values(constants.operators).includes(el)) {
          dotFlag = false;
        }
      });
      if (dotFlag) {
        nextChar = "";
      }
    }
    // check if multiple ** or // or */ or /* or +/ or */
    if (
      (lastExpressionChar === constants.operators.multiply && (command === constants.operators.devide || command === constants.operators.multiply)) ||
      (lastExpressionChar === constants.operators.devide && (command === constants.operators.devide || command === constants.operators.multiply)) ||
      (lastExpressionChar === constants.operators.plus &&
        (command === constants.operators.devide || command === constants.operators.multiply || command === constants.operators.plus)) ||
      (lastExpressionChar === constants.operators.minus &&
        (command === constants.operators.devide || command === constants.operators.multiply || command === constants.operators.minus))
    ) {
      nextChar = "";
    }
    // check if the operator "*,/,+,-" come before ")"
    if (command === constants.parenthesis.closing) {
      if (Object.values(constants.operators).includes(lastExpressionChar)) {
        nextChar = "";
      }
      // validate parenthesis
      let openParenthesis = 0;
      mathExpression.split("").forEach(el => {
        if (el === constants.parenthesis.opening) {
          openParenthesis++;
        }
        if (el === constants.parenthesis.closing) {
          openParenthesis--;
        }
      });
      if (openParenthesis <= 0) {
        nextChar = "";
      }
    }
    // check if after '(' not come '),*,/' imiddate;
    if (
      lastExpressionChar === constants.parenthesis.opening &&
      (command === constants.parenthesis.closing || command === constants.operators.multiply || command === constants.operators.devide)
    ) {
      nextChar = "";
    }
    // check if before modolu we have number
    if (command === constants.mod && !this.isNumber(lastExpressionChar)) {
      nextChar = "";
    }
    // check if the maximum length of the math expression greater then 23 chars
    if (this.state.mathExpression.length >= 23) {
      nextChar = "";
    }
    return nextChar;
  };

  isNumber = number => {
    return !isNaN(number);
  };

  render() {
    return (
      <Calculator>
        <Screen
          onBackspaceClick={this.buttonClickedHandler}
          expression={this.state.mathExpression}
          result={this.state.result}
        />
        <Keypad onClick={this.buttonClickedHandler} />
      </Calculator>
    );
  }
}

const Calculator = styled.div`
  width: 360px;
  height: 600px;
  border: 1px solid black;
  margin: 5% auto;
`;

export default App;