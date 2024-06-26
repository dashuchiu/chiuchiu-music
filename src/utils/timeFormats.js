/**
 * 歌曲时间
 * @param time
 */
export const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0')
  return `${minutes}:${seconds}`
}
