import { httpGet } from '../server'

export const musicApi = {
  recommendResource: () => httpGet('/recommend/resource')
}
