import { httpGet } from '../server'
import server from '@/api/mock/mockServer'
export const musicApi = {
  //每日推薦歌單
  recommendResource: () => httpGet('/recommend/resource'),
  //歌曲地址
  urlV1: (id) => httpGet(`song/url/v1?id=${id}&level=standard`),
  // 获取歌手详情
  artistDetail: async () => {
    const { data } = await server.get('/artistDetail')
    return data
  },
  // 获取歌手描述
  artistDesc: (id) => httpGet('/artist/desc', { id }),
  // 获取歌手单曲
  artists: (id) => httpGet('/artists', { id }),
  // 获取歌手 MV
  artistMv: (id) => httpGet('/artist/mv', { id }),
  //最新MV
  newMV: () => httpGet('/mv/first'),
  //MV地址
  urlMv: (id) => httpGet('/mv/url', { id }),
  //MV詳情
  mvDetail: (mvid) => httpGet('/mv/detail', { mvid }),
  //MV點讚評論數
  mvLikeCount: (mvid) => httpGet('/mv/detail/info', { mvid }),
  //MV評論
  mvComment: (id) => httpGet('/comment/mv', { id }),
  // 获取歌手专辑
  // artistAlbum: (id) => httpGet('/artist/album', { id }),
  // 歌手分类列表
  artistList: ({ limit, offset }) =>
    httpGet(`/artist/list?limit=${limit}&offset=${(offset - 1) * 30}`),
  //歌單分類
  playlistCatList: () => httpGet('/playlist/catlist'),
  //歌單裡全部歌曲
  playlistAll: (id) => httpGet('/playlist/track/all', { id, limit: 10 }),
  //輪播圖banner
  banner: (type) => httpGet('/banner', { type })
}
