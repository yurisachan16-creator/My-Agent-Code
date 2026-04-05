import type { LocalCommandCall } from '../../types/command.js'
import { getGlobalConfig, saveGlobalConfig } from '../../utils/config.js'

export const call: LocalCommandCall = async (args) => {
  const config = getGlobalConfig()
  const arg = args.trim()

  let newSkin: 'default' | 'huawei'

  if (arg === 'default' || arg === 'huawei') {
    newSkin = arg
  } else {
    // 无参数：在两者间切换
    newSkin = (config.welcomeSkin ?? 'default') === 'default' ? 'huawei' : 'default'
  }

  saveGlobalConfig(current => ({ ...current, welcomeSkin: newSkin }))

  const desc =
    newSkin === 'huawei'
      ? '遥遥领先！已切换到盘古 Code 皮肤，重启后生效。'
      : '已切换回默认皮肤，重启后生效。'

  return { type: 'text', value: desc }
}
