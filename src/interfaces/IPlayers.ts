export interface IPlayerItem {
    id?: string,
    name: string,
    gender?: string,
}

export interface IPlayersListProps {
    dataList: Array<IPlayerItem>,
    matchType: string,
}

export type TeammateNamesArr = Array<string>
export type PlayerPair = Array<IPlayerItem>
export type TeammateNamesMap = Record<string, Array<string>>

export interface IPlayerNamesListStr {
    playerNamesListStr: string,
}

export interface ICreateSingleMatchInput {
    playersListArr: Array<IPlayerItem>,
    teammateNamesMap?: TeammateNamesMap,
    filterRules?: Record<string, any>,
}

export interface ICreateMultipleMatchesInput {
    playersListArr: Array<IPlayerItem>,
    round: number,
    teammateNamesMap?: TeammateNamesMap,
    options?: Record<string, any>,
}

export interface IGetRandomPlayerPairInput {
    playersListArr: Array<IPlayerItem>,
    playerPairsList?: Array<PlayerPair>,
    teammateNamesMap?: TeammateNamesMap,
    filterRules?: Record<string, any>,
}

export interface IExcludedNameListInput {
    randomPlayerName: string,
    playerPairsList?: Array<PlayerPair>,
    teammateNamesMap?: TeammateNamesMap,
}

export interface IPlayerPairsArrayToHtmlInput {
    playerPairsList?: Array<PlayerPair>,
}

export interface ITeammateNamesMapInput {
    playerPairsList?: Array<PlayerPair>,
    teammateNamesMap?: TeammateNamesMap,
}

export interface IFilterOptionsProps {
    playerId: string,
    onChange: Function,
}