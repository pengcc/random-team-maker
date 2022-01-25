import { 
    PlayerPair, 
    IPlayerItem, 
    IPlayerNamesListStr,
    ICreateSingleMatchInput,
    ICreateMultipleMatchesInput,
    IGetRandomPlayerPairInput,
    IPlayerPairsArrayToHtmlInput,
    ITeammateNamesMapInput,
    IExcludedNameListInput,
    PlayerPairsList,
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

function playerPairsListArrToHtmlText({playerPairsList=[]}: IPlayerPairsArrayToHtmlInput): string{
    return playerPairsList.map(pair => pair.map(({name}) => name)).map((playerPair, index) => playerPair.length > 1 ?
                            `${index + 1}. ${playerPair.join(' + ')} \n` :
                            `${index + 1}. ${playerPair.pop()} \n`
                            ).join('')
}

function createPlayersListArray({playerNamesListStr}: IPlayerNamesListStr) {
    return playerNamesListStr.split(/\d+\./).slice(1).map( (player, index) => ({id: index.toString(), name: player.trim()}))
}

function getExcludedNameList({randomPlayerName, playerPairsList=[], teammateNamesMap={}}: IExcludedNameListInput) {
    let excludedNamesList: Array<string> = [randomPlayerName]

    if (isNonemptyObj(teammateNamesMap)) {
        const teammateNames = teammateNamesMap?.[randomPlayerName]
        if (teammateNames) {
            excludedNamesList.push(...teammateNames)
        }
    }

    if (playerPairsList.length > 0) {
        excludedNamesList.push(...playerPairsList.flat().map(({name}) => name))
    }

    return excludedNamesList;
}
function getRandomPlayerPair({playersListArr, playerPairsList=[], teammateNamesMap={}, filterRules={}}: IGetRandomPlayerPairInput) {
    if (playersListArr.length < 2) return playersListArr
    let playerPair: PlayerPair = []
    const randomPlayer = getRandomItem(playersListArr)
    const randomPlayerName = randomPlayer.name
    playerPair.push(randomPlayer)

    const excludedNameList = getExcludedNameList({randomPlayerName, playerPairsList, teammateNamesMap})

    let validTeammatesArr = playersListArr.filter(({name}) => ![...new Set(excludedNameList)].includes(name))

    if (isNonemptyObj(filterRules)) {
        //const genderRules = ['no male double', 'no female double', 'no mix', 'only mix']
        const genderRule = filterRules?.gender
        if (genderRule) {
            const playerGender = randomPlayer.gender
            switch(genderRule) {
                case 'no male double':
                    if (playerGender === 'm') {
                        validTeammatesArr = validTeammatesArr.filter(({gender}) => gender !== playerGender)
                    }
                    break
                case 'no female double':
                    if (playerGender === 'f') {
                        validTeammatesArr = validTeammatesArr.filter(({gender}) => gender !== playerGender)
                    }
                    break
                case 'no mix':
                    validTeammatesArr = validTeammatesArr.filter(({gender}) => gender === playerGender)
                    break
                case 'only mix':
                    validTeammatesArr = validTeammatesArr.filter(({gender}) => gender !== playerGender)
                    break
                default:
                    break
            }
        }
    }

    if (validTeammatesArr.length > 0) {
        const randomTeammate = getRandomItem(validTeammatesArr)
        playerPair.push(randomTeammate)
    }

    return playerPair
}

function updateTeammateNamesMap({playerPairsList=[], teammateNamesMap={}}: ITeammateNamesMapInput) {
    if (playerPairsList.length === 0) return {};

    for (const [player1, player2] of playerPairsList) {
        const name1 = player1.name
        const name2 = player2?.name
        if(name2) {
            teammateNamesMap[name1] ??= []
            teammateNamesMap[name1].push(name2)
            teammateNamesMap[name2] ??= []
            teammateNamesMap[name2].push(name1)
        }
    }

    return teammateNamesMap
}

function createSingleMatch({playersListArr, teammateNamesMap={}, filterRules={}}: ICreateSingleMatchInput) {
    let playerPairsList: PlayerPairsList = []
    let players = JSON.parse(JSON.stringify(playersListArr))
    while (players.length > 0) {
        const playerPair = getRandomPlayerPair({playersListArr: players, playerPairsList, teammateNamesMap, filterRules})
        playerPairsList.push(playerPair)
        players = players.filter((player: IPlayerItem) => !playerPairsList.flat().map(player => player.name).includes(player.name))
    }

    return playerPairsList
}


function createMultipleMatches({playersListArr, round, teammateNamesMap={}, filterRules={}}: ICreateMultipleMatchesInput) {
    let matchList: Array<PlayerPairsList> = []
    while (round > 0) {
        const playerPairsList = createSingleMatch({playersListArr, teammateNamesMap, filterRules})
        teammateNamesMap = updateTeammateNamesMap({playerPairsList, teammateNamesMap})
        matchList.push(playerPairsList)
        round--
    }
    
    return matchList
}

const getMaxRoundCount = (n: number) => n - 1 + n % 2


export {
    getRandomPlayerPair,
    updateTeammateNamesMap,
    createSingleMatch,
    createMultipleMatches,
    createPlayersListArray,
    playerPairsListArrToHtmlText,
    getMaxRoundCount,
}