import { 
    Team, 
    IPlayerItem, 
    IPlayersListStr,
    ICreateSingleMatchInput,
    ICreateMultipleMatchesInput,
    IGetRandomTeamInput,
    IArrayToHtmlInput,
    ITeammateMapInput,
} from '../interfaces/IPlayers'
import { isNonemptyObj } from './objectHelpers'

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

const getRandomIndex = (max: number) => getRandomIntInclusive(0, max)

function getRandomItem(arr: Array<any>) {
    const length = arr.length
    if (length < 1 ) return null
    const randomIndex = getRandomIndex(length - 1)
    const randomItem = arr[randomIndex]

    return randomItem
}

function teamListArrToHtmlText({teamList}: IArrayToHtmlInput): string{
    return teamList.map((team, index) => team.length > 1 ?
                            `${index + 1}. ${team.join(' + ')} \n` :
                            `${index + 1}. ${team.pop()} \n`
                            ).join('')
}

function createPlayersListArray({playersListStr}: IPlayersListStr) {
    return playersListStr.split(/\d+\./).slice(1).map( (player, index) => ({id: index.toString(), name: player.trim()}))
}

function getRandomTeam({playersListArr, savedTeamList=[], teammateMap={}}: IGetRandomTeamInput) {
    if (playersListArr.length < 2) return playersListArr.map(({name}) => name)
    let team = []
    const randomPlayer = getRandomItem(playersListArr)
    const randomPlayerName = randomPlayer.name
    team.push(randomPlayerName)
    let validTeammatesArr = playersListArr.filter(({name}) => name !== randomPlayerName)

    if (isNonemptyObj(teammateMap)) {
        validTeammatesArr = validTeammatesArr.filter(({name}) => !teammateMap?.[randomPlayerName]?.includes(name))
    }

    if (savedTeamList.length > 0) {
        validTeammatesArr = validTeammatesArr.filter(({name}) => !savedTeamList.flat().includes(name))
    } 
        
    if (validTeammatesArr.length > 0) {
        const randomTeammate = getRandomItem(validTeammatesArr)
        team.push(randomTeammate.name)
    }

    return team
}

function createSimpleMatch({playersListArr, teammateMap={}}: ICreateSingleMatchInput) {
    let teamList: any = []
    let players = JSON.parse(JSON.stringify(playersListArr))
    while (players.length > 0) {
        const team = getRandomTeam({playersListArr: players, savedTeamList: teamList, teammateMap})
        teamList.push(team)
        players = players.filter((player: IPlayerItem) => !teamList.flat().includes(player.name))
    }

    return teamList
}


function updateTeammateMap({teamList, teammateMap={}}: ITeammateMapInput) {
    if (teamList.length === 0) return {};

    for (const [name1, name2] of teamList) {
        if(name2) {
            if (!teammateMap?.[name1]) {
                teammateMap[name1] = []
            }
            teammateMap[name1].push(name2)

            if (!teammateMap?.[name2]) {
                teammateMap[name2] = []
            }
            teammateMap[name2].push(name1)
        }
    }

    return teammateMap;
}
function createSimpleMultipleMatches({playersListArr, round, options}: ICreateMultipleMatchesInput) {
    let matchList: any = []
    let teammateMap = {}
    while (round > 0) {
        const teamList = createSimpleMatch({playersListArr, teammateMap})
        teammateMap = updateTeammateMap({teamList, teammateMap})
        matchList.push(teamList)
        round--
    }
    
    return matchList
}


function createAdvancedSingleMatch({playersListArr, teammateMap}: ICreateSingleMatchInput) {
    
}

function createAdvancedMultipleMatches({playersListArr, round, options}: ICreateMultipleMatchesInput) {

}


export {
    getRandomTeam,
    updateTeammateMap,
    createSimpleMatch,
    createSimpleMultipleMatches,
    createAdvancedSingleMatch,
    createAdvancedMultipleMatches,
    createPlayersListArray,
    teamListArrToHtmlText,
}