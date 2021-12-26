function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const getRandomIndex = max => getRandomIntInclusive(0, max);

function getRandomItem(arr) {
    const length = arr.length;
    if (length < 1 ) return null;
    const randomIndex = getRandomIndex(length - 1);
    const randomItem = arr[randomIndex];

    return randomItem;
}

function createPlayersListArray({playersListStr}) {
    console.log({playersListStr, test: 2})
    return playersListStr.split(/\d+\./).slice(1).map( player => ({name: player.trim()}));
}

function createSingleMatch({playersListArr, options}) {
    
}

function createMultipleMatches({playersListArr, options}) {

}


export {
    createSingleMatch,
    createMultipleMatches,
    createPlayersListArray,
}