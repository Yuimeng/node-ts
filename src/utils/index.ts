/**
 *
 * @param val 要转换的值
 * @param def 默认值
 */
export const handleNum = (val: any, def: number): number => {
  if (!val || isNaN(parseInt(val))) {
    return def
  }
  return parseInt(val)
}
