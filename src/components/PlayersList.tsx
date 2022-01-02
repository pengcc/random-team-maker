import {IPlayersListProps} from '../interfaces/IPlayers'
import { useFormInput } from '../utils/myHooks'
import './PlayersList.css'

const options = {gender: ['male', 'female']}
function PlayersList({dataList}: IPlayersListProps) {
    const scoreInput = useFormInput('')
    return (
        <div className="PlayersList">
            {
                dataList.map(({name}) => {
                    return (
                    <div key={name} className='player'>
                        <span className='player-name'>{name}</span>
                        <span className='player-gender'>
                            <span>&#9794;<input name="gender" defaultValue="male" type="radio" /></span> 
                            <span>&#9792;<input name="gender" type="radio" /> </span>
                        </span>
                        <span className='player-score'>score <input name="score" {...scoreInput}/></span>
                    </div>)
                })
            }
            <div>
                apply conditions 
                <label>Gender</label><input name="gender" type="checkbox" />
                <label>Score</label><input name="score" type="checkbox" />
            </div>
        </div>
    )
}

export default PlayersList