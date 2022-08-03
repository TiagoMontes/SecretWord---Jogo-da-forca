//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//Data
import {wordsList} from "./data/words"

//Components
import { StartScreen } from './components/StartScreen';
import { Game } from "./components/Game"
import { End } from "./components/End"

//Estes serão os estágios do jogo
const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "end"}
];

const guessesQty = 3

function App() {
  //Estamos pegando o primeiro item da array stages e acessando seu name
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);
  
  //Seleção de palavras, categorias e letras
  const [pickedWord, setPickedWord] = useState();
  const [pickedCategory, setPickedCategory] = useState()
  const [letters, setLetters] = useState([])
  
  //Guessed and Wrong letters, guesses and score.
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)
  
  const pickedWordAndCategory = useCallback(() => {
    //Pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    // Pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    //Desestruturando
    return { word, category }
  },[words])


  //Starts the secret word game
  const startGame = useCallback(() => {
    // Clear all letters
    clearLetterState()

    //Pick word and pick category
    const { word, category }= pickedWordAndCategory()

    //Create a array of letters separating with split
    let wordLetters = word.split("")

    //Lets return each letter in lower case to avoid errors. When we don't use this, the first letter is upper Case, so this is a problem.
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //Test in console
    console.log(word, category)
    console.log(wordLetters)
    
    // Fill states - useState
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    //Changing the stage
    setGameStage(stages[1].name)
  },[pickedWordAndCategory])

  //Process the letter input
  const verifyLetter = (letter) => {
    
    const normalizedLetter= letter.toLowerCase()

    //check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    // Push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)

    }
  }

  const clearLetterState = () => {
    setGuessedLetters([])
    setWrongLetters([])
    setGuesses(guessesQty)
  }

  //Check if guesses ended
  useEffect(() => {
    if(guesses <= 0) {
      //reset all states
      clearLetterState()

      setGameStage(stages[2].name);
    }
  },[guesses])

  //Check win condition
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    //win condition
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      //add score
      setScore((actualScore) => actualScore += 100)

      //Restart game with new word
      startGame()
    }

  },[guessedLetters, letters, startGame])

  //Retry process
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)

    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {/* Se o Hook for igual a start, ele irá exibir o componente StartScreen */}
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && (
        <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <End retry={retry} score={score}/>}
    </div>
  );
}

export default App;
