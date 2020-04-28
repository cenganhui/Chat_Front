let http=require('http')
http.createServer(function (req,res) {
    res.write('<head><meta charset="utf-8"/></head>')
    res.write("test")
    res.end()
}).listen(3000)