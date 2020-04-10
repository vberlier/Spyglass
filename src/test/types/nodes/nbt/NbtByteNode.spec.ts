import assert = require('power-assert')
import { describe, it } from 'mocha'
import { constructConfig } from '../../../../types/Config'
import NbtByteNode from '../../../../types/nodes/nbt/NbtByteNode'
import { ToFormattedString } from '../../../../types/Formattable'

describe('NbtByteNode Tests', () => {
    describe('[ToLintedString]() Tests', () => {
        it('Should return with lower-cased suffix', () => {
            const { lint } = constructConfig({ lint: { nbtByteSuffix: 'b' } })
            const node = new NbtByteNode(null, 0, '0')

            const actual = node[ToFormattedString](lint)

            assert(actual === '0b')
        })
        it('Should return with upper-cased suffix', () => {
            const { lint } = constructConfig({ lint: { nbtByteSuffix: 'B' } })
            const node = new NbtByteNode(null, 0, '0')

            const actual = node[ToFormattedString](lint)

            assert(actual === '0B')
        })
        it('Should return true', () => {
            const { lint } = constructConfig({ lint: { nbtByteSuffix: 'b' } })
            const node = new NbtByteNode(null, 1, 'True')

            const actual = node[ToFormattedString](lint)

            assert(actual === 'true')
        })
        it('Should return true', () => {
            const { lint } = constructConfig({ lint: { nbtByteSuffix: 'b' } })
            const node = new NbtByteNode(null, 0, 'False')

            const actual = node[ToFormattedString](lint)

            assert(actual === 'false')
        })
    })
})
