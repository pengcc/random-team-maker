import { describe, expect, it } from 'vitest'
import {isNonemptyObj} from '../../src/utils/objectHelpers'

describe('object helpers', () => {
    describe('isNonemptyObj', () => {
        it('given an empty object should get false', () => {
            const obj = {}
            const result = isNonemptyObj(obj)
            expect(result).toBe(false)
        })

        it('given an non empty object should get true', () => {
            const obj = {foo: 'bar'}
            const result = isNonemptyObj(obj)
            expect(result).toBe(true)
        })
    })
})