import Mock from 'mockjs'
import sms from './sms.json'
import token from './login.json'
import artistDetail from './artistDetail.json'

Mock.mock('/mock/sms', {
  code: 200,
  data: sms
})

Mock.mock('/mock/login', {
  code: 200,
  data: token
})

Mock.mock('/mock/artistDetail', {
  code: 200,
  data: artistDetail
})
