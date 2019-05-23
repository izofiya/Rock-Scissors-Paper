import React from "react";
import ReactDOM from "react-dom";
import { Spinner } from "./Spinner.js";
import "./css/styles.css";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveValueButton: "",
      elements: ["Rock", "Paper", "Scissors"],
      random: "",
      arrForWin: [],
      isLoading: false,
      winner: "",
      arrWinners: []
    };
    this.clickButton = this.clickButton.bind(this);
    this.getWinner = this.getWinner.bind(this);
  }
  getWinner() {
    if (
      this.state.arrForWin[0] === "Rock" &&
      this.state.arrForWin[1] === "Paper"
    ) {
      this.setState({
        winner: "user"
      });
    } else if (
      this.state.arrForWin[0] === "Paper" &&
      this.state.arrForWin[1] === "Rock"
    ) {
      this.setState({
        winner: "computer"
      });
    } else if (
      this.state.arrForWin[0] === "Rock" &&
      this.state.arrForWin[1] === "Scissors"
    ) {
      this.setState({
        winner: "computer"
      });
    } else if (
      this.state.arrForWin[0] === "Scissors" &&
      this.state.arrForWin[1] === "Rock"
    ) {
      this.setState({
        winner: "user"
      });
    } else if (
      this.state.arrForWin[0] === "Paper" &&
      this.state.arrForWin[1] === "Scissors"
    ) {
      this.setState({
        winner: "user"
      });
    } else if (
      this.state.arrForWin[0] === "Scissors" &&
      this.state.arrForWin[1] === "Paper"
    ) {
      this.setState({
        winner: "computer"
      });
    } else {
      this.setState({
        winner: "draw"
      });
    }
  }
  clickButton(evt) {
    let rand = Math.floor(Math.random() * this.state.elements.length);
    this.setState({
      isActiveValueButton: evt.target.value,
      random: this.state.elements[rand],
      isLoading: true,
      arrForWin: []
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
        arrForWin: [
          ...this.state.arrForWin,
          this.state.random,
          this.state.isActiveValueButton
        ],
        arrWinners: [...this.state.arrWinners, this.state.winner]
      });
      this.getWinner();
    }, 700);
  }

  render() {
    return (
      <div className="wrapp">
        <h2>Make a choice</h2>
        <p>
          <input type="button" value="Rock" onClick={this.clickButton} />
        </p>
        <p>
          <input type="button" value="Paper" onClick={this.clickButton} />
        </p>
        <p>
          <input type="button" value="Scissors" onClick={this.clickButton} />
        </p>
        <div className="resultDiv">
          <h2>Game result: {this.state.isLoading ? <Spinner /> : null}</h2>
          {this.state.arrForWin}

          <h2>Our winner is {this.state.winner}</h2>
          <h3>Game history:</h3>
          <ol>
            {this.state.arrWinners.map((elem, ind) =>
              elem !== "" ? <li key={ind}>{elem}</li> : null
            )}
          </ol>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
