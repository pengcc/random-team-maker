import { IFilterOptionsProps } from "../interfaces/IPlayers"
import { useFormInput } from "../utils/myHooks"

function FilterOptions({playerId, onChange}: IFilterOptionsProps) {
    const scoreInput = useFormInput('')
    const genderSelect = useFormInput('')
    const genderSelectName = `gender-${playerId}`
    const scoreInputName = `score-${playerId}`
    
    return (
        <>
            <span className='player-gender'>
                <select name={genderSelectName} {...genderSelect}>
                    <option value="">gender</option>
                    <option value="m">male</option>
                    <option value="f">female</option>
                </select>
            </span>
            <span className='player-score'>score <input name={scoreInputName} {...scoreInput}/></span>
        </>
    )
}

export default FilterOptions