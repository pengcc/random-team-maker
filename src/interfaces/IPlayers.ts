export interface PlayerItem {
    name: string,
}

export interface PlayersListProps {
    dataList: Array<PlayerItem | string>,
}