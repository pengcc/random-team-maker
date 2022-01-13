function FilterRules() {
    return (
        <div>
            <div>
                gender filter 
                <label>no male double</label>
                <input name="gender" defaultValue='no male double' type='radio' />
                <label>no female double</label>
                <input name="gender" defaultValue='no female double' type='radio' />
                <label>no mix</label>
                <input name="gender" defaultValue='no mix' type='radio' />
                <label>only mix</label>
                <input name="gender" defaultValue='only mix' type='radio' />
                <button>reset</button>
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