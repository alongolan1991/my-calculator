import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import Screen from "./components/Screen/Screen";
import Keypad from "./components/Keypad/Keypad";

class App extends Component {
  state = {
    mathExpression: "",
    result: "0",
    afterResult: false // afterResult check if you want start new expression or continue with result
  };

  // Check which command was received and handle it
  buttonClickedHandler = command => {
    if (command === "=") {
      this.setResult();
    } else if (command === "AC") {
      this.reset();
    } else if (command === "BACKSPACE") {
      this.backspace();
    } else {
      this.calculateNextStep(command); // all other command go here!!
    }
  };

  // check if need to continue with the result or start new expression
  calculateNextStep = command => {
    let newState = { afterResult: false };
    if (this.state.afterResult && this.isNumber(command)) {
      newState = { ...newState, mathExpression: "", result: 0 };
    }
    this.setState(newState, () => {
      command = this.validation(command); // send the command to validate and return new validated command
      if (command) {
        let tempExpression = this.state.mathExpression;
        tempExpression += command;
        this.setState({ mathExpression: tempExpression });
      }
    });
  };

  // restart the calculator after AC button clicked
  reset = () => {
    this.setState({ mathExpression: "", result: 0, afterResult: false });
  };

  // delete the last char from mathExpression after backspace button clicked
  backspace = () => {
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
        afterResult: true
      });
    } catch (error) {
      console.log(error);
      this.setState({ result: "error", afterResult: true });
    }
  };

  // check if the input is  valid and handel error in some cases
  validation = command => {
    let tempMathExpression = this.state.mathExpression;
    let lastExpressionChar = tempMathExpression[tempMathExpression.length - 1];

    // if the first command is "." so add 0 to begin!
    if (tempMathExpression === "" && command === ".") {
      command = "0.";
    }
    // check if the first command is "* / 0"
    if (
      tempMathExpression === "" &&
      (command === "*" || command === "/" || command === "0")
    ) {
      command = false;
    }
    // check if "(" come after number and if not add "*"
    if (this.isNumber(lastExpressionChar) && command === "(") {
      command = "*(";
    }
    // check if number come after ")" and if not add "*"
    if (lastExpressionChar === ")" && this.isNumber(command)) {
      command = "*" + command;
    }
    // check if thet only 1 dot in single number
    if (command === ".") {
      let dotFlag = false;
      tempMathExpression.split("").map(el => {
        if (el === ".") {
          dotFlag = true;
        }
        if (el === "*" || el === "/" || el === "+" || el === "-") {
          dotFlag = false;
        }
        return el;
      });
      if (dotFlag) {
        command = false;
      }
    }
    // check if multiple ** or // or */ or /* or +/ or */
    if (
      (lastExpressionChar === "*" && (command === "/" || command === "*")) ||
      (lastExpressionChar === "/" && (command === "/" || command === "*")) ||
      (lastExpressionChar === "+" &&
        (command === "/" || command === "*" || command === "+")) ||
      (lastExpressionChar === "-" &&
        (command === "/" || command === "*" || command === "-"))
    ) {
      command = false;
    }
    // check if the operator "*,/,+,-" come before ")"
    if (command === ")") {
      if (
        lastExpressionChar === "+" ||
        lastExpressionChar === "-" ||
        lastExpressionChar === "/" ||
        lastExpressionChar === "*"
      ) {
        command = false;
      }
      // check if the number of closeParenthesis greater then number of openParenthesis
      let openParenthesis = 0;
      tempMathExpression.split("").map(el => {
        if (el === "(") {
          openParenthesis++;
        }
        if (el === ")") {
          openParenthesis--;
        }
        return el;
      });
      if (openParenthesis <= 0) {
        command = false;
      }
    }
    // check if after '(' not come '),*,/' imiddate;
    if (
      lastExpressionChar === "(" &&
      (command === ")" || command === "*" || command === "/")
    ) {
      command = false;
    }
    // check if before modolu we have number
    if (command === "%" && !this.isNumber(lastExpressionChar)) {
      command = false;
    }
    // check if the maximum length of the math expression greater then 23 chars
    if (this.state.mathExpression.length >= 23) {
      command = false;
    }
    return command;
  };

  // check if the char contain number or not
  isNumber = number => {
    return !isNaN(number);
  };

  render() {
    return (
      <Calculator>
        <Screen
          onClick={this.buttonClickedHandler}
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
