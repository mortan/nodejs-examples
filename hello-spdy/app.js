var spdy = require('spdy'),
	https = require('https'),
	send = require('send'),
	util = require('util'),
	fs = require('fs');

var options = {
	key:fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
	cert:fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
	ca:fs.readFileSync(__dirname + '/keys/spdy-csr.pem')
};

var app = spdy.createServer(options,function (req, res) {
	util.log(util.format("Serving %s via SPDY version %s", req.url, req.spdyVersion));
	send(req, req.url).root(__dirname).pipe(res);
}).listen(8000);