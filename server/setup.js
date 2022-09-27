//MySQL Schema setup if using MySQL



const res = require('express/lib/response');
var mysql = require('mysql');

let userArgs = process.argv.slice(2);

if(userArgs.length == 0) {
  console.log('missing arguments');
  console.log('Correct Usage: node server.js -u <mysqlusername> -p <mysqlpassword>');
  return;
}

if(userArgs.length != 4) {
  console.log('Bad arguments');
  console.log('Correct Usage: node server.js -u <mysqlusername> -p <mysqlpassword>');
  return;
}

if(userArgs[0] != '-u') {
  console.log('username missing');
  return;
}

if(userArgs[2] != '-p') {
  console.log('password missing');
  return;
}

user = userArgs[1];
pass = userArgs[3];

var con = mysql.createConnection({
  host: "localhost",
  user: user,
  password: pass,
  database: "fake_so"
});

con.connect(function(err) {
  if (err) throw err;
  
  var userTable = "CREATE TABLE User (uid INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(15), email VARCHAR(255), password VARCHAR(255), reputation INT DEFAULT 0, register_date_time DATETIME DEFAULT CURRENT_TIMESTAMP)";
  var uaTable =  "CREATE TABLE ua (userId INT, ansId INT, PRIMARY KEY(userId, ansId))";
  var uqTable = "CREATE TABLE uq (userId INT, qstnId INT, PRIMARY KEY(userId, qstnId))";
  var utTable = "CREATE TABLE ut (userId INT, tagId INT, PRIMARY KEY(userId, tagId))";
  var Question = "CREATE TABLE Question (qid INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(50), summary VARCHAR(140), text TEXT, asked_by VARCHAR(255) DEFAULT 'Anonymous', views INT DEFAULT 0, upvotes INT DEFAULT 0, downvotes INT DEFAULT 0, ask_date_time DATETIME DEFAULT CURRENT_TIMESTAMP)";
  var Answer = "CREATE TABLE Answer (aid INT AUTO_INCREMENT PRIMARY KEY, text TEXT, ans_by VARCHAR(255) DEFAULT 'Anonymous', upvotes INT DEFAULT 0, downvotes INT DEFAULT 0, ans_date_time DATETIME DEFAULT CURRENT_TIMESTAMP)";
  var Tag = "CREATE TABLE Tag (tid INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
  var Comment = "CREATE TABLE Comment (cid INT AUTO_INCREMENT PRIMARY KEY, text TEXT, comment_by VARCHAR(255) DEFAULT 'Anonymous', comment_date_time DATETIME DEFAULT CURRENT_TIMESTAMP)";
  var qa = "CREATE TABLE qa (qstnId INT, ansId INT, PRIMARY KEY(qstnId, ansId))";
  var qt = "CREATE TABLE qt (qstnId INT, tagId INT, PRIMARY KEY(qstnId, tagId))";
  var qc = "CREATE TABLE qc (qstnId INT, cmtId INT, PRIMARY KEY(qstnId, cmtId))";
  var ac = "CREATE TABLE ac (ansId INT, cmtId INT, PRIMARY KEY(ansId, cmtId))";
  con.query(userTable, function (err, result) {
    if (err) throw err;
    console.log("User Table created");
  });
  con.query(uaTable, function(err,result){
      if(err) throw err;
      console.log("ua Table Created")
  })

  con.query(uqTable, function(err,result){
      if(err) throw err;
      console.log('uqTable Created');
  })
  con.query(utTable, function(err, result){
      if(err) throw err;
      console.log('utTable Created');
  })
  con.query(Question, function(err,result){
      if(err) throw err;
      console.log('Question Table Created');

  })
  con.query(Answer, function(err,result){
      if(err) throw err;
      console.log('Answer Table Created');
  })
  con.query(Tag, function(err, result){
      if(err) throw err;
      console.log('Tag Table Created');
  })
  con.query(qa, function(err, result){
      if(err) throw err;
      console.log("qa Table Created");
  })
  con.query(qt, function(err, result){
      if(err) throw err;
      console.log('qt Table Created');
  })
  con.query(Comment, function(err, result){
    if(err) throw err;
    console.log('comment table created');
  })
  con.query(qc, function(err, result){
    if(err) throw err;
    console.log('qc table created');
  })
  con.query(ac, function(err, result){
    if(err) throw err;
    console.log('ac table created');
  })
  
});
