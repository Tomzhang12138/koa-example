const { Dubbo, java, setting } = require('dubbo2.js')
const interfaceName = 'com.example.demo.dubbo.TestProviderService'
const interfaceVersion = '1.0.0'
const dubboSetting = setting.match(
  interfaceName, { version: interfaceVersion }
)
const dubboService = dubbo => dubbo.proxyService({
  dubboInterface: interfaceName,
  version: '1.0.0',
  methods: {
    Hello (who) {
      return [
        java.String(who)
      ]
    }
  }
})
const service = {dubboService}
// 实例化Dubbo， 入参主要是名称和 dubbo 接口的设置
const dubbo = new Dubbo({
  application: {name: 'dubbo-node-test'},
  register: '127.0.0.1:2181',
  dubboSetting,
  service
})

module.exports = dubbo