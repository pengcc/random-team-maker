import { ChangeEvent } from "react"
import { IFilterOptionsProps } from "../interfaces/IPlayers"
import { useFormInput } from "../utils/myHooks"

function FilterOptions({playerId, onChangeFilterOption}: IFilterOptionsProps) {
    const genderSelect = useFormInput('')
    const genderSelectName = `gender-${playerId}`
    // const scoreInput = useFormInput('')
    // const scoreInputName = `score-${playerId}`
    function handleGenderChange(e: ChangeEvent<HTMLSelectElement>) {
        onChangeFilterOption(e.target.value)
    }
    return (
        <>
            <span className='player-gender' onChange={handleGenderChange}>
                <select name={genderSelectName} {...genderSelect}>
                    <option value="">gender</option>
                    <option value="m">male</option>
                    <option value="f">female</option>
                </select>
            </span>
            {/* <span className='player-score'>score <input name={scoreInputName} {...scoreInput}/></span> */}
        </>
    )
}

export default FilterOptions