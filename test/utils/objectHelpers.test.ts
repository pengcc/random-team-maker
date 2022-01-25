import { describe, expect, test } from 'vitest'
import {isNonemptyObj} from '../../src/utils/objectHelpers'

function config(options: Record<string, number>) {
    options.duration ??= 100;
    options.speed ??= 25;
    return options;
  }
  
 
describe('object helpers', () => {
    describe('isNonemptyObj', () => {
        test('given an empty object should get false', () => {
            const obj = {}
            const result = isNonemptyObj(obj)
            expect(result).toBe(false)
        })

        test('given an non empty object should get true', () => {
            const obj = {foo: 'bar'}
            const result = isNonemptyObj(obj)
            expect(result).toBe(true)
        })

        test('nullish assignment', () => {
            expect(config({ duration: 200 }).duration).toEqual(200);
          })
    })
})