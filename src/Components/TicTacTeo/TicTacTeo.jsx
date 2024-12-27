import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import "./TicTacTeo.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

export default function TicTacTeo() {
  const [Count, setCount] = useState(0);
  const [Lock, setLock] = useState(false);

  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);
  const box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (Lock || data[num] !== "") {
      return;
    }

    if (Count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' alt='x'>`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' alt='o'>`;
      data[num] = "o";
    }

    setCount(Count + 1);
    checkWin();
  };

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }

    // Check for draw
    if (Count === 8) {
      Swal.fire({
        title: "It's a Draw!",
        icon: "info",
        confirmButtonText: "Okay",
      });
      setLock(true);
    }
  };

  const won = (winner) => {
    setLock(true);
    Swal.fire({
      title: `Congratulations!`,
      html: `<img src='${
        winner === "x" ? cross_icon : circle_icon
      }' alt='${winner}' style="width: 50px; margin-top: 10px;"> wins!`,
      icon: "success",
      confirmButtonText: "Play Again",
    });
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    box_array.forEach((box) => {
      box.current.innerHTML = "";
    });
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div ref={box1} className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div ref={box2} className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div ref={box3} className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div ref={box4} className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div ref={box5} className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div ref={box6} className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div ref={box7} className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div ref={box8} className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div ref={box9} className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
