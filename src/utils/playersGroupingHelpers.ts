interface PlayersListStr {
    playersListStr: string
}

interface TeammateMatch {
    playersListArr: Array<any>,
    options?: object
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

function createPlayersListArray({playersListStr}: PlayersListStr) {
    console.log({playersListStr, test: 2})
    return playersListStr.split(/\d+\./).slice(1).map( player => ({name: player.trim()}));
}

function createSingleMatch({playersListArr, options}: TeammateMatch) {
    
}

function createMultipleMatches({playersListArr, options}: TeammateMatch) {

}


export {
    createSingleMatch,
    createMultipleMatches,
    createPlayersListArray,
}