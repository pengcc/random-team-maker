export interface IPlayerItem {
    name: string,
}

export interface IPlayersListProps {
    dataList: Array<IPlayerItem>,
    matchType: string,
}

export type Team = Array<string>

export interface IPlayersListStr {
    playersListStr: string,
}

export interface ICreateSingleMatchInput {
    playersListArr: Array<IPlayerItem>,
    teammateMap?: Record<string, any>,
}

export interface ICreateMultipleMatchesInput {
    playersListArr: Array<IPlayerItem>,
    round: number,
    teammateMap?: Record<string, any>,
    options?: Record<string, any>,
}

export interface IGetRandomTeamInput {
    playersListArr: Array<IPlayerItem>,
    savedTeamList?: Array<Team>,
    teammateMap?: Record<string, any>,
}

export interface IArrayToHtmlInput {
    teamList: Array<Team>,
}

export interface ITeammateMapInput {
    teamList: Array<Team>,
    teammateMap?: Record<string, any>,
}
