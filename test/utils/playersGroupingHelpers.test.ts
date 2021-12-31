import {it, describe, expect, assert} from 'vitest'
import {getRandomTeam, createSimpleMatch} from '../../src/utils/playersGroupingHelpers'

describe('players grouping helpers', () => {
    describe('getRandomTeam', () => {
        it('return the array if the length less than 2', () => {
            const players = [{name: 'foo'}];
            const team = getRandomTeam({playersListArr: players});
            assert.equal(players.length, team.length)
        })
    
        it('players list array contains team member', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}]
            const team = getRandomTeam({playersListArr: players})
            expect(players.map(({name}) => name)).toEqual(expect.arrayContaining(team))
        })
    
        it('team mates should be different players', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}]
            const team = getRandomTeam({playersListArr: players})
            expect(team[0]).not.toEqual(team[1])
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
            expect(teamList.flat()).toEqual(expect.arrayContaining(players.map(({name}) => name)))
        })

        it('given teammate map, teammates should not rematch together', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}, {name: 'hi hi'}, {name: 'la la'}]
            const teammateMap = {foo: ['bar', 'zzz', 'la la']}
            const teamList = createSimpleMatch({playersListArr: players, teammateMap})
            const teamFoo = teamList.find( team => team.includes('foo'))
            const teamFooMate = teamFoo.filter(name => name !== 'foo')
            console.log(JSON.stringify(teamList))
            expect(['bar', 'zzz'].includes(teamFooMate)).toBe(false)
        })
    })
})
