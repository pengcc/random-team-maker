import {it, describe, expect, assert} from 'vitest'
import {getRandomTeam, createSimpleMatch} from '../../src/utils/playersGroupingHelpers'

describe('players grouping helpers', () => {
    describe('players grouping helpers -- getRandomTeam', () => {
        it('return the array if the length less than 2', () => {
            const players = [{name: 'foo'}];
            const team = getRandomTeam({playersListArr: players});
            assert.equal(players.length, team.length)
        })
    
        it('players list array contains team member', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}]
            const team = getRandomTeam({playersListArr: players})
            expect(players).toEqual(expect.arrayContaining(team))
        })
    
        it('team mates should be different players', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}]
            const team = getRandomTeam({playersListArr: players})
            expect(team[0].name).not.toEqual(team[1].name)
        })
    })
    
    describe('helpers -- createSimpleMatch', () => {
        it('odd players should be a single team', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}]
            const teamList = createSimpleMatch({playersListArr: players})
            console.log(JSON.stringify(teamList))
            expect(teamList.length).toBe(2)
        })
    
        it('even players should be fully grouped', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}]
            const teamList = createSimpleMatch({playersListArr: players})
            console.log(JSON.stringify(teamList))
            expect(teamList.length * 2).toBe(players.length)
        })
    })
})
