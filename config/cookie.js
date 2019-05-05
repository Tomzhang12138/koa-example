module.exports = {
    config: {
        maxAge: 1000 * 60 * 30, // cookie有效时长
        path: '/', // 写cookie所在的路径
        domain: '', // 写cookie所在的域名
        httpOnly: true, // 是否只用于http请求中获取
        overwrite: false,  // 是否允许重写
        secure: '',
        sameSite: '',
        signed: ''
    }
}