// Application server
var mysql      = require('mysql');
var qstn = require('./db/Question');
var ans = require('./db/Answer');
var tag = require('./db/Tag');
var us = require('./db/User');
var cmt = require('./db/Comment')
const express = require('express');
const app = express();
var cors = require('cors')
var bcrypt = require("bcrypt");
const port = 8000;


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

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : user,
  password : pass,
  database : 'fake_so'
});

connection.connect();



app.use(cors());

app.use(express.json());

app.get('/LoginCheck', (req, res) =>{
  let email = req.query.email;
  let password = req.query.password;
  let ret = [];
  const setRet = (rows) => {
    ret = rows;
    var passwordVerified = bcrypt.compareSync(password, ret[0].password)
    ret[0].passwordVerified = passwordVerified;
    res.send(ret);
  }

  us.get_user_email(connection, email, setRet);

})


app.get('/RegisterCheck', (req, res) => {
  let email = req.query.email;
  let ret = [];
  const setRet = (rows) => {
    ret = rows
    res.send(ret);

  }

  us.get_user_email(connection, email, setRet);

})

app.post('/Register', (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  let hash = bcrypt.hashSync(password, 5);


  let ret = [];
  const setRet = (rows) => {
      ret = rows;
      res.send(ret);
  }

  us.add_user(connection,email,username,hash,setRet);
})

app.get('/Logout', (req, res) => {
  //Delete session


})


app.get('/Question_Comments', (req, res) => {
  let qid = req.query.qid;

  let ret = [];
  const setRet = (rows) => {
    ret = rows
    res.send(ret);
  }

  cmt.get_question_comments(connection, qid, setRet);
})

app.get('/Answer_Comments', (req, res) => {
  let aid = req.query.aid;

  let ret = [];
  const setRet = (rows) => {
    ret = rows
    res.send(ret);
  }

  cmt.get_answer_comments(connection, aid, setRet);
})



app.get('/Questions',  (req, res) => {

    let ret = [];
    const setRet = (rows) => {
        ret = rows

        res.send(ret);
    }

    qstn.get_questions(connection, setRet);
})


app.get('/Tags', (req, res) => {

    let ret = [];

    const setRet = (rows) => {
        ret = rows

        res.send(ret);
        
    }
    
    tag.get_tags(connection,setRet);
    
})




app.get('/QTags',  (req, res) => {

  let qid = req.query.qid;
  
  
  let ret = [];
  const setRet = (rows) => {
      ret = rows

      res.send(ret);
  }

  tag.get_question_tags(connection,qid, setRet);
})


app.get('/TagQs',  (req, res) => {

  let tid = req.query.tid;

  let ret = [];
  const setRet = (rows) => {
      ret = rows

      res.send(ret);
  }

  qstn.get_tag_questions(connection,tid, setRet);
})

app.get('/Answers',(req, res) => {
    let ret = [];

    let qid = req.query.qid;

    const setRet = (rows) =>{
        ret = rows

        res.send(ret);
    }

    ans.get_answers(connection, qid, setRet);
} )

app.get("/User_Questions", (req, res) => {

    let ret = [];

    let uid = req.query.uid;

    const setRet = (rows) =>{
        ret = rows

        res.send(ret);
    }

    qstn.get_user_questions(connection, uid, setRet);

})

app.get("/User_Answers", (req, res) => {

  let ret = [];

  let uid = req.query.uid;

  const setRet = (rows) =>{
      ret = rows

      res.send(ret);
  }

  ans.get_user_answers(connection, uid, setRet);

})


app.get("/User_Tags", (req, res) => {

  let ret = [];

  let uid = req.query.uid;

  const setRet = (rows) =>{
      ret = rows

      res.send(ret);
  }

  tag.get_user_tags(connection, uid, setRet);

})


app.post('/Post_Question', (req, res) => {
  let tags = req.body.tags;
  let title = req.body.title;
  let text = req.body.text;
  let asked_by = req.body.username;
  let ask_date_time = new Date();
  let views = 0;
  let upvotes = 0;
  let downvotes =0;
  let uid = req.body.uid;
  let summary = req.body.summary;
  

  let ret = [];

  const setRet = (rows) => {
    ret = rows
    res.send(ret);
  }

  const add_Relation = async (qid) => {
    await tags.forEach((t) => {
      tag.add_new_tag_qstn(connection, qid,t.toLowerCase(), add_ut_Relation)
    })

    //await tags.forEach((t) => {
    //  us.add_user_tag(connection, uid, t.toLowerCase())
    //})


    us.add_user_question(connection, uid, qid)

    qstn.get_questions(connection, setRet);
  }

  const add_ut_Relation = async (tid) => {
    us.add_user_tag(connection, uid, tid)
  }

  qstn.add_Question(connection, title, text, asked_by, ask_date_time, views, upvotes,downvotes, summary, add_Relation);

})


