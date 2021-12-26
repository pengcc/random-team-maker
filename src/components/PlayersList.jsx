function PlayersList({dataList=[]} = {}) {
    return (
        <div className="PlayersList">
            {
                dataList.map(({id, name, options}) => {
                    return (<div key={id}>{name}</div>)
                })
            }
        </div>
    )
}

export default PlayersList