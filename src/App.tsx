import { useState } from 'react'
import {useFormInput} from './utils/myHooks'
import PlayersList from './components/PlayersList'
import { PlayerItem } from './interfaces/IPlayers'
import {
    createSimpleMatch,
    createSimpleMultipleMatches,
    createAdvancedSingleMatch,
    createAdvancedMultipleMatches,
    createPlayersListArray,
    getRandomTeam,
    teamListArrToHtmlText,
} from './utils/playersGroupingHelpers'
import logo from './assets/logo.svg'
import './App.css'

function App() {
  const playersListStr = useFormInput('');
  const [simpleSingleMatch, setSimpleSingleMatch] = useState([])
  const [simpleMultipleMatches, setSimpleMultipleMatches] = useState([])
  const [playersListArr, setPlayersListArr] = useState<Array<PlayerItem>>([]);
  const [simpleSingleMatchText, setSimpleSingleMatchText] = useState('');

  function handleCreatingPlayersList() {
    const playersStr = playersListStr.value;
    if (playersStr.length > 0) {
      const playersArr = createPlayersListArray({playersListStr: playersStr});
      setPlayersListArr(playersArr);
    }
  }

  function handleShowingSimpleSingleMatch() {
    const simpleMatch = createSimpleMatch({playersListArr})
    const matchResultText = teamListArrToHtmlText({teamListArr: simpleMatch})
    setSimpleSingleMatchText(matchResultText);
  }

  function handleShowingSimpleMultipleMatches() {
    
  }
  return (
    <div className="App">
      <header className="App-header">
        Random team
      </header>
      <main>
          <div className="players-list">
            <label>Input players list</label>
            <input id="playersListStr" className="playersList-input" {...playersListStr} />
          </div>
          <button onClick={handleCreatingPlayersList}>Show players List</button>
          {playersListArr && <PlayersList dataList={playersListArr} />}
          
          <div>
            <button id="showSingleMatch" onClick={handleShowingSimpleSingleMatch} className="action-btn">Simple Single match</button>
            <button id="showMultipleMatches" onClick={handleShowingSimpleMultipleMatches} className="action-btn">Simple Multiple matches</button>
          </div>

          <div>
            {simpleSingleMatchText}
          </div>
      </main>
    </div>
  )
}

export default App