app.post('/Check_Tags', (req, res)=>{
  let tags = req.body.tags

  
  let newTags = [];

  const check = (rows) => {
    let allTags = [];
    rows.forEach((row) => {
      allTags.push(row.name)
    })

    

    let validated = true;
    tags.forEach((tag) => {
      if(!allTags.includes(tag)){
        validated = false;
        newTags.push(tag);
        
      }
    })

    if(validated){
      res.send([])
    }
    else{
      res.send(newTags)
    }

  }

  tag.get_tags(connection, check)
})


app.post('/Post_Answer', (req,res) => {
  let text = req.body.text;
  let ans_by = req.body.username;
  let ans_date_time = new Date();
  let qid = req.body.qid;
  let uid = req.body.uid;

  let ret = [];
  const setRet = (rows) => {
    ret = rows

    res.send(ret);
  }

  const addRelation = (aid) => {
    us.add_user_answer(connection, uid, aid)
  }

  ans.add_new_ans_to_qstn(connection, qid, text, ans_by, ans_date_time, setRet, addRelation);
})



app.post('/Update_ViewCount', (req, res)=>{


  
  //parse the question id from req
  //update view count for that question in the database
  let qid = req.body.id;

  let ret = [];

  const setRet = (rows) => {
    ret = rows
    res.send(ret);
  }

  qstn.update_View(connection, qid, setRet);

})


app.post('/Upvote_Question', (req, res) => {

  let qid = req.body.qid;

  let ret = [];

  const setRet = (rows) => {
    ret = rows
    res.send(rows)
  }

  qstn.upvote(connection, qid, setRet)

})

app.post('/Downvote_Question', (req, res) => {
  let qid = req.body.qid;

  let ret = [];

  const setRet = (rows) => {
    ret = rows
    res.send(rows)
  }

  qstn.downvote(connection, qid, setRet)
})


app.post('/Upvote_Answer', (req, res) => {
  let aid = req.body.aid;

  let ret = [];

  const setRet = (rows) => {
    ret = rows
    res.send(rows)
  }

  ans.upvote(connection, aid, setRet)
})

app.post('/Downvote_Answer', (req, res) => {
  let aid = req.body.aid;

  let ret = [];

  const setRet = (rows) => {
    ret = rows
    res.send(rows)
  }

  ans.downvote(connection, aid, setRet)
})


app.post("/Post_Question_Comment", (req, res) => {
  let text = req.body.text;
  let username = req.body.username;
  let comment_date_time = new Date();
  let qid = req.body.qid;


  let ret =[];

  const setRet = (rows) => {
    ret = rows
    res.send(ret)
  }

  cmt.add_question_comment(connection, text, username, comment_date_time, qid, setRet);
})


app.post("/Post_Answer_Comment", (req, res) => {
  let text = req.body.text;
  let username = req.body.username;
  let comment_date_time = new Date();
  let aid = req.body.aid;

  let ret =[];

  const setRet = (rows) => {
    ret = rows
    res.send(ret)
  }

  cmt.add_answer_comment(connection, text, username, comment_date_time, aid, setRet);


})

app.post("/Delete_Question", (req, res) => {
  let qid = req.body.qid;

  let ret =[];

  const setRet = (rows) => {
    ret = rows
    res.send(ret)
  }

  qstn.delete_question(connection, qid, setRet);
})

app.post("/Delete_Answer", (req, res) => {
  let aid = req.body.aid;

  let ret =[];

  const setRet = (rows) => {
    ret = rows
    res.send(ret)
  }

  ans.delete_answer(connection, aid, setRet);
})

app.post("/Delete_Tag", (req, res) => {
  let tid = req.body.tid;

  let ret =[];

  const setRet = (rows) => {
    ret = rows
    res.send(ret)
  }

  tag.delete_tag(connection, tid, setRet);
})


app.post("/Save_Question", (req, res) => {
  let qid = req.body.qid
  let title = req.body.title
  let text = req.body.text
  let summary = req.body.summary

  let ret = [];

  const setRet = (rows) => {
    ret = rows
    res.send(ret)
  }

  qstn.save_question(connection, qid, title, text, summary, setRet)
})


app.post("/Save_Answer", (req, res) => {
  let aid = req.body.aid
  let text = req.body.text


  let ret = [];

  const setRet = (rows) => {
    ret = rows
    res.send(ret)
  }

  ans.save_answer(connection, aid, text, setRet)
})


app.post("/Save_Tag", (req, res) => {
  let tid = req.body.tid
  let name = req.body.name


  let ret = [];

  const setRet = (rows) => {
    ret = rows
    res.send(ret)
  }

  tag.save_tag(connection, tid, name, setRet)
})









const server = app.listen(port, () => {
    console.log(`Fake StackOverFlow app listening on port ${port}`)
})




process.on('SIGINT', () => {
    connection.end();
    console.log("Server closed. Database instance disconnected");
    process.exit(0);
})