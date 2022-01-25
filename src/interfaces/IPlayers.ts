export interface IPlayerItem {
    id?: string,
    name: string,
    gender?: string,
}

export interface IPlayersListProps {
    dataList: Array<IPlayerItem>,
    matchType: string,
    onChangeGender: Function,
}

export type TeammateNamesArr = Array<string>
export type PlayerPair = Array<IPlayerItem>
export type TeammateNamesMap = Record<string, Array<string>>
export type PlayerPairsList = Array<PlayerPair>

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
    filterRules?: Record<string, any>,
}

export interface IGetRandomPlayerPairInput {
    playersListArr: Array<IPlayerItem>,
    playerPairsList?: PlayerPairsList,
    teammateNamesMap?: TeammateNamesMap,
    filterRules?: Record<string, any>,
}

export interface IExcludedNameListInput {
    randomPlayerName: string,
    playerPairsList?: PlayerPairsList,
    teammateNamesMap?: TeammateNamesMap,
}

export interface IPlayerPairsArrayToHtmlInput {
    playerPairsList?: PlayerPairsList,
}

export interface ITeammateNamesMapInput {
    playerPairsList?: PlayerPairsList,
    teammateNamesMap?: TeammateNamesMap,
}

export interface IFilterOptionsProps {
    playerId: string,
    onChangeFilterOption: Function,
}

export interface IFilterRulesProps {
    onChangeRule: Function,
}