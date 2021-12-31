import {PlayerItem} from '../interfaces/IPlayers'
import { isNonemptyObj } from './objectHelpers'

type Teammate = Array<string>

interface PlayersListStr {
    playersListStr: string,
}

interface CreateSingleMatchInput {
    playersListArr: Array<PlayerItem>,
    teammateMap?: Record<string, any>,
}

interface CreateMultipleMatchesInput {
    playersListArr: Array<PlayerItem>,
    round: number,
    teammateMap?: Record<string, any>,
    options?: Record<string, any>,
}

interface GetRandomTeamInput {
    playersListArr: Array<PlayerItem>,
    savedTeamList?: Array<Teammate>,
    teammateMap?: Record<string, any>,
}

interface ArrayToHtmlInput {
    teamList: Array<Teammate>,
}

interface TeammateMapInput {
    teammateMap: Record<string, any>,
    playersListArr: Array<PlayerItem>,
    teamList: Array<Teammate>,
}

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

function teamListArrToHtmlText({teamList}: ArrayToHtmlInput): string{
    return teamList.map((team, index) => team.length > 1 ?
                            `${index + 1}. ${team.join(' + ')} \n` :
                            `${index + 1}. ${team.pop()} \n`
                            ).join('')
}

function createPlayersListArray({playersListStr}: PlayersListStr) {
    return playersListStr.split(/\d+\./).slice(1).map( player => ({name: player.trim()}))
}

function getRandomTeam({playersListArr, savedTeamList=[], teammateMap={}}: GetRandomTeamInput) {
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

function createSimpleMatch({playersListArr, teammateMap={}}: CreateSingleMatchInput) {
    let teamList: any = []
    let players = JSON.parse(JSON.stringify(playersListArr))
    while (players.length > 0) {
        const team = getRandomTeam({playersListArr: players, savedTeamList: teamList, teammateMap})
        teamList.push(team)
        players = players.filter((player: PlayerItem) => !teamList.flat().includes(player.name))
    }

    return teamList
}

function updateTeammateMap({playersListArr, teamList, teammateMap={}}: TeammateMapInput) {
    playersListArr.forEach(({name: playerName}) => {
        const team = teamList.find(team => team.includes(playerName))
        const teammateName = team?.filter(name => name !== playerName)[0]
        if (!teammateMap[playerName]) {
            teammateMap[playerName] = [teammateName]
        } else {
            teammateMap[playerName].push(teammateName)
        }
    })
}
function createSimpleMultipleMatches({playersListArr, round, options}: CreateMultipleMatchesInput) {
    let matchList: any = []
    let teammateMap = {}
    while (round > 0) {
        const teamList = createSimpleMatch({playersListArr, teammateMap})
        updateTeammateMap({playersListArr, teamList, teammateMap})
        matchList.push(teamList)
        round--
    }
    
    return matchList
}


function createAdvancedSingleMatch({playersListArr, teammateMap}: CreateSingleMatchInput) {
    
}

function createAdvancedMultipleMatches({playersListArr, round, options}: CreateMultipleMatchesInput) {

}


export {
    getRandomTeam,
    createSimpleMatch,
    createSimpleMultipleMatches,
    createAdvancedSingleMatch,
    createAdvancedMultipleMatches,
    createPlayersListArray,
    teamListArrToHtmlText,
}