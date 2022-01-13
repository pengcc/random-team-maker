import { useState, ChangeEvent } from 'react'
import {IPlayersListProps} from '../interfaces/IPlayers'
import FilterOptions from './FilterOptions'
import FilterRules from './FilterRules'
import './PlayersList.css'

const genderCodeMap: Record<string, any> = {m: '&#9794;', f: '&#9792;'}
function PlayersList({dataList, matchType}: IPlayersListProps) {
    const isAdvancedMatch = matchType === 'advanced'
    const [playersList, setPlayersList] = useState(dataList)
    function handleGenderChange(e: ChangeEvent<HTMLSelectElement>) {
        const {value, name} = e.target
        const playerId: string = name.replace('gender-', '')
        const newList = playersList.map((player) => (player.id === playerId ? {...player, gender: value} : player))
        setPlayersList(newList)
    }
    return (
        <div className="PlayersList">
            {
                playersList.map((player) => {
                    const {id, name, gender} = player
                    return (
                    <div key={id} className='player'>
                        <span className='player-name'>{name}</span>
                        {gender && <span>{gender}</span>}
                        {isAdvancedMatch &&
                            <>
                                <select name={`gender-${id}`} onChange={handleGenderChange}>
                                    <option value="">gender</option>
                                    <option value="m">male</option>
                                    <option value="f">female</option>
                                </select>
                            </>                        
                        }
                    </div>)
                })
            }
            {isAdvancedMatch && <FilterRules />}
        </div>
    )
}

export default PlayersList