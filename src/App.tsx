import { useState } from 'react'
import {useFormInput} from './utils/myHooks'
import PlayersList from './components/PlayersList'
import { IPlayerItem, Team } from './interfaces/IPlayers'
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
  const playersListStr = useFormInput('')
  const round = useFormInput(0)
  const [matchType, setMatchType] = useState('simple')
  const [simpleSingleMatch, setSimpleSingleMatch] = useState([])
  const [simpleMultipleMatches, setSimpleMultipleMatches] = useState([])
  const [playersListArr, setPlayersListArr] = useState<Array<IPlayerItem>>([])
  const [simpleSingleMatchText, setSimpleSingleMatchText] = useState('')
  const [simpleMultipleMatchText, setSimpleMultipleMatchText] = useState('')

  function handleCreatingSimpleMatch() {
    const playersStr = playersListStr.value;
    if (matchType !== 'simple') {
      setMatchType('simple')
    }
    if (playersStr.length > 0) {
      const playersArr = createPlayersListArray({playersListStr: playersStr});
      setPlayersListArr(playersArr);
    }
  }

  function handleCreatingAdvancedMatch() {
    setMatchType('advanced')
  }
  
  function handleShowingSimpleSingleMatch() {
    const simpleMatch = createSimpleMatch({playersListArr})
    const matchResultText = teamListArrToHtmlText({teamList: simpleMatch})
    setSimpleSingleMatchText(matchResultText);
  }

  function handleShowingSimpleMultipleMatches() {
    const multipleMatches = createSimpleMultipleMatches({playersListArr, round: round.value})
    const matchResultText = multipleMatches.map((teamList: Array<Team>) => teamListArrToHtmlText({teamList})).join('\n \n')
    setSimpleMultipleMatchText(matchResultText)
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
          <button onClick={handleCreatingSimpleMatch}>Create simple match</button>
          <button onClick={handleCreatingAdvancedMatch}>Create advanced match</button>
          {playersListArr && <PlayersList dataList={playersListArr} matchType={matchType}/>}
          
          <div>
            <button id="showSingleMatch" onClick={handleShowingSimpleSingleMatch} className="action-btn">Simple Single match</button>
            <button id="showMultipleMatches" onClick={handleShowingSimpleMultipleMatches} className="action-btn">Simple Multiple matches</button>
          <label>input round number</label>
          <input {...round} />
          </div>

          <div>
            <textarea defaultValue={simpleSingleMatchText}></textarea>
          </div>
          <div>
            <textarea defaultValue={simpleMultipleMatchText}></textarea>
          </div>
      </main>
    </div>
  )
}

export default App
