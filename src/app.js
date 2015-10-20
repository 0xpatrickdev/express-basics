'use strict';

var express = require('express');
var posts = require('./mock/posts.json');

var app = express();

app.use('/static', express.static(__dirname + '/public')) //app.use() --> defines middleware for app (acts in between client req and route rendering)

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/blog/:title?', function(req, res) {
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.send("This page is under construction. My b.");
	} else {
		var post = posts[title] || {};
		res.render('post', { post: post});
	}
});

app.listen(3000, function(){
	console.log("The frontend server is running on port 3000!") // can have an express server running an api or admin view
});