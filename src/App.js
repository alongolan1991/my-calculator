import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import Result from "./components/Result/Result";
import Keypad from "./components/Keypad/Keypad";

class App extends Component {
  state = { mathExpression: "", result: 0 };

  buttonClickedHandler = command => {
    switch (command) {
      case "=": {
        const tempResult = eval(this.state.mathExpression);
        this.setState({result :tempResult,mathExpression : tempResult});
        break;
        
      }
      case "AC": {
        this.setState({ mathExpression: "", result: 0 });
        break;
      }
      default: {
        let tempExpression = this.state.mathExpression;
        tempExpression += command;
        this.setState({ mathExpression: tempExpression });
        console.log(tempExpression);
      }
    }
  };

  render() {
    return (
      <Calculator>
        <Result Expression={this.state.mathExpression} result={this.state.result} />
        <Keypad clicked={this.buttonClickedHandler} />
      </Calculator>
    );
  }
}

export default App;

const Calculator = styled.div`
  width: 360px;
  height: 600px;
  border: 1px solid black;
  margin: 5% auto;
`;
