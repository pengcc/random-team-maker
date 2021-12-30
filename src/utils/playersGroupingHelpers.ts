import {PlayerItem} from '../interfaces/IPlayers'
interface PlayersListStr {
    playersListStr: string,
}

interface CreateMatchInput {
    playersListArr: Array<PlayerItem>,
    options?: Record<string, any>,
}

interface GetRandomTeamInput {
    playersListArr: Array<PlayerItem>,
    savedTeamList?: Array<any>,
}

interface ArrayToHtmlInput {
    teamListArr: Array<Array<Record<string, any>>>,
}

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const getRandomIndex = (max: number) => getRandomIntInclusive(0, max);

function getRandomItem(arr: Array<any>) {
    const length = arr.length;
    if (length < 1 ) return null;
    const randomIndex = getRandomIndex(length - 1);
    const randomItem = arr[randomIndex];

    return randomItem;
}

function teamListArrToHtmlText({teamListArr}: ArrayToHtmlInput): string{
    return teamListArr.map((teammate, index) => teammate.length > 1 ?
                            `${index + 1}. ${teammate.map(({name}) => name).join(' + ')} \n` :
                            `${index + 1}. ${teammate.pop()?.name} \n`
                            ).join('');
}

function createPlayersListArray({playersListStr}: PlayersListStr) {
    console.log({playersListStr, test: 2})
    return playersListStr.split(/\d+\./).slice(1).map( player => ({name: player.trim()}));
}

function getRandomTeam({playersListArr, savedTeamList=[]}: GetRandomTeamInput) {
    if (playersListArr.length < 2) return playersListArr;
    let team = [];
    const randomPlayer = getRandomItem(playersListArr);
    team.push(randomPlayer);
    let validTeammatesArr;
    validTeammatesArr = playersListArr.filter(({name}) => name !== randomPlayer.name);

    if (savedTeamList.length > 0) {
        validTeammatesArr = validTeammatesArr.filter(({name}) => !savedTeamList.flat().some(({name}) => name === randomPlayer.name));
    } 
        
    if (validTeammatesArr.length > 0) {
        const randomTeammate = getRandomItem(validTeammatesArr);
        team.push(randomTeammate);
    }

    return team;
}

function createSimpleMatch({playersListArr}: CreateMatchInput) {
    let teamList: any = [];
    let players = JSON.parse(JSON.stringify(playersListArr));
    while (players.length > 0) {
        const team = getRandomTeam({playersListArr: players, savedTeamList: teamList})
        teamList.push(team)
        players = players.filter((player: PlayerItem) => !teamList.flat().some(({name}: PlayerItem) => name === player.name))
    }

    return teamList;
}

function createSimpleMultipleMatches({playersListArr}: CreateMatchInput) {

}


function createAdvancedSingleMatch({playersListArr, options}: CreateMatchInput) {
    
}

function createAdvancedMultipleMatches({playersListArr, options}: CreateMatchInput) {

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