import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <h1>Välkommen till Hyrule Compendium Mk-II</h1>
        <p>Detta är en webbapplikation som visar information om olika varelser, vapen och utrustning i The Legend of Zelda: Breath of the Wild och The Legend of Zelda: Tears of the Kingdom.</p>
      </div>
    </>
  )
}

export default App
