const playerStr = '1. Dan Shi 2. 汪亚 3. 曾彦焯 4. YY 5. Jason 6. 向以魁 7. 慧淑Huishu Zheng 8. Xiaohui Guo 9. 巧融 10. Xiaoli Shi 11. Eason- 易晟昊 12. 刘逸洋 13. Xing Li 14. Dong Xu 15. Dejian Wu 16. Yusi Zhang 17. Marc 18. pengCC 19. 海舒 20. 王子';

function createPlayersListArrayFromInput() {
  const playersListStr = document.getElementById('playersListStr').value;

  return playersListStr.split(/\d+\./).slice(1).map( player => player.trim());
}

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

function getExclusionTag(item) {
  const filterRegex = /(?<name>[^#]*)(?<tag>#\d+)$/;
  const matchResult = filterRegex.exec(item);
  if (matchResult) {
    const {groups: {tag}} = matchResult;
    return tag;
  } else {
    return null;
  }
}

function getRandomItem(arr) {
  return arr[getRandomIndex(arr.length - 1)];
}

function createRandomTeam({playerListArr, archivedTeamListArr = []} = {}) {
  if (playerListArr.length < 2) return playerListArr;
  let team = [];
  const randomPlayer = getRandomItem(playerListArr);
  const exclusionTag = getExclusionTag(randomPlayer);
  team.push(randomPlayer);
  let filteredPlayersArr;
  if (archivedTeamListArr.length > 0) {
    const archivedTeam = archivedTeamListArr.find(team => team.includes(randomPlayer));
    filteredPlayersArr = playerListArr.filter(player => !archivedTeam.includes(player));
  } else {
    filteredPlayersArr = playerListArr.filter(player => player !== randomPlayer);
  }

  if (exclusionTag) {
    filteredPlayersArr = filteredPlayersArr.filter( player => !player.endsWith(exclusionTag));
  }

  if (filteredPlayersArr.length > 0) {
    team.push(getRandomItem(filteredPlayersArr));
  }

  return team;
}

function createTeamListArr({playerListArr, archivedTeamListArr=[]} = {}) {
  let teamListArr = [];
  while (playerListArr.length > 1) {
    const team = createRandomTeam({playerListArr, archivedTeamListArr});
    teamListArr.push(team);
    const excludedPlayers = teamListArr.flat();
    playerListArr = playerListArr.filter(player => !excludedPlayers.includes(player));
  }
  if (playerListArr.length === 1) {
    teamListArr.push(playerListArr);
  }
  return teamListArr;
}

function teamListArrToHtmlText({teamListArr} = {}) {
  return teamListArr.map((team, index) => team.length > 1 ?
                      `${index + 1}. ${team.join(' + ')} \n` :
                       `${index + 1}. ${team.pop()} \n`
  );
}

function appendTextToTextArea({elemId, text}) {
  document.getElementById(elemId).value = text;
}

function saveValueToSessionStorage({key, value} = {}) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  sessionStorage.setItem(key, value);
}

function getValueFromSessionStorage({key} = {}) {
  return sessionStorage.getItem(key);
}

function saveTeamListHtmlText({teamListArr, size=6} = {}) {
  const archivedTeamListHtmlTextStr = getValueFromSessionStorage({key: 'archivedTeamListHtmlText'});
  let archivedTeamListHtmlTextArr = archivedTeamListHtmlTextStr ? JSON.parse(archivedTeamListHtmlTextStr) : [];
  console.log({teamListArr, test: 2})
  const currentTeamListHtmlText = teamListArrToHtmlText({teamListArr});
  console.log({currentTeamListHtmlText, test: 3})
  archivedTeamListHtmlTextArr.push(currentTeamListHtmlText);
  if (archivedTeamListHtmlTextArr.length > 6) {
    archivedTeamListHtmlTextArr.shift();
  }
  saveValueToSessionStorage({key: 'archivedTeamListHtmlText', value: archivedTeamListHtmlTextArr});
}

function getArchivedTeamListHtmlTextArr() {
  const teamListHtmlTextStr = getValueFromSessionStorage({key: 'archivedTeamListHtmlText'});

  return teamListHtmlTextStr ? JSON.parse(archivedTeamListHtmlText): [];
}

function clearArchivedTeams({key='archivedTeamListHtmlText'} = {}) {
  sessionStorage.clear();
  appendTextToTextArea({elemId:'archivedTeamList', text: ''});
}

document.getElementById('showTeamListBtn').addEventListener('click', () => {
  const timeStart = new Date().getTime();
  const playersListArr = createPlayersListArrayFromInput();
  const currentTeamListArr = createTeamListArr({playerListArr: [...playersListArr]});
  console.log({currentTeamListArr, test: 0})
  saveValueToSessionStorage({key: 'currentTeamListArr', value: currentTeamListArr});
  saveTeamListHtmlText({teamListArr: currentTeamListArr});
  console.log({currentTeamListArr, test: 1})
  const htmlText = teamListArrToHtmlText({teamListArr: currentTeamListArr}).join('');
  console.log({htmlText, test: 11})
  appendTextToTextArea({elemId:'currentTeamList', text: htmlText});
  const timeEnd = new Date().getTime();
  const timeOffset = timeEnd - timeStart;
});

document.getElementById('nextRoundBtn').addEventListener('click', () => {
  const playersListArr = createPlayersListArrayFromInput();
  const currentTeamListArrStr = getValueFromSessionStorage({key: 'currentTeamListArr'});
  let currentTeamListArr = [];
  if (currentTeamListArrStr) {
    currentTeamListArr = JSON.parse(currentTeamListArrStr);
    const nextRoundTeamListArr = createTeamListArr({playerListArr: [...playersListArr], archivedTeamListArr: currentTeamListArr});
    saveValueToSessionStorage({key: 'currentTeamListArr', value: nextRoundTeamListArr});
    saveTeamListHtmlText({teamListArr: nextRoundTeamListArr});
    appendTextToTextArea({elemId:'currentTeamList', text: teamListArrToHtmlText({teamListArr: nextRoundTeamListArr})});
  }

});
document.getElementById('showArchiveBtn').addEventListener('click', () => {
  const archivedTeamListHtmlTextStr = getValueFromSessionStorage({key: 'archivedTeamListHtmlText'});
  if (archivedTeamListHtmlTextStr) {
    const archivedTeamListHtmlTextArr = JSON.parse(archivedTeamListHtmlTextStr);
    const text = archivedTeamListHtmlTextArr.join('\n \n')
    appendTextToTextArea({elemId:'archivedTeamList', text});
  }
});

document.getElementById('clearBtn').addEventListener('click', clearArchivedTeams);

