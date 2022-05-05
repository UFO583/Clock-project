//导入 http 模块
const http = require('http');
//导入 fs 模块
const fs = require('fs');
//导入 path模块
const path = require('path');

//创建一个基本的web服务器

//创建web实例
const server = http.createServer();

//绑定request
server.on('request', (req, res) => {
    //获取client 的 请求的url 地址
    const url = req.url;

    //把请求的url 地址映射为具体的文件路径
    // const fpath = path.join(__dirname, url);

    //预定一个空白的文件存放路径
    let fpath = '';
    //设定当 url === / 的时候就自动去 index.html 也就是设置主页为 index.html
    if (url === '/') {
        fpath = path.join(__dirname, '/index.html');
    } else {
        fpath = path.join(__dirname, url);
    }

    //根据映射过来的文件路径读取本地的文件
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        //如果获取本地文件失败了怎么办
        if (err) return res.end('404 not found')
        //如果获取本地文件成功了怎么办
        res.end(dataStr);
    })
})

//启动server
server.listen(80, () => {
    console.log('server running at http://127.0.0.1');
})

