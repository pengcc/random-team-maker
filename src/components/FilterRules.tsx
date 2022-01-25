import { ChangeEvent } from "react"
import { IFilterRulesProps } from "../interfaces/IPlayers"

function FilterRules({onChangeRule}: IFilterRulesProps) {
    const genderRules = ['no male double', 'no female double', 'no mix', 'only mix']
    
    function handleGenderRuleChange(e: ChangeEvent<HTMLInputElement>) {
        onChangeRule({gender: e.target.value})
    }

    return (
        <div>
            <div onChange={handleGenderRuleChange} className="mt-10px w-90vw mx-auto bg-indigo-300 py-5px px-3px">
                <label className="mr-10px font-semibold">Gender rules: </label>
                {
                    genderRules.map(rule => (
                        <label key={rule} className="mr-6px">
                            <input className="mr-3px" name="gender-rule" defaultValue={rule} type='radio' />
                            {rule}
                        </label>
                    ))
                }
                {/* <button className="w-120px py-2 px-2 bg-red-200 border-none font-semibold rounded-lg mr-15px">reset</button> */}
            </div>
            {/* <div>
                score filter
                <label>team score not greater than </label>
                <input type="text" />
                <label>team score no less than</label>
                <input type="text" />
                <button>reset</button>
            </div> */}
        </div>
    )
}

export default FilterRules