import {PlayersListProps} from '../interfaces/IPlayers'

function PlayersList({dataList}: PlayersListProps) {
    return (
        <div className="PlayersList">
            {
                dataList.map(({name, options}) => {
                    return (<div key={name}>{name}</div>)
                })
            }
        </div>
    )
}

export default PlayersList