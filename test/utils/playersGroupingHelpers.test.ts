import {test, describe, expect, assert} from 'vitest'
import { IPlayerItem } from '../../src/interfaces/IPlayers'
import {
    getRandomPlayerPair, 
    updateTeammateNamesMap,
    createSingleMatch,
    createMultipleMatches
} from '../../src/utils/playersGroupingHelpers'

describe('players grouping helpers', () => {
    describe('getRandomPlayerPair', () => {
        test('return the array if the length less than 2', () => {
            const players = [{name: 'foo'}];
            const team = getRandomPlayerPair({playersListArr: players});
            assert.equal(players.length, team.length)
        })
    
        test('players list array contains team member', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}]
            const playerPair = getRandomPlayerPair({playersListArr: players})
            expect(players).toEqual(expect.arrayContaining(playerPair))
        })
    
        test('team mates should be different players', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}]
            const playerPair = getRandomPlayerPair({playersListArr: players})
            const [{name: name1}, {name: name2}] = playerPair
            expect(name1).not.toEqual(name2)
        })
    })
    
    describe('helpers -- createSimpleMatch', () => {
        test('odd players should be a single team', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}]
            const playerPairsList = createSingleMatch({playersListArr: players})
            expect(playerPairsList.length).toBe(2)
        })
    
        test('even players should be fully grouped', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}]
            const playerPairsList = createSingleMatch({playersListArr: players})
            expect(playerPairsList.flat().map(({name}) => name)).toEqual(expect.arrayContaining(players.map(({name}) => name)))
        })

        test('given teammate names map, teammates should not rematch together', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}, {name: 'hi hi'}, {name: 'la la'}]
            const teammateNamesMap = {foo: ['bar', 'zzz', 'la la'], bar: ['foo'], zzz: ['foo'], 'la la': ['foo']}
            const playerPairsList = createSingleMatch({playersListArr: players, teammateNamesMap})
            const playerPairOfFoo = playerPairsList.find( playerPair => playerPair.some(({name}) => name === 'foo'))
            if (playerPairOfFoo && playerPairOfFoo.length > 1) {
                const playerFooMate = playerPairOfFoo.find(({name}) => name !== 'foo')
                expect(['bar', 'zzz', 'la la'].includes(playerFooMate.name)).toBe(false)
            }
        })
    })

    describe('update teammate map', () => {
        test('given team list, get proper teammate map', () => {
            const playerPairsList = [[{name: 'haha'}, {name: 'lala'}], [{name: 'jo jo'}, {name: 'yo yo'}]]
            const teammateNamesMap = updateTeammateNamesMap({playerPairsList})
            const expectedResult = {'haha': ['lala'], 'lala': ['haha'], 'jo jo': ['yo yo'], 'yo yo': ['jo jo']}
            expect(expectedResult).toEqual(expect.objectContaining(teammateNamesMap))
        })

        test('given team list and teammate map, get properly updated teammate map', () => {
            const playerPairsList = [[{name: 'haha'}, {name: 'yo yo'}], [{name: 'lala'}, {name: 'jo jo'}]]
            const existedTeammateNamesMap= {'haha': ['lala'], 'lala': ['haha'], 'jo jo': ['yo yo'], 'yo yo': ['jo jo']}
            const teammateNamesMap = updateTeammateNamesMap({playerPairsList, teammateNamesMap: existedTeammateNamesMap})
            const expectedResult= {'haha': ['lala', 'yo yo'], 'lala': ['haha', 'jo jo'], 'jo jo': ['yo yo', 'lala'], 'yo yo': ['jo jo', 'haha']}
            expect(expectedResult).toEqual(expect.objectContaining(teammateNamesMap))
        })
    })

    describe('create simple multiple matches', () => {
        test('given odd players, the match should be different', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}, {name: 'hi hi'}]
            const matchList = createMultipleMatches({playersListArr: players, round: 2})
            const match1 = matchList[0]
            const match2 = matchList[1]
            const fooTeam1 = match1.find((playerPair: Array<IPlayerItem>) => playerPair.some(({name}) => name === 'foo'))
            const fooTeam2 = match2.find((playerPair: Array<IPlayerItem>) => playerPair.some(({name}) => name === 'foo'))
            if (fooTeam1.length > 1 && fooTeam2.length > 1) {
                const playerFooMate1 = fooTeam1.find(({name}) => name !== 'foo')
                const playerFooMate2 = fooTeam2.find(({name}) => name !== 'foo')
                expect(playerFooMate1.name).not.toEqual(playerFooMate2.name)
            }
        })

        test('given even players, the match should be different', () => {
            const players = [{name: 'foo'}, {name: 'bar'}, {name: 'zzz'}, {name: 'yo yo'}, {name: 'hi hi'}, {name: 'ja ja'}]
            const matchList = createMultipleMatches({playersListArr: players, round: 2})
            const match1 = matchList[0]
            const match2 = matchList[1]
            const fooTeam1 = match1.find((playerPair: Array<IPlayerItem>) => playerPair.some(({name}) => name === 'foo'))
            const fooTeam2 = match2.find((playerPair: Array<IPlayerItem>) => playerPair.some(({name}) => name === 'foo'))
            if (fooTeam1.length > 1 && fooTeam2.length > 1) {
                const playerFooMate1 = fooTeam1.find(({name}) => name !== 'foo')
                const playerFooMate2 = fooTeam2.find(({name}) => name !== 'foo')
                expect(playerFooMate1.name).not.toEqual(playerFooMate2.name)
            }
        })
    })

    describe('advanced match with filter rules', () => {
        test('given players with gender filter rule, no male double, should no male double team found', () => {
            const players = [{name: 'foo', gender: 'f'}, {name: 'bar', gender: 'm'}, {name: 'zzz', gender: 'm'}, {name: 'yo yo', gender: 'f'}, {name: 'hi hi', gender: 'm'}]
            const filterRules = {gender: 'no male double'}
            const playerPairsList = createSingleMatch({playersListArr: players, filterRules})
            const maleDoubleTeam = playerPairsList.filter(pair => pair.length === 2).filter(pair => pair?.[0]?.gender === 'm' && pair?.[1]?.gender === 'm')
            expect(maleDoubleTeam).toHaveLength(0)
        })

        test('no female double team', () => {
            const players = [{name: 'foo', gender: 'f'}, {name: 'bar', gender: 'm'}, {name: 'zzz', gender: 'm'}, {name: 'yo yo', gender: 'f'}, {name: 'hi hi', gender: 'm'}]
            const filterRules = {gender: 'no female double'}
            const playerPairsList = createSingleMatch({playersListArr: players, filterRules})
            const femaleDoubleTeam = playerPairsList.filter(pair => pair.length === 2).filter(pair => pair?.[0]?.gender === 'f' && pair?.[1]?.gender === 'f')
            expect(femaleDoubleTeam).toHaveLength(0)
        })

        test('no mix team', () => {
            const players = [{name: 'foo', gender: 'f'}, {name: 'bar', gender: 'm'}, {name: 'zzz', gender: 'm'}, {name: 'yo yo', gender: 'f'}, {name: 'hi hi', gender: 'm'}]
            const filterRules = {gender: 'no mix'}
            const playerPairsList = createSingleMatch({playersListArr: players, filterRules})
            const mixTeam = playerPairsList.filter(pair => pair.length === 2).filter(pair => pair?.[0]?.gender !== pair?.[1]?.gender)
            expect(mixTeam).toHaveLength(0)
        })

        test('only mix', () => {
            const players = [{name: 'foo', gender: 'f'}, {name: 'bar', gender: 'm'}, {name: 'zzz', gender: 'm'}, {name: 'yo yo', gender: 'f'}, {name: 'hi hi', gender: 'm'}]
            const filterRules = {gender: 'only mix'}
            const playerPairsList = createSingleMatch({playersListArr: players, filterRules})
            const sameGenderTeam = playerPairsList.filter(pair => pair.length === 2).filter(pair => pair?.[0]?.gender === pair?.[1]?.gender)
            expect(sameGenderTeam).toHaveLength(0)
        })
    })
})
