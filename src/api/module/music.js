import { httpGet } from '../server'

export const musicApi = {
  recommendResource: () => httpGet('/recommend/resource'),
  urlV1: (id) => httpGet(`song/url/v1?id=${id}&level=exhigh`),
  // 获取歌手详情
  artistDetail: (id) => httpGet('/artist/detail', { id }),
  // 获取歌手描述
  artistDesc: (id) => httpGet('/artist/desc', { id }),
  // 获取歌手单曲
  artists: (id) => httpGet('/artists', { id }),
  // 获取歌手 MV
  artistMv: (id) => httpGet('/artist/mv', { id }),
  // 获取歌手专辑
  artistAlbum: (id) => httpGet('/artist/album', { id }),
  // 歌手分类列表
  artistList: ({ limit, offset }) =>
    httpGet(`/artist/list?limit=${limit}&offset=${(offset - 1) * 30}`)
}
