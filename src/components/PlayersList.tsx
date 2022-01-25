import { useState, ChangeEvent } from 'react'
import {IPlayersListProps} from '../interfaces/IPlayers'
import FilterOptions from './FilterOptions'
import FilterRules from './FilterRules'

const genderCodeMap: Record<string, any> = {m: '&#9794;', f: '&#9792;'}
function PlayersList({dataList, matchType, onChangeGender}: IPlayersListProps) {
    const isAdvancedMatch = matchType === 'advanced'
    function handleGenderChange(e: ChangeEvent<HTMLSelectElement>) {
        const {value, name} = e.target
        const playerId: string = name.replace('gender-', '')
        const newList = dataList.map((player) => (player.id === playerId ? {...player, gender: value} : player))
        onChangeGender(newList)
    }
    return (
        <div className="w-90vw mt-15px bg-orange-100 mx-auto py-5px pl-5px">
            {
                dataList.map((player) => {
                    const {id, name, gender} = player
                    return (
                    <div key={id} className='mb-5px'>
                        <span className='w-120px inline-block'>{name}</span>
                        {gender && <span className='w-30px inline-block'>{gender}</span>}
                        {isAdvancedMatch &&
                            <>
                                <select className='w-100px' name={`gender-${id}`} onChange={handleGenderChange}>
                                    <option value="">gender</option>
                                    <option value="m">male</option>
                                    <option value="f">female</option>
                                </select>
                            </>                        
                        }
                    </div>)
                })
            }
            
        </div>
    )
}

export default PlayersList