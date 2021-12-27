import { useState } from 'react'
import {useFormInput} from './utils/myHooks'
import PlayersList from './components/PlayersList'
import { PlayerItem } from './interfaces/IPlayers'
import {
  createSingleMatch,
  createMultipleMatches,
  createPlayersListArray
} from './utils/playersGroupingHelpers'
import logo from './assets/logo.svg'
import './App.css'

function App() {
  const playersListStr = useFormInput('');
  const [singleMatch, setSingleMatch] = useState([])
  const [multipleMatches, setMultipleMatches] = useState([])
  const [playersListArr, setPlayersListArr] = useState<Array<PlayerItem>>([]);

  function handleCreatingPlayersList() {
    const playersStr = playersListStr.value;
    if (playersStr.length > 0) {
      console.log({playersStr, test: 1})
      const playersArr = createPlayersListArray({playersListStr: playersStr});
      console.log(playersArr)
      setPlayersListArr(playersArr);
    }
  }

  function handleShowingSingleMatch() {

  }

  function handleShowingMultipleMatches() {
    
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
            <button id="showSingleMatch" onClick={handleShowingSingleMatch} className="action-btn">Single match</button>
            <button id="showMultipleMatches" onClick={handleShowingMultipleMatches} className="action-btn">Multiple matches</button>
          </div>
          <div>
            过滤配对说明，在两个名字后边添加‘#1’， 这两名队员不会出现在组合中。如果希望多人不出现在组合中，多人名字后加比如‘#1’。
          </div>
          <div id="result" className="match-result">
            <label className="matchesLabel">当前配对</label>
            <textarea id="currentTeamList" className="matchResultField"></textarea>
          </div>
        <section>
          <button id="showArchiveBtn" className="action-btn">查看记录</button>
            <button id="clearBtn" className="action-btn">清除记录</button>
          </section>
        <div id="archivedResult" className="archive-result">
            <label className="matchesLabel">配对记录</label>
            <textarea id="archivedTeamList" className="matchResultField"></textarea>
          </div>
      </main>
    </div>
  )
}

export default App
