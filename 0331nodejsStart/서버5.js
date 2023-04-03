let http = require("http");
let server = http.createServer( (request, response) => {
    if(request.method == "POST"){
        let body = "";
        request.on("data", (data) => {
            body += data;
        })
        request.on("end", () => {
            let postData = new URLSearchParams(body);
            let name = postData.get("name");
            let age = postData.get("age");
            let tmp = `<h1>post</h1>
                       <h3>${name} ${age}</h3>`;
            response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
            response.end(tmp)
        })
    } else{
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end("<H1>기본 서버입니다.</H1>")
    }
})
server.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000")
});
