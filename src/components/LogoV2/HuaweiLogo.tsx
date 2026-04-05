import * as React from 'react'
import { Box, Text } from '../../ink.js'

// 用 1/0/空格拼成的华为标志字形（约 35 cols × 14 rows）
// 灵感来自「盘古 Code」恶搞皮肤，仅供娱乐
const LINES = [
  '          1    1          ',
  '       10101    10101     ',
  '       10101    101010    ',
  '   101  101010 101010  101',
  '   1010 101010 101010 10101',
  '  101010 10101  1010 101010',
  '  101010  1010  1010 1010101',
  '101 101010 101  10 10101  10',
  '10101 1010  10  10 1010 10101',
  ' 1010101  10    1  10101010 ',
  ' 10101010      101010101   ',
  '                           ',
  ' 10101010       10101010   ',
  '  101010         101010    ',
]

export function HuaweiLogo(): React.ReactNode {
  return (
    <Box flexDirection="column">
      {LINES.map((line, i) => (
        <Text key={i} color="rgb(215,119,87)">{line}</Text>
      ))}
    </Box>
  )
}
