export interface PlayerItem {
    name: string,
    options?: Record<string, any>,
}

export interface PlayersListProps {
    dataList: Array<PlayerItem>,
}