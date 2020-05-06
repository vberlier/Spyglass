import assert = require('power-assert')
import { describe, it } from 'mocha'
import { VanillaConfig } from '../../../types/Config'
import { FunctionInfo } from '../../../types/FunctionInfo'
import { Token, TokenType } from '../../../types/Token'
import { onSemanticTokens } from '../../../utils/handlers/onSemanticTokens'

describe('onSemanticTokens() Tests', () => {
    it('Should return correctly', () => {
        const info: FunctionInfo = {
            config: VanillaConfig,
            lineBreak: '\n',
            lines: [
                { args: [{ data: '# Test 0', parser: 'string' }], tokens: [new Token({ start: 0, end: 8 }, TokenType.comment)], hint: { fix: [], options: [] }, completions: undefined },
                { args: [{ data: '# Test 1', parser: 'string' }], tokens: [new Token({ start: 0, end: 8 }, TokenType.comment)], hint: { fix: [], options: [] }, completions: undefined }
            ],
            strings: [
                '# Test 0',
                '# Test 1'
            ],
            version: 0
        }

        const actual = onSemanticTokens({ info })

        assert.deepStrictEqual(actual.data, [
            0, 0, 8, TokenType.comment, 0,
            1, 0, 8, TokenType.comment, 0
        ])
    })
})
