/**
 * Module dependencies.
 */

 var db = require('../../db');

 exports.engine = 'hbs';
 
 exports.before = function(req, res, next){
   var id = req.params.todo_id;
   if (!id) return next();
   // pretend to query a database...
   process.nextTick(function(){
     req.todo = db.todos[id];
     // cant find that user
     if (!req.todo) return next('route');
     // found it, move on to the routes
     next();
   });
 };
 
 exports.list = function(req, res, next){
   res.render('list', { todos: db.todos });
 };
 
 exports.edit = function(req, res, next){
   res.render('edit', { user: req.todo });
 };
 
 exports.show = function(req, res, next){
   console.log(req);
   res.render('show', { todo: req.todo });
 };
 
 exports.update = function(req, res, next){
   var body = req.body;
   req.todo.title = body.todo.title;
   res.message('Information updated!');
   res.redirect('/todo/' + req.todo.id);
 };