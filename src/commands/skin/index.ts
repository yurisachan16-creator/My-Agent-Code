import type { Command } from '../../commands.js'

const command = {
  name: 'skin',
  description: '切换欢迎界面皮肤：/skin [default|huawei]，无参数则在两者间切换',
  supportsNonInteractive: false,
  type: 'local',
  load: () => import('./skin.js'),
} satisfies Command

export default command
