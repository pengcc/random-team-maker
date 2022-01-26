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
  const matchResultTextRef = useRef<HTMLTextAreaElement>(null)
  const [playersListStr, setPlayersListStr] = useState('')
  const [round, setRound] = useState(1) 
  const [matchType, setMatchType] = useState('basic')
  const [playersListArr, setPlayersListArr] = useState<Array<IPlayerItem>>([])
  const [matchResultText, setMatchResultText] = useState('')
  const [filterRules, setFilterRules] = useState({})

  useEffect(() => {
    if (playersTextRef.current) {
      playersTextRef.current.style.height = "0px"
      const scrollHeight = playersTextRef.current.scrollHeight
      playersTextRef.current.style.height = `${scrollHeight}px`
    }
  }, [playersListStr])

  useEffect(() => {
    if (matchResultTextRef.current) {
      matchResultTextRef.current.style.height = "0px"
      const scrollHeight = matchResultTextRef.current.scrollHeight
      matchResultTextRef.current.style.height = `${scrollHeight + 50}px`
    }
  }, [matchResultText])

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
    setMatchResultText(matchResultText);
  }

  function onCreatingMultipleMatches() {
    const multipleMatches = createMultipleMatches({playersListArr, round, filterRules})
    const matchResultText = multipleMatches.map((playerPairsList: Array<PlayerPair>) => playerPairsListArrToHtmlText({playerPairsList})).join('\n \n')
    setMatchResultText(matchResultText)
  }
  return (
    <div className="h-100vh bg-antiquewhite">
      <header className="flex flex-col justify-center items-center text-white min-h-6vh bg-gray-700 text-size-[calc(10px_+_2vmin)]">
        Random team
      </header>
      <main className='mt-15px'>
          <div className='w-100vw text-center'>
            <label className='w-100vw text-center inline-block h-30px lh-30ox font-bold'>Add players</label>
            <textarea ref={playersTextRef} id="playersListStr" name="playersText" className="w-90vw min-h-6vh" value={playersListStr} onChange={(e) => setPlayersListStr(e.target.value)}></textarea>
          </div>
          <div className="w-100wh text-center" onChange={handleMatchTypeSwitching}>
            <label className='mr-15px'>Basic match<input name="matchType" defaultValue="basic" type="radio" className='ml-5px mt-5px'/></label>
            <label>Advanced match<input name="matchType" defaultValue="advanced" type="radio" className='ml-5px mt-5px' /></label>
          </div>
          
          {playersListArr.length > 0 &&
              <>
                <PlayersList dataList={playersListArr} matchType={matchType} onChangeGender={(players: Array<IPlayerItem>) => setPlayersListArr(players)}/>
                {matchType === 'advanced' && <FilterRules onChangeRule={(rule: Record<string, any>) => {setFilterRules(rule)}} />}
                <div className='mt-10px'>
                  <div className='flex items-center justify-center'>
                    <button id="creatingSingleMatch" onClick={onCreatingSingleMatch} className="w-250px py-2 px-2 bg-blue-300 border-none font-semibold rounded-lg">Single match</button>
                  </div>
                  <div className='mt-10px flex items-center justify-center'>
                    <button id="creatingMultipleMatches" onClick={onCreatingMultipleMatches} className="w-150px py-2 px-2 bg-blue-300 border-none font-semibold rounded-lg mr-15px">Multiple matches</button>
                    <label>
                      Round: <input className='w-60px' name="round-value" placeholder={`1 - ${getMaxRoundCount(playersListArr.length)}`} value={round} onChange={(e) => setRound(Number(e.target.value))} type="text" />
                    </label>
                  </div>
                </div>
              </>
          }
          {matchResultText && 
              <div className='w-100vw text-center mt-15px'>
                <textarea ref={matchResultTextRef} className='w-90vw min-h-6vh' value={matchResultText}></textarea>
              </div>
          }
      </main>
    </div>
  )
}

export default App
