import {it, describe, expect, assert} from 'vitest'
import {
    getRandomTeam, 
    createSimpleMatch, 
    createSimpleMultipleMatches, 
    updateTeammateMap
} from '../../src/utils/playersGroupingHelpers'

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
            expect(teamList.length).toBe(2)
        })
    
        it('even players should be fully grouped', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}]
            const teamList = createSimpleMatch({playersListArr: players})
            expect(teamList.flat()).toEqual(expect.arrayContaining(players.map(({name}) => name)))
        })

        it('given teammate map, teammates should not rematch together', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}, {name: 'hi hi'}, {name: 'la la'}]
            const teammateMap = {foo: ['bar', 'zzz', 'la la']}
            const teamList = createSimpleMatch({playersListArr: players, teammateMap})
            const teamFoo = teamList.find( team => team.includes('foo'))
            const teamFooMate = teamFoo.filter(name => name !== 'foo')
            expect(['bar', 'zzz'].includes(teamFooMate)).toBe(false)
        })
    })

    describe('update teammate map', () => {
        it('given team list, get proper teammate map', () => {
            const teamList = [['haha', 'lala'], ['jo jo', 'yo yo']]
            const teammateMap = updateTeammateMap({teamList})
            const expectedResult = {'haha': ['lala'], 'lala': ['haha'], 'jo jo': ['yo yo'], 'yo yo': ['jo jo']}
            expect(expectedResult).toEqual(expect.objectContaining(teammateMap))
        })

        it('given team list and teammate map, get properly updated teammate map', () => {
            const teamList = [['haha', 'yo yo'], ['lala', 'jo jo']]
            const existedTeammateMap= {'haha': ['lala'], 'lala': ['haha'], 'jo jo': ['yo yo'], 'yo yo': ['jo jo']}
            const teammateMap = updateTeammateMap({teamList, teammateMap: existedTeammateMap})
            const expectedResult= {'haha': ['lala', 'yo yo'], 'lala': ['haha', 'jo jo'], 'jo jo': ['yo yo', 'lala'], 'yo yo': ['jo jo', 'haha']}
            expect(expectedResult).toEqual(expect.objectContaining(teammateMap))
        })
    })

    describe('create simple multiple matches', () => {
        it('given odd players, the match should be different', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}, {name: 'hi hi'}]
            const matchList = createSimpleMultipleMatches({playersListArr: players, round: 2})
            const match1 = matchList[0]
            const match2 = matchList[1]
            const fooTeam1 = match1.find((team: Array<string>) => team.includes('foo'))
            const fooTeam2 = match2.find((team: Array<string>) => team.includes('foo'))

            expect(fooTeam1).not.toEqual(expect.arrayContaining(fooTeam2))
        })

        it('given even players, the match should be different', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}, {name: 'hi hi'}, {name: 'ja ja'}]
            const matchList = createSimpleMultipleMatches({playersListArr: players, round: 2})
            const match1 = matchList[0]
            const match2 = matchList[1]
            const fooTeam1 = match1.find((team: Array<string>) => team.includes('foo'))
            const fooTeam2 = match2.find((team: Array<string>) => team.includes('foo'))
            expect(fooTeam1).not.toEqual(expect.arrayContaining(fooTeam2))
        })
    })
})
