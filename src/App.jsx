import React, { useState, useEffect } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isMachineTurn, setIsMachineTurn] = useState(false);

  useEffect(() => {
    if (!winner && isMachineTurn) {
      const availableMoves = board.reduce((acc, value, index) => {
        if (!value) {
          acc.push(index);
        }
        return acc;
      }, []);
  
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      const machineMove = availableMoves[randomIndex];
  
      const newBoard = board.slice();
      newBoard[machineMove] = xIsNext ? "X" : "O";
  
      setBoard(newBoard);
      setXIsNext(!xIsNext);
      setIsMachineTurn(false);
    }
  }, [board, isMachineTurn, winner, xIsNext]);

  const handleClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(newBoard) || newBoard[index] || isMachineTurn) {
      return;
    }
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setIsMachineTurn(true);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner({ winner: squares[a], line: lines[i] });
        return true;
      }
    }
    return false;
  };

  const renderBoard = () => {
    const boardRows = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        row.push(renderSquare(index, i, j));
      }
      boardRows.push(
        <div key={i} className="flex justify-center">
          {row}
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center text-yellow-100 mb-4">
        {boardRows}
      </div>
    );
  };
  
  const renderSquare = (index, i, j) => {
    const isWinnerSquare = winner && winner.line.includes(index);
  
    return (
      <button
        key={j} 
        className={`bg-red-500 border border-yellow-100 text-3xl p-2 sm:p-4 w-16 sm:w-24 h-16 sm:h-24 transition-colors hover:bg-yellow-400 ${
          isWinnerSquare ? "text-white font-bold" : ""
        }`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  let status;

  if (winner) {
    status = (
      <span className="text-yellow-100 text-lg mb-4">
        Winner: {winner.winner}
      </span>
    );
  } else if (board.every((square) => square !== null)) {
    status = <span className="text-yellow-100 text-lg mb-4">It's a draw!</span>;
  } else {
    status = (
      <span className="text-yellow-100 text-lg mb-4">
        Next player: {xIsNext ? "X" : "O"}
      </span>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="bg-red-500 rounded-lg shadow-md max-w-lg w-full overflow-hidden p-4 mx-3 mt-8 mb-8 flex flex-col items-center">
        <h1 className="text-4xl text-yellow-100 mb-4 text-center font-custom">
          Tic-Tac-Toe
        </h1>
        <div className="p-2 sm:p-4">{renderBoard()}</div>
        <div className="p-2 sm:p-4 text-center font-custom">{status}</div>
        <button
          className="bg-yellow-400 text-red-500 p-2 rounded-md self-center mb-4"
          onClick={() => {
            setBoard(Array(9).fill(null));
            setXIsNext(true);
            setWinner(null);
          }}
        >
          Reiniciar Juego
        </button>
      </div>
    </div>
  );
}

export default App;
