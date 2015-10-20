'use strict';

var express = require('express');
var posts = require('./mock/posts.json');

var port = process.env.PORT || 3000;

var postsLists = Object.keys(posts).map(function(value) {
	return posts[value]
});

var app = express();

app.use('/static', express.static(__dirname + '/public')) //app.use() --> defines middleware for app (acts in between client req and route rendering)

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res) {
	var path = req.path;
	res.locals.path = path;
	res.render('index');
	//above two lines can be condensed to:
	//res.render('index', {path: path})
	//same as posts and postLists, but leaving so we have 2 examples
});

app.get('/blog/:title?', function(req, res) {
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.render('blog', {posts: postsLists});
	} else {
		var post = posts[title] || {};
		res.render('post', {post: post});
	}
});

app.listen(port, function(){
	console.log("The frontend server is running on port 3000!") // can have an express server running an api or admin view
});