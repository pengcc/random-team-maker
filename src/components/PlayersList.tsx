import {IPlayersListProps} from '../interfaces/IPlayers'
import { useFormInput } from '../utils/myHooks'
import FilterOptions from './FilterOptions'
import FilterRules from './FilterRules'
import './PlayersList.css'

function PlayersList({dataList, matchType}: IPlayersListProps) {
    const isAdvancedMatch = matchType === 'advanced'
    
    return (
        <div className="PlayersList">
            {
                dataList.map(({name}) => {
                    return (
                    <div key={name} className='player'>
                        <span className='player-name'>{name}</span>
                        {isAdvancedMatch && <FilterOptions />}
                    </div>)
                })
            }
            {isAdvancedMatch && <FilterRules />}
        </div>
    )
}

export default PlayersList