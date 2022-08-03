import "./End.css";

const End = ({ retry, score }) => {
  return (
    <div className="end">
      <h1>Game over</h1>
      <h2>Your score was <span>{score}</span></h2>
      <button onClick={retry}>Try again</button>
    </div>
  )
}

export {End}