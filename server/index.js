let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let bodyParser = require('body-parser')
let fs = require('fs')
let path = require('path')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){
    console.log("dir:" + __dirname);
    res.sendFile( __dirname + '/index.html');
});

app.get('/read_file',function(req,res){
    readFile(res.json(data))
})

app.post('/write_file',function(req,res){
    let data = req.body;
    console.log('写入文件：',data)
    try{
        writeFile(data.msg+"\n")
        res.json({state:1,info:'写入成功'})
    }catch(err){
        console.log('写入借口报错：',err)
        res.json({state:0,info:'写入失败'})
    }
})

function readFile(cb){
    fs.readFile("dolist.txt",'utf-8',function(err,data){
        if(err){
            console.log('读取文件出错：',err)
        }else{
            console.log('读取文件成功：',data)
            if(cb){
                cb(data)
            }
        }
    })
}


function writeFile(data){
    // fs.writeFile(__dirname+'/dolist.txt',data,function(err){
    fs.appendFile('dolist.txt',data,'utf-8',function(err){
        if(err){
            console.log('写入文件出错：',err)
        }else{
            console.log('写入文件成功！')
        }
    })
}


//所有注册用户
let socketMap = {}
io.on('connection',function(socket){
    socket.on('joinIn',function(data){
        socketMap[data.user] = socket
        socket.emit('joinInMsg',{code:200,msg:data})
    })

    socket.on('sendMsg',function(data){
        // 私聊信息 指定发送给某人
        if(data.msg[0] == '@'){
            // 将信息显示在自己的聊天记录上
            socket.emit('receiveMsg',data)
            // 获取第一个空格
            let i = data.msg.indexOf(' ')
            // 获取用户名
            let u = data.msg.substring(1,i)
            // 获得消息
            let m = data.msg.substring(i,data.msg.length)

            if(typeof socketMap[u] != undefined){
                socketMap[u].emit('receiveMsg',{user:data.user,msg:'私聊 ：'+m})
            }
        }else{
            io.sockets.emit('receiveMsg',data)
        }
    })
})
http.listen(3000,function(){
    console.log('端口已打开：3000')
})