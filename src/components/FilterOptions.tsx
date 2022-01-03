import { useFormInput } from "../utils/myHooks"

function FilterOptions() {
    const scoreInput = useFormInput('')
    return (
        <>
            <span className='player-gender'>
                <span>&#9794;<input name="gender" defaultValue="male" type="radio" /></span> 
                <span>&#9792;<input name="gender" type="radio" /> </span>
            </span>
            <span className='player-score'>score <input name="score" {...scoreInput}/></span>
        </>
    )
}

export default FilterOptions