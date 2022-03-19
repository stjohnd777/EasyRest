let express = require('express')
let fs = require('fs')
let https = require('https')

function RestEndpoint(method, path, provider){
    this.method = method;
    this.path = path;
    this.provider = provider;
}

function RestServiceFactory(name, endpoints,
    app,
    secure , secret, key_file, crt_file ){

    let service = name;

    RestServiceFactory.prototype.exec = function exec (req,res,provider){
        provider(req,res);
    };

    if (!app)
        app = express();

    let httpsOptions
    if (secure) {
        httpsOptions = {key: fs.readFileSync(key_file), cert: fs.readFileSync(crt_file)}
    }

    // middleware for post data
    app.use( (req, res, next)=> {
        let data = ''
        req.setEncoding('utf8')

        req.on('data',  (chunk) =>{data += chunk });

        req.on('end',  ()=> {
            try {
                if (data) {
                    req.body = JSON.parse(data);
                }
            }catch (e){
                req.middleware_err = [];
                req.middleware_err.push(e)
            }
            next();
        })
    })

    // PING ENDPOINT
    app.get(`/${name}/ping`, function(req,res){
        let now = new Date();
        res.json( {
            success: true,
            payload: {
                service: name,
                message: "Service is running",
                server_time: now.toUTCString()
            }})});

    // manage the endpoints
    endpoints.forEach( endpoint =>  {
        let method   = String(endpoint.method)
        let path     = endpoint.path
        let provider = endpoint.provider

        switch(method.toUpperCase()) {
            case "GET":
                app.get(path, provider)
                break
            case "POST":
                app.post(path, provider)
                break
            case "PUT":
                app.put(path, provider)
                break
            case "DEL":
            case "DELETE":
                app.delete(path, provider)
                break

        }
    })

    if(secure) {
        this.start = (port,callback) => {
            let server = https.createServer(httpsOptions, app);
            server.listen( port, function(err, res) {
                console.log(server + " service is running securely on " + port);
                if(callback) {
                    callback(err, res);
                }
            })
        }
    } else {
        this.start =  (port,callback)=> {
            app.listen(port, function (err, res) {
                console.log(service + " service is running on " + port);
                if(callback) {
                    callback(err, res);
                }
             })
        }
    }

    this.stop = function(){
        console.log(service + " service is down on ");
        app.close();
    }
}

module.exports = {
    RestEndpoint: RestEndpoint,
    RestServiceFactory: RestServiceFactory
}








