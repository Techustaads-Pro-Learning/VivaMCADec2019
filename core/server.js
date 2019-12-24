const http = require('http');
var settings = require('../setting');
var controller = require("../controllers/currency");
// Create an HTTP tunneling proxy
const proxy = http.createServer((req, resp) => {
    
    switch(req.method) {
        case "GET" :
            if(req.url == '/') {
                //cur.getlist(req, resp);
                //req.end();
                resp.writeHead(200, {"Content-Type":"text/html"});
            }
            else if(req.url == '/getlist') {
                controller.getList(req, resp);
                //req.end();
            }else {
                thenum = req.url.match(/\d+/)[0] // "3"
                // var patternDAta = "[0-9]+";
                // var reqURL = req.url;
                // var patt = new RegExp("/getlist/" + patternDAta);
                // if(patt.test(reqURL)) {
                //   patt = new RegExp(patternDAta);
                //   var newno = patt.exec(reqURL);
                //   console.log(newno[0]);
                  controller.getListByID(req, resp, thenum);
                //}
                                                          
            }
        break;
        case "POST" :
            if(req.url === '/addCurrency') {
               var reqBody = '';
               req.on('data', function (data) {
                    reqBody += data;
               })   
               req.on('end', function () {
                 controller.addUserToList(req, resp, reqBody);
               })   
            }
            break;
        case "PUT" :
            break;
        case "DELETE" :
            break;
        default :
            resp.writeHead(403, {"Content-Type":"text/html"});
            resp.write("invalid request");
            resp.end();
            break;
     
   }


}).listen(settings.nodePort,function (){
    console.log('server working fine');
});
