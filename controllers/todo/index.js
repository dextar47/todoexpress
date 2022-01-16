/**
 * Module dependencies.
 */

 var db = require('../../db');
 
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
  var MongoClient = require('mongodb').MongoClient
  let mongoDBUrl = process.env.MONGOURL;
  MongoClient.connect(mongoDBUrl, function (err, client) {
    if (err) throw err
    var db = client.db('todos')
    db.collection('todos').find().toArray(function (err, result) {
      if (err) throw err
  
      console.log(result)
      res.json({ todos: result });
    })
  })
 };
 
 exports.show = function(req, res, next){
   res.json(req.todo);
 };

 exports.create = function(req, res, next){
   let success = true;
   // save this record
  //  res.json(req.body);
   let status = 'success';
   if (!success) {
     status = 'failed';
   }
   res.json({status: status, data: req.body});
 };
 
 exports.delete = function(req, res, next){
   let success = true;
   // delete the record and assign success var
   let status = 'success';
   if (!success) {
     status = 'failed';
   }
   res.json({status: status, data: req.todo});
 };
 
 exports.update = function(req, res, next){
   let success = true;
   // edit the record and assign success var
   var body = req.body;
   if(body.todo) {
    req.todo = body.todo;
   }
   let status = 'success';
   if (!success) {
     status = 'failed';
   }
   res.json({status: status, data: req.todo});
 };