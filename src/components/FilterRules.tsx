function FilterRules() {
    const genderRules = ['no male double', 'no female double', 'no mix', 'only mix']
    return (
        <div>
            <div>
                gender rule 
                {
                    genderRules.map(rule => (
                        <label key={rule}>
                            rule
                            <input name="gender-rule" defaultValue={rule} type='radio' />
                        </label>
                    ))
                }
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