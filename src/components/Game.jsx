import { useState, useRef } from "react"
import "./Game.css"

const Game = ({ 
  verifyLetter, 
  pickedWord, 
  pickedCategory, 
  letters, 
  guessedLetters, 
  wrongLetters, 
  guesses, 
  score 
}) => {
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)

    setLetter("")

    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      {/* Este vai ser o contador de pontuação */}
      <p className="points">
        <span>Score: {score}</span>
      </p>
      {/* Este vai informar uma dica sobre a palavra a ser adivinhada */}
      <h1>Guess the word</h1>
      <h3 className="tip">
        Tip about the word: <span>{pickedCategory}</span>
      </h3>
      <p>You still have {guesses} attempts</p>
      {/* Esta div terá as letras sendo exibidas */}
      <div className="wordContainer">
        {letters.map((letter, i) => 
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blanckSquare"></span>
          )
        )}
      </div>
      {/* Esta div é onde colocaremos nossa parte a ser jogada, letra a ser inserida */}
      <div className="letterContainer">
        <p>Try to guess a letter of the word:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letter" 
            maxLength="1" 
            required onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Play!</button>
        </form>
      </div>
      {/* Esta div irá armazenar e nos mostrar todas as letras erradas */}
      <div className="wrongLettersContainer">
        <p>Letters already used:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export {Game}