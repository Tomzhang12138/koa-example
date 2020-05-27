const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const BusBoy = require('busboy')

function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

function getSuffixName (filename) {
    let nameList = filename.split('.')
    return nameList[nameList.length - 1]
}

function uploadFile(ctx, options) {
    let req = ctx.req
    let res = ctx.res
    let busBoy = new BusBoy({headers: req.headers})

    let fileType = options.fileType || 'common'
    let filePath = path.join(options.filePath, fileType)
    let makeResult = mkdirSync(filePath)

    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        let result = {
            success: true,
            formData: {}
        }
        busBoy.on('file', function(filedName, file,filename, encoding, mimeType) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let uploadFilePath = path.join(filePath, fileName)
            let saveTo = path.join(uploadFilePath)
            file.pipe(fs.createWriteStream(saveTo))
            file.on('end', function() {
                result.success = true
                result.message = '文件上传成功'
                console.log('上传成功')
                resolve(result)
            })
        })
        busBoy.on('field', (fieldName, val, fieldNameTruncated, valTruncated, encoding, mimeType) => {
            console.log('表单字段数据 [' + fieldName + ']: value: ' + inspect(val));
            result.formData[fieldName] = inspect(val);
        })
        busBoy.on('finish', function( ) {
            console.log('文件上结束')
            resolve(result)
        })
        busBoy.on('error', function(err) {
            console.log('文件上出错')
            reject(result)
        })
        req.pipe(busBoy)
    })
}

module.exports = {
    uploadFile
}