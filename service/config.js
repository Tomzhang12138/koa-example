const { Dubbo, setting } = require('dubbo2.js')

const config = {
  appName: 'dubbo-node-test',
  register: '127.0.0.1:2181',
  version: '1.0.0',
  interface: {
    'test': {
      name: 'com.example.demo.dubbo.TestProviderService',
      version: '1.0.0'
    },
    'user': {
      name: 'com.example.demo.dubbo.UserProviderService',
      version: '1.0.0'
    }
  },
  createDubbo: function(interfaceKey, methods) {
    const interface = this.interface[interfaceKey]
    const dubboSetting = setting.match(
      interface.name, { version: interface.version }
    )
    const dubboService = dubbo => dubbo.proxyService({
      dubboInterface: interface.name,
      version: interface.version,
      methods
    })
    
    const service = {dubboService}
    return new Dubbo({
      application: {name: this.appName},
      register: this.register,
      dubboSetting,
      service
    })
  }
}

module.exports = config