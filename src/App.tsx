import { useState, ChangeEvent, useRef, useEffect } from 'react'
import PlayersList from './components/PlayersList'
import { IPlayerItem, PlayerPair } from './interfaces/IPlayers'
import {
    createSingleMatch,
    createPlayersListArray,
    getRandomPlayerPair,
    playerPairsListArrToHtmlText,
    getMaxRoundCount,
    createMultipleMatches,
} from './utils/playersGroupingHelpers'
import FilterRules from './components/FilterRules'

function App() {
  const playersTextRef = useRef<HTMLTextAreaElement>(null)
  const [playersListStr, setPlayersListStr] = useState('')
  const [round, setRound] = useState(1) 
  const [matchType, setMatchType] = useState('basic')
  const [playersListArr, setPlayersListArr] = useState<Array<IPlayerItem>>([])
  const [singleMatchText, setSingleMatchText] = useState('')
  const [multipleMatchText, setMultipleMatchText] = useState('')
  const [filterRules, setFilterRules] = useState({})

  useEffect(() => {
    if (playersTextRef.current) {
      playersTextRef.current.style.height = "0px"
      const scrollHeight = playersTextRef.current.scrollHeight
      playersTextRef.current.style.height = `${scrollHeight}px`
    }
  }, [playersListStr])

  function handleMatchTypeSwitching(e: ChangeEvent<HTMLInputElement>) {
    setMatchType(e.target.value)
    const playerNamesListStr = playersListStr
    if (playerNamesListStr) {
      const playersArr = createPlayersListArray({playerNamesListStr})
      setPlayersListArr(playersArr)
    }
  }

  function onCreatingSingleMatch() {
    const playerPairsList = createSingleMatch({playersListArr, filterRules})
    const matchResultText = playerPairsListArrToHtmlText({playerPairsList})
    setSingleMatchText(matchResultText);
  }

  function onCreatingMultipleMatches() {
    const multipleMatches = createMultipleMatches({playersListArr, round, filterRules})
    const matchResultText = multipleMatches.map((playerPairsList: Array<PlayerPair>) => playerPairsListArrToHtmlText({playerPairsList})).join('\n \n')
    setMultipleMatchText(matchResultText)
  }
  return (
    <div className="App">
      <header className="flex flex-col justify-center items-center text-white min-h-6vh bg-gray-700 text-size-[calc(10px_+_2vmin)]">
        Random team
      </header>
      <main className='mt-15px'>
          <div>
            <label className='inline-block h-30px lh-30ox font-bold'>Add players</label>
            <textarea ref={playersTextRef} id="playersListStr" name="playersText" className="playersList-input" value={playersListStr} onChange={(e) => setPlayersListStr(e.target.value)}></textarea>
          </div>
          <div className="match-types" onChange={handleMatchTypeSwitching}>
            <label>Basic match<input name="matchType" defaultValue="basic" type="radio" /></label>
            <label>Advanced match<input name="matchType" defaultValue="advanced" type="radio" /></label>
          </div>
          
          {playersListArr.length > 0 &&
              <>
                <PlayersList dataList={playersListArr} matchType={matchType} onChangeGender={(players: Array<IPlayerItem>) => setPlayersListArr(players)}/>
                {matchType === 'advanced' && <FilterRules onChangeRule={(rule: Record<string, any>) => {setFilterRules(rule)}} />}
                <div className='action-fields'>
                  <div className='action-option'>
                    <button id="creatingSingleMatch" onClick={onCreatingSingleMatch} className="action-btn">Single match</button>
                  </div>
                  <div className='action-option'>
                    <button id="creatingMultipleMatches" onClick={onCreatingMultipleMatches} className="action-btn">Multiple matches</button>
                    <label className='round'>
                      Round: <input name="round-value" placeholder={`1 - ${getMaxRoundCount(playersListArr.length)}`} value={round} onChange={(e) => setRound(Number(e.target.value))} type="number" min="1" max={getMaxRoundCount(playersListArr.length)} />
                    </label>
                  </div>
                </div>
              </>
          }
          {singleMatchText && 
              <div>
                <textarea value={singleMatchText}></textarea>
              </div>
          }
          {multipleMatchText &&
              <div>
                <textarea value={multipleMatchText}></textarea>
              </div>
          }
          
      </main>
    </div>
  )
}

export default App
