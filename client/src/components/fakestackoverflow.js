import React from 'react';
import axios from 'axios';
import './fakestackoverflow.css';
import Header from "./header.js";
import QuestionPage from "./questionPage.js";
import AskForm from './askForm.js';
import AnswerPage from "./answerPage.js";
import AnsForm from "./ansForm.js";
import TagPage from "./tagPage.js";
import WelcomePage from "./welcomPage.js";
import LogInPage from "./loginForm.js";
import RegisterPage from "./registerForm.js";
import UserQuestionPage from "./userQuestionPage.js";
import UserAnswerPage from "./userAnswerPage.js";
import UserTagPage from "./userTagPage.js";
import EditQuestionPage from "./editQuestionPage.js";
import EditAnswerPage from "./editAnswerPage.js";
import EditTagPage from "./editTagPage.js";

export default class FakeStackOverflow extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers:[],
      tags:[],
      AnsPageAns : [],

      filterText: '',
      filterEnable : false,
      Qpage : false,
      Tpage : false,
      AskForm : false,
      AnsPage : false,
      AnsPageId : "",
      AnsForm : false,
      AnsFormId : "",

      userQuestionPage : false,
      userAnswerPage : false,
      userTagPage : false,

      Header : false,


      WelcomePage : true,
      LogInPage : false,
      RegisterPage : false,
      user : "",
      LoggedIn : false,
      AnsPageNum : 1,
      QuestionPageNum : 1,
      UserPageNum : 1,

      newTitle : '',
      newSummary : '',
      newText : '',
      newName : '',
      editQuestionPage : false,
      editAnswerPage : false,
      editTagPage : false,
      editId : ""
    }
    this.handleRegisterPressed = this.handleRegisterPressed.bind(this);
    this.handleLogOutPressed = this.handleLogOutPressed.bind(this);
    this.handleGuestPressed = this.handleGuestPressed.bind(this);
    this.handleLogInPressed = this.handleLogInPressed.bind(this);
    this.handleLogInButtonPressed = this.handleLogInButtonPressed.bind(this);
    this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(this);
    this.handlePrevButtonPressed = this.handlePrevButtonPressed.bind(this);
    this.handleNextButtonPressed = this.handleNextButtonPressed.bind(this);
    this.handlePostQuestionPressed = this.handlePostQuestionPressed.bind(this);
    this.handlePrevAnsButtonPressed = this.handlePrevAnsButtonPressed.bind(this);
    this.handleNextAnsButtonPressed = this.handleNextAnsButtonPressed.bind(this);
    this.handleAskButtonPressed = this.handleAskButtonPressed.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleEnterKeyUp = this.handleEnterKeyUp.bind(this);
    this.handleQuestionPressed = this.handleQuestionPressed.bind(this);
    this.handleTagPressed = this.handleTagPressed.bind(this);
    this.handleTagLinkPressed = this.handleTagLinkPressed.bind(this);
    this.handleQuestionLinkPressed = this.handleQuestionLinkPressed.bind(this);
    this.handleUpvoteQuestionPressed = this.handleUpvoteQuestionPressed.bind(this);
    this.handleDownvoteQuestionPressed = this.handleDownvoteQuestionPressed.bind(this);
    this.handleUpvoteAnswerPressed = this.handleUpvoteAnswerPressed.bind(this);
    this.handleDownvoteAnswerPressed = this.handleDownvoteAnswerPressed.bind(this);
    this.handlePostAnswerPressed = this.handlePostAnswerPressed.bind(this);
    this.handleAnsButtonPressed = this.handleAnsButtonPressed.bind(this);
    this.handlePostQuestionComment = this.handlePostQuestionComment.bind(this);
    this.handlePostAnswerComment = this.handlePostAnswerComment.bind(this);
    this.handleUserPressed = this.handleUserPressed.bind(this);
    this.handleUserAnswerPressed = this.handleUserAnswerPressed.bind(this);
    this.handleUserTagPressed = this.handleUserTagPressed.bind(this);
    this.handleUserNextPressed = this.handleUserNextPressed.bind(this);
    this.handleUserPrevPressed = this.handleUserPrevPressed.bind(this);
    this.handleEditQuestionPressed = this.handleEditQuestionPressed.bind(this);
    this.handleDeleteQuestionPressed = this.handleDeleteQuestionPressed.bind(this);
    this.handleEditAnswerPressed = this.handleEditAnswerPressed.bind(this);
    this.handleDeleteAnswerPressed = this.handleDeleteAnswerPressed.bind(this);
    this.handleEditTagPressed = this.handleEditTagPressed.bind(this);
    this.handleDeleteTagPressed = this.handleDeleteTagPressed.bind(this);
    this.handleSaveQuestionPressed = this.handleSaveQuestionPressed.bind(this);
    this.handleSaveAnswerPressed = this.handleSaveAnswerPressed.bind(this);
    this.handleSaveTagPressed = this.handleSaveTagPressed.bind(this);
    
    
  }


  handleSaveQuestionPressed(qid, title, text, summary){

    axios.post('http://localhost:8000/Save_Question', {qid : qid, title : title, text : text, summary : summary})
    .then(res => {
      this.handleUserPressed(this.state.user.uid);
    })
  }

  handleSaveAnswerPressed(aid, text){
    axios.post('http://localhost:8000/Save_Answer', {aid : aid, text : text})
    .then(res => {
      this.handleUserAnswerPressed(this.state.user.uid);
    })
  }

  handleSaveTagPressed(tid, name){
    axios.post('http://localhost:8000/Save_Tag', {tid : tid, name : name})
    .then(res => {
      this.handleUserTagPressed(this.state.user.uid);
    })
  }

  handleUserPressed(uid){ 

    axios.get('http://localhost:8000/User_Questions', {params : {uid : uid }})
    .then(async res => {

      for(let i = 0; i < res.data.length; i++){

        let date = new Date(res.data[i].ask_date_time)
        let e = date.toString().split(" ");
        
        let time = e.slice(1,4)
        let f = e[4].substring(0,5)
        time.push(f)

        var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

        var askedAt = time[3];

        res.data[i].askedOn = askedOn
        res.data[i].askedAt = askedAt

        

        await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
        .then(tags => {

          res.data[i].tags = tags.data
          

        })

        await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
        .then(async answers => {

          for(let n =0; n < answers.data.length; n++){
            await axios.get("http://localhost:8000/Answer_Comments", {params : {aid :answers.data[n].aid}})
            .then(ansComments => {
              answers.data[n].comments = ansComments.data
            })
          }

          res.data[i].answers = answers.data
          
        })

        await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
        .then(comments => {

        res.data[i].comments = comments.data

      })
      }
      this.setState({
        questions: res.data,
        Qpage : false,
        filterEnable : false,
        Tpage : false,
        AskForm : false,
        AnsForm : false,
        AnsPage : false,

        userQuestionPage : true,
        Header : true,
        userAnswerPage : false,
        userTagPage : false,
        UserPageNum : 1,
        editAnswerPage : false,
        editQuestionPage : false,
        editTagPage : false


      });
    })

  }
  handleUserNextPressed(pageNum){

    this.setState({

      UserPageNum : pageNum + 1
    })



  }

  handleUserPrevPressed(pageNum){

    this.setState({
      UserPageNum : pageNum - 1
    })

  }

  handleEditQuestionPressed(qid, title, summary, text){
    this.setState({

      userQuestionPage : false,
      userAnswerPage : false,
      userTagPage : false,
      editQuestionPage : true,
      editTagPage : false,
      editAnswerPage : false,
      UserPageNum : 1,

      newTitle : title,
      newSummary : summary,
      newText : text,
      editId : qid

    })

    

    

  }

  handleDeleteQuestionPressed(qid){
    axios.post('http://localhost:8000/Delete_Question', {qid : qid})
    .then(r => {
      this.handleUserPressed(this.state.user.uid);
    })

  }

  handleEditAnswerPressed(aid, text){

    this.setState({

      userQuestionPage : false,
      userAnswerPage : false,
      userTagPage : false,
      editQuestionPage : false,
      editTagPage : false,
      editAnswerPage : true,
      UserPageNum : 1,

      newTitle : "",
      newSummary : "",
      newText : text,
      editId : aid
      
    })

  }

  handleDeleteAnswerPressed(aid){

    axios.post('http://localhost:8000/Delete_Answer', {aid : aid})
    .then(r => {
      this.handleUserAnswerPressed(this.state.user.uid);
    })

  }
  handleEditTagPressed(tid, name){


    axios.get("http://localhost:8000/Tags")
    .then(res => {

      this.setState({

        tags : res.data,

        userQuestionPage : false,
        userAnswerPage : false,
        userTagPage : false,
        editQuestionPage : false,
        editTagPage : true,
        editAnswerPage : false,
        UserPageNum : 1,
  
        newTitle : "",
        newSummary : "",
        newText : "",
        newName : name,
        editId : tid
        
      })

    })

    

  }

  handleDeleteTagPressed(tid){

    axios.post('http://localhost:8000/Delete_Tag', {tid : tid})
    .then(r => {

      this.handleUserTagPressed(this.state.user.uid)

    })

  }

  handleUserAnswerPressed(uid){

    
    axios.get('http://localhost:8000/User_Answers', {params : {uid : uid }})
    .then(res => {

      for(let i = 0; i < res.data.length; i++){

        let date = new Date(res.data[i].ans_date_time)
        let e = date.toString().split(" ");
        
        let time = e.slice(1,4)
        let f = e[4].substring(0,5)
        time.push(f)

        var ansOn = time[0] + ' ' + time[1] +','+' ' + time[2];

        var ansAt = time[3];

        res.data[i].ansOn = ansOn
        res.data[i].ansAt = ansAt       
      }

      
      this.setState({
        answers : res.data,
        Qpage : false,
        filterEnable : false,
        Tpage : false,
        AskForm : false,
        AnsForm : false,
        AnsPage : false,

        userQuestionPage : false,
        Header : true,
        userAnswerPage : true,
        userTagPage : false,
        UserPageNum : 1,
        editAnswerPage : false,
        editQuestionPage : false,
        editTagPage : false


      });
    })

  }

  handleUserTagPressed(uid){

    axios.get('http://localhost:8000/User_Tags', {params : {uid : uid }})
    .then(async res => {

      for(let i =0; i < res.data.length; i++){

        await axios.get('http://localhost:8000/TagQs',{params: {tid : res.data[i].tid} })
          .then(qs => {

            res.data[i].qs = qs.data;
            

          })
      }
     
      this.setState({
        tags : res.data,
        Qpage : false,
        filterEnable : false,
        Tpage : false,
        AskForm : false,
        AnsForm : false,
        AnsPage : false,

        userQuestionPage : false,
        Header : true,
        userAnswerPage : false,
        userTagPage : true,
        UserPageNum : 1,
        editAnswerPage : false,
        editQuestionPage : false,
        editTagPage : false


      });
    })

  }

  handlePostQuestionComment(e, text, username, uid, qid){

    if(e.key == "Enter"){
      if(text.length > 140){
        alert("comment must have less than 140 characters")
        return
      }
      if(this.state.user.reputation < 100){
        alert("must have more than 100 reputation to comment")
        return
      }
      axios.post("http://localhost:8000/Post_Question_Comment", {text : text, username : username, qid:qid})
      .then(r => {
        axios.get('http://localhost:8000/Questions')
      .then(async res => {

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            for(let n =0; n < answers.data.length; n++){
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid :answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })

          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })
        }
        this.setState({
          questions: res.data,
          Qpage : false,
          filterEnable : false,
          Tpage : false,
          AskForm : false,
          AnsForm : false,
          AnsPage : true

        });
      })

      })

    }

  }


  handlePostAnswerComment(e, text, username, uid, aid){

    if(e.key == "Enter"){
      if(text.length > 140){
        alert("comment must have less than 140 characters")
        return
      }
      if(this.state.user.reputation < 100){
        alert("must have more than 100 reputation to comment")
        return
      }
      axios.post("http://localhost:8000/Post_Answer_Comment", {text : text, username : username, aid:aid})
      .then(r => {
        axios.get('http://localhost:8000/Questions')
      .then(async res => {

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            for(let n =0; n < answers.data.length; n++){
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid :answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })

          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })
        }
        this.setState({
          questions: res.data,
          Qpage : false,
          filterEnable : false,
          Tpage : false,
          AskForm : false,
          AnsForm : false,
          AnsPage : true

        });
      })

      })

       
      
    }

  }

  handleQuestionPressed(){  // Change
    document.getElementById("Questions").style.backgroundColor = "#0281E8";
    document.getElementById("Tags").style.backgroundColor = "";

    axios.get('http://localhost:8000/Questions')
      .then(async res => {

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            for(let n =0; n < answers.data.length; n++){
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid :answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })

          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })
        }
        this.setState({
          questions: res.data,
          Qpage : true,
          filterEnable : false,
          Tpage : false,
          AskForm : false,
          AnsForm : false,
          AnsPage : false,

          userQuestionPage : false,
          userAnswerPage : false,
          userTagPage : false,

          AnsPageNum : 1,
          QuestionPageNum : 1,
          editAnswerPage : false,
          editQuestionPage : false,
          editTagPage : false

        });
      })
    
    

  }

  handleTagPressed(){   // Change

    document.getElementById("Questions").style.backgroundColor = "";
    document.getElementById("Tags").style.backgroundColor = "#0281E8";

    axios.get('http://localhost:8000/Tags')
    .then(async res => {


      for(let i =0; i < res.data.length; i++){

        await axios.get('http://localhost:8000/TagQs',{params: {tid : res.data[i].tid} })
          .then(qs => {

            res.data[i].qs = qs.data;
            

          })
      }




      this.setState({
        tags : res.data,
        Qpage : false,
        filterEnable : false,
        Tpage : true,
        AskForm : false,
        AnsForm : false,
        AnsPage : false,
        userAnswerPage : false,
        userQuestionPage : false,
        userTagPage : false,
        AnsPageNum : 1,
        QuestionPageNum : 1,
        editAnswerPage : false,
        editQuestionPage : false,
        editTagPage : false
      })})
    
    
  }

  handleTagLinkPressed(name){
    let searchTag = "[" + name + "]"
    document.getElementById("Questions").style.backgroundColor = "#0281E8";
    document.getElementById("Tags").style.backgroundColor = "";
    this.setState({
      Qpage : true,
      filterEnable : true,
      Tpage : false,
      AskForm : false,
      AnsForm : false,
      AnsPage : false,
      filterText : searchTag,

      userAnswerPage: false,
      userQuestionPage : false,
      userTagPage : false,
      UserPageNum : 1,

      AnsPageNum: 1,
      QuestionPageNum : 1

      
    })

    
  }
  handleQuestionLinkPressed(qid){

    let questionId = qid;

    document.getElementById("Questions").style.backgroundColor = "";
    document.getElementById("Tags").style.backgroundColor = "";

    
    axios.post('http://localhost:8000/Update_ViewCount', { id: qid  })
    .then(r => {
      
    
      axios.get('http://localhost:8000/Questions')
      .then(async res => {

        

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            for(let n =0; n < answers.data.length; n++){
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid : answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })

          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })
        }
        this.setState({
          questions: res.data,
          Qpage : false,
          filterEnable : false,
          Tpage : false,
          AskForm : false,
          AnsForm : false,
          AnsPage : true,
          AnsPageId : questionId,

          userQuestionPage: false,
          userAnswerPage : false,
          userTagPage : false,
          Header : true,
          UserPageNum : 1,

          AnsPageNum: 1

        });
      })
    })


  }
  handleFilterTextChange(filterText){

    this.setState({
      filterText : filterText, 
      filterEnable : false
    })
  }

  handleEnterKeyUp(e){ // Change
    
    if(e.key == "Enter"){
       
      this.setState({
        filterEnable : true,
        Qpage : true,
        Tpage : false,
        AskForm : false,
        AnsForm : false,
        AnsPage : false,

        userQuestionPage : false,
        userAnswerPage : false,
        userTagPage : false
      })
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/Questions')
      .then(async res => {

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            

            for(let n =0; n < answers.data.length; n++){
              
              
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid : answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })


          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })



        }

        

        this.setState({
          questions: res.data
          
        });
      })
    
  }

  handleAskButtonPressed(){

    this.setState({

      filterText: '',
      filterEnable : false,
      Qpage : false,
      Tpage : false,
      AskForm : true,
      AnsPage : false,
      AnsPageId : "",
      AnsForm : false,
      AnsFormId : "",

      Header : true,
      userQuestionPage : false,
      userAnswerPage : false,
      userTagPage : false,
      WelcomePage : false,
      LogInPage : false,
      RegisterPage : false,
      AnsPageNum : 1,
      QuestionPageNum : 1 

      
    })



  }

  handleAnsButtonPressed(qid){
    document.getElementById("Questions").style.backgroundColor = "";
    document.getElementById("Tags").style.backgroundColor = "";
    this.setState({
      Qpage : false,
      filterEnable : false,
      Tpage : false,
      AskForm : false,
      AnsForm : true,
      AnsPage : false,
      AnsPageId : qid,

      AnsPageNum : 1
      
    })

  }

  handleGuestPressed(){
    axios.get('http://localhost:8000/Questions')
      .then(async res => {

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            for(let n =0; n < answers.data.length; n++){
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid : answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })

          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })



        }


        this.setState({
          questions: res.data,
          AnsPageAns : [],
    
          filterText: '',
          filterEnable : false,
          Qpage : true,
          Tpage : false,
          AskForm : false,
          AnsPage : false,
          AnsPageId : "",
          AnsForm : false,
          AnsFormId : "",
    
          Header : true,
          WelcomePage : false,
          LogInPage : false,
          RegisterPage : false,
          user : "",
          LoggedIn : false,
          AnsPageNum : 1,
          QuestionPageNum : 1 

          
        });
      })

  }

  handleLogInPressed(){

    this.setState({


      filterText: '',
      filterEnable : false,
      Qpage : false,
      Tpage : false,
      AskForm : false,
      AnsPage : false,
      AnsPageId : "",
      AnsForm : false,
      AnsFormId : "",

      Header : false,
      WelcomePage : false,
      LogInPage : true,
      RegisterPage : false,
      user : "",
      LoggedIn : false,
      AnsPageNum : 1,
      QuestionPageNum : 1 

      
    });

  }

  handleLogInButtonPressed(password, email){

    

    //Query database with email 
    //If not exist reject
    //If exist check password
    //If password not correct reject
    var errMsgs = document.getElementsByClassName("errMsg")
        for(let i = 0; i< errMsgs.length; i++){
            if(errMsgs[i].style.display != "none"){
            errMsgs[i].style.display = "none";
            }
        }
    axios.get('http://localhost:8000/LoginCheck', {params: {email : email, password : password}})
    .then(res => {
      if(res.data.length == 0){
        document.getElementById('loginErrMsg1').style.display = "flex";
        return
      }
      if(!res.data[0].passwordVerified){
        document.getElementById('loginErrMsg2').style.display = "flex";
        return
      }
      this.setState({

        filterText: '',
        filterEnable : false,
        Qpage : true,
        Tpage : false,
        AskForm : false,
        AnsPage : false,
        AnsPageId : "",
        AnsForm : false,
        AnsFormId : "",
  
        Header : true,
        WelcomePage : false,
        LogInPage : false,
        RegisterPage : false,
        user : res.data[0],
        LoggedIn : true,
        AnsPageNum : 1,
        QuestionPageNum : 1           
      });
    })
  }

  handleRegisterPressed(){
    this.setState({
      
      AnsPageAns : [],

      filterText: '',
      filterEnable : false,
      Qpage : false,
      Tpage : false,
      AskForm : false,
      AnsPage : false,
      AnsPageId : "",
      AnsForm : false,
      AnsFormId : "",

      Header : false,
      WelcomePage : false,
      LogInPage : false,
      RegisterPage : true,
      user : "",
      LoggedIn : false,
      AnsPageNum : 1,
      QuestionPageNum : 1 

      
    });
    
  }

  handleRegisterButtonPressed(username, password, email){

    
    //Query database with email
    //If exist then reject
    //If not exist then create a new row in user table
    axios.get('http://localhost:8000/RegisterCheck', {params: {email : email}})
    .then(res => {
      if(res.data.length != 0){
        document.getElementById("regErrMsg3").style.display = "flex";
        return
      }

      axios.post('http://localhost:8000/Register', {username : username, password : password, email : email})
      .then(res => {



        this.setState({
          
          AnsPageAns : [],
    
          filterText: '',
          filterEnable : false,
          Qpage : false,
          Tpage : false,
          AskForm : false,
          AnsPage : false,
          AnsPageId : "",
          AnsForm : false,
          AnsFormId : "",
    
          Header : false,
          WelcomePage : false,
          LogInPage : true,
          RegisterPage : false,
          user : "",
          LoggedIn : false,
          AnsPageNum : 1,
          QuestionPageNum : 1 
    
          
        });
      })


    })

  }


  handleLogOutPressed(){
    //Destroy session

    this.setState({
          
          AnsPageAns : [],
    
          filterText: '',
          filterEnable : false,
          Qpage : false,
          Tpage : false,
          AskForm : false,
          AnsPage : false,
          AnsPageId : "",
          AnsForm : false,
          AnsFormId : "",

          userQuestionPage : false,
          userAnswerPage : false,
          userTagPage : false,
    
          Header : false,
          WelcomePage : true,
          LogInPage: false,
          RegisterPage : false,
          user : "",
          LoggedIn : false,
          AnsPageNum : 1,
          QuestionPageNum : 1

    })
  }


  handlePrevButtonPressed(pageNum){

    this.setState({
      
      Qpage : true,
      Tpage : false,
      AskForm : false,
      AnsPage : false,
      AnsPageId : "",
      AnsForm : false,
      AnsFormId : "",

      Header : true,
      WelcomePage : false,
      LogInPage: false,
      RegisterPage : false,
      AnsPageNum : 1,
      QuestionPageNum : pageNum -1

  })

}


  handleNextButtonPressed(pageNum){

    this.setState({
      
      Qpage : true,
      Tpage : false,
      AskForm : false,
      AnsPage : false,
      AnsPageId : "",
      AnsForm : false,
      AnsFormId : "",

      Header : true,
      WelcomePage : false,
      LogInPage: false,
      RegisterPage : false,
      AnsPageNum : 1,
      QuestionPageNum : pageNum + 1

  })

}

  handlePrevAnsButtonPressed(pageNum){

    this.setState({
      
      Qpage : false,
      Tpage : false,
      AskForm : false,
      AnsPage : true,
      AnsForm : false,

      Header : true,
      WelcomePage : false,
      LogInPage: false,
      RegisterPage : false,
      AnsPageNum : pageNum -1,
      QuestionPageNum : 1

  })

}

  handleNextAnsButtonPressed(pageNum){
    this.setState({
      
      Qpage : false,
      Tpage : false,
      AskForm : false,
      AnsPage : true,
      AnsForm : false,

      Header : true,
      WelcomePage : false,
      LogInPage: false,
      RegisterPage : false,
      AnsPageNum : pageNum + 1,
      QuestionPageNum : 1

  })
  }

  handlePostQuestionPressed(uid, username, title, summary, text, tags, reputation){

    var title = title;
    var text = text;
    var tags = tags;
    var username = username;
    var uid = uid;
    var summary = summary;
    var reputation = reputation;
    tags = tags.toLowerCase().split(" ");

    document.getElementById("Questions").style.backgroundColor = "#0281E8";
    document.getElementById("Tags").style.backgroundColor = "";

    //Check if new tag exist
    axios.post("http://localhost:8000/Check_Tags", {tags :tags})
    .then(result => {


      if(result.data.length != 0){
        if(reputation < 100){
          
          document.getElementById("errMsg5").style.display = "flex";
          return

        }
      }
      axios.post('http://localhost:8000/Post_Question', {title : title, text: text, tags : tags, username : username, uid: uid, summary: summary})
    .then(async res => {

      for(let i = 0; i < res.data.length; i++){

        let date = new Date(res.data[i].ask_date_time)
        let e = date.toString().split(" ");
        
        let time = e.slice(1,4)
        let f = e[4].substring(0,5)
        time.push(f)

        var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

        var askedAt = time[3];

        res.data[i].askedOn = askedOn
        res.data[i].askedAt = askedAt

        

        await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
        .then(tags => {

          res.data[i].tags = tags.data
          

        })


        await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
        .then(async answers => {

          for(let n =0; n < answers.data.length; n++){
            await axios.get("http://localhost:8000/Answer_Comments", {params : {aid : answers.data[n].aid}})
            .then(ansComments => {
              answers.data[n].comments = ansComments.data
            })
          }

          res.data[i].answers = answers.data

          
        })

        await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
        .then(comments => {

          res.data[i].comments = comments.data

        })
      }
      this.setState({
        questions : res.data,
        Qpage : true,
        Tpage : false,
        AskForm : false,
        AnsForm : false,
        AnsPage : false,
        filterText : "",
        filterEnable : false,
        AnsFormId : "",

        Header : true,
        WelcomePage : false,
        LogInPage: false,
        RegisterPage : false,

        QuestionPageNum : 1,
        AnsPageNum : 1
  
      })
    })
    })
    
  }


  handleUpvoteQuestionPressed(qid){
    axios.post("http://localhost:8000/Upvote_Question", {qid : qid})
    .then(res => {
      axios.get('http://localhost:8000/Questions')
      .then(async res => {

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            for(let n =0; n < answers.data.length; n++){
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid :answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })

          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })
        }
        this.setState({
          questions: res.data,
          Qpage : false,
          filterEnable : false,
          Tpage : false,
          AskForm : false,
          AnsForm : false,
          AnsPage : true,
          QuestionPageNum : 1

        });
      })

    })
  }

  handleDownvoteQuestionPressed(qid){
    axios.post("http://localhost:8000/Downvote_Question", {qid : qid})
    .then(res => {
      axios.get('http://localhost:8000/Questions')
      .then(async res => {

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            for(let n =0; n < answers.data.length; n++){
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid :answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })

          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })
        }
        this.setState({
          questions: res.data,
          Qpage : false,
          filterEnable : false,
          Tpage : false,
          AskForm : false,
          AnsForm : false,
          AnsPage : true,
          QuestionPageNum : 1

        });
      })

    })
    
  }

  handleUpvoteAnswerPressed(aid){
    axios.post("http://localhost:8000/Upvote_Answer", {aid : aid})
    .then(res => {
      axios.get('http://localhost:8000/Questions')
      .then(async res => {

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            for(let n =0; n < answers.data.length; n++){
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid :answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })

          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })
        }
        this.setState({
          questions: res.data,
          Qpage : false,
          filterEnable : false,
          Tpage : false,
          AskForm : false,
          AnsForm : false,
          AnsPage : true,
          QuestionPageNum : 1

        });
      })

    })
  }
  handleDownvoteAnswerPressed(aid){
    axios.post("http://localhost:8000/Downvote_Answer", {aid : aid})
    .then(res => {
      axios.get('http://localhost:8000/Questions')
      .then(async res => {

        for(let i = 0; i < res.data.length; i++){

          let date = new Date(res.data[i].ask_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var askedAt = time[3];

          res.data[i].askedOn = askedOn
          res.data[i].askedAt = askedAt

          

          await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
          .then(tags => {

            res.data[i].tags = tags.data
            

          })

          await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
          .then(async answers => {

            for(let n =0; n < answers.data.length; n++){
              await axios.get("http://localhost:8000/Answer_Comments", {params : {aid :answers.data[n].aid}})
              .then(ansComments => {
                answers.data[n].comments = ansComments.data
              })
            }

            res.data[i].answers = answers.data
            
          })

          await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
          .then(comments => {

          res.data[i].comments = comments.data

        })
        }
        this.setState({
          questions: res.data,
          Qpage : false,
          filterEnable : false,
          Tpage : false,
          AskForm : false,
          AnsForm : false,
          AnsPage : true,
          QuestionPageNum : 1

        });
      })

    })
  }

  handlePostAnswerPressed(qid, text, username, uid){
    document.getElementById("Questions").style.backgroundColor = "";
    document.getElementById("Tags").style.backgroundColor = "";
    axios.post('http://localhost:8000/Post_Answer', { qid: qid, text : text, username : username , uid : uid})
    .then(async res => {


      for(let i = 0; i < res.data.length; i++){

        let date = new Date(res.data[i].ask_date_time)
        let e = date.toString().split(" ");
        
        let time = e.slice(1,4)
        let f = e[4].substring(0,5)
        time.push(f)

        var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

        var askedAt = time[3];

        res.data[i].askedOn = askedOn
        res.data[i].askedAt = askedAt

        

        await axios.get('http://localhost:8000/QTags',{params: {qid : res.data[i].qid} })
        .then(tags => {

          res.data[i].tags = tags.data
          

        })

        await axios.get('http://localhost:8000/Answers', {params : {qid : res.data[i].qid}})
        .then(async answers => {

          


          for(let n =0; n < answers.data.length; n++){
            await axios.get("http://localhost:8000/Answer_Comments", {params : {aid : answers.data[n].aid}})
            .then(ansComments => {
              answers.data[n].comments = ansComments.data
            })
          }
          res.data[i].answers = answers.data
          
        })


        await axios.get("http://localhost:8000/Question_Comments", {params : {qid : res.data[i].qid}})
        .then(comments => {

          res.data[i].comments = comments.data

        })
      }

      

      
      this.setState({
        questions : res.data,
        Qpage : false,
        filterEnable : false,
        Tpage : false,
        AskForm : false,
        AnsForm : false,
        AnsPage : true,
        AnsPageId : qid,

        AnsPageNum : 1
        
      })

    })
  }

  




  render() {


    const header = this.state.Header ? <Header
      
    filterText = {this.state.filterText}
    onEnterKeyUp = {this.handleEnterKeyUp}
    onFilterTextChange = {this.handleFilterTextChange}
    Qpage = {this.state.Qpage}
    Tpage = {this.state.Tpage}
    onQuestionClick = {this.handleQuestionPressed}
    onTagClick = {this.handleTagPressed}
    isLoggedIn = {this.state.LoggedIn}
    user = {this.state.user}
    onUserPressed = {this.handleUserPressed}
    onLogOutPressed = {this.handleLogOutPressed}/> : null;


    const welcomPage = this.state.WelcomePage ? <WelcomePage
    onLogInPressed = {this.handleLogInPressed} 
    onRegisterPressed = {this.handleRegisterPressed}
    onGuestPressed = {this.handleGuestPressed}
    /> : null;


    const loginPage = this.state.LogInPage ? <LogInPage
    onLogInButtonPressed = {this.handleLogInButtonPressed}/> : null;

    const registerPage = this.state.RegisterPage ? <RegisterPage
    onRegisterButtonPressed = {this.handleRegisterButtonPressed}/> : null;

    const questionPage = this.state.Qpage ? <QuestionPage 
    data={this.state.questions} 
    filterText={this.state.filterText} 
    filterEnable = {this.state.filterEnable}
    onAskButtonPressed = {this.handleAskButtonPressed} 
    onQuestionLinkPressed = {this.handleQuestionLinkPressed}
    isLoggedIn = {this.state.LoggedIn}
    pageNum = {this.state.QuestionPageNum}
    onPrevPressed = {this.handlePrevButtonPressed}
    onNextPressed = {this.handleNextButtonPressed}
    userQuestionPage = {false}
    onEditQuestionPressed = {this.handleEditQuestionPressed}
    onDeleteQuestionPressed = {this.handleDeleteQuestionPressed}
    /> : null;

    const userQuestionPage = this.state.userQuestionPage ? <UserQuestionPage 
    questions = {this.state.questions} 
    pageNum = {this.state.UserPageNum} 
    user ={this.state.user}
    onAskButtonPressed = {this.handleAskButtonPressed}
    onQuestionLinkPressed = {this.handleQuestionLinkPressed}
    onUserAnswerPressed ={this.handleUserAnswerPressed}
    onUserTagPressed = {this.handleUserTagPressed}
    onEditQuestionPressed = {this.handleEditQuestionPressed}
    onDeleteQuestionPressed = {this.handleDeleteQuestionPressed}
    onUserNextPressed = {this.handleUserNextPressed}
    onUserPrevPressed = {this.handleUserPrevPressed}/> : null;

    const userAnswerPage = this.state.userAnswerPage ? <UserAnswerPage 
    answers = {this.state.answers}
    pageNum = {this.state.UserPageNum}
    user = {this.state.user}
    onUserAnswerPressed = {this.handleUserAnswerPressed}
    onUserTagPressed = {this.handleUserTagPressed}
    onEditAnswerPressed = {this.handleEditAnswerPressed}
    onDeleteAnswerPressed = {this.handleDeleteAnswerPressed}
    onUserNextPressed = {this.handleUserNextPressed}
    onUserPrevPressed = {this.handleUserPrevPressed}
    onAskButtonPressed = {this.handleAskButtonPressed}/> : null;

    const userTagPage = this.state.userTagPage ? <UserTagPage
    tags = {this.state.tags}
    user = {this.state.user}
    onUserAnswerPressed = {this.handleUserAnswerPressed}
    onUserTagPressed = {this.handleUserTagPressed}
    onEditTagPressed = {this.handleEditTagPressed}
    onDeleteTagPressed = {this.handleDeleteTagPressed}
    onTagLinkPressed = {this.handleTagLinkPressed}
    onAskButtonPressed = {this.handleAskButtonPressed}/> : null;


    const tagPage = this.state.Tpage ? <TagPage data = {this.state.tags}  onTagLinkPressed = {this.handleTagLinkPressed} onAskButtonPressed = {this.handleAskButtonPressed} isLoggedIn = {this.state.LoggedIn} 
    userTagPage = {false}
    onEditTagPressed = {this.handleEditTagPressed}
    onDeleteTagPressed = {this.handleDeleteTagPressed}/> : null;
    const askForm = this.state.AskForm ? <AskForm onPostQuestionPressed={this.handlePostQuestionPressed} user = {this.state.user}/> : null;


    const ansForm = this.state.AnsForm ? <AnsForm qid ={this.state.AnsPageId} onPostAnswerPressed={this.handlePostAnswerPressed} user = {this.state.user}/> : null;
    const answerPage = this.state.AnsPage ? <AnswerPage
    questions={this.state.questions}
    qid = {this.state.AnsPageId}
    answers = {this.state.AnsPageAns}
    onAskButtonPressed = {this.handleAskButtonPressed}
    onAnsButtonPressed = {this.handleAnsButtonPressed}
    isLoggedIn = {this.state.LoggedIn}
    user = {this.state.user}
    pageNum = {this.state.AnsPageNum}
    onPrevAnsPressed = {this.handlePrevAnsButtonPressed}
    onNextAnsPressed = {this.handleNextAnsButtonPressed}
    onUpvoteQuestionPressed = {this.handleUpvoteQuestionPressed}
    onDownvoteQuestionPressed = {this.handleDownvoteQuestionPressed}
    onUpvoteAnswerPressed = {this.handleUpvoteAnswerPressed}
    onDownvoteAnswerPressed = {this.handleDownvoteAnswerPressed}
    onPostQuestionComment = {this.handlePostQuestionComment}
    onPostAnswerComment = {this.handlePostAnswerComment}

    /> : null;


    const editQuestionPage = this.state.editQuestionPage ? <EditQuestionPage 
    newTitle = {this.state.newTitle}
    newText = {this.state.newText}
    newSummary = {this.state.newSummary}
    id = {this.state.editId}
    onSaveQuestionPressed = {this.handleSaveQuestionPressed}/> : null;


    const editAnswerPage = this.state.editAnswerPage ? <EditAnswerPage
    newText = {this.state.newText}
    id = {this.state.editId}
    onSaveAnswerPressed = {this.handleSaveAnswerPressed}/> : null;

    const editTagPage = this.state.editTagPage ? <EditTagPage
    newName = {this.state.newName}
    id = {this.state.editId}
    onSaveTagPressed = {this.handleSaveTagPressed}
    tags = {this.state.tags}/> : null;

    return (
    <div>
      <div className='Header'>
        {header}
      
      </div>

      <div className='Body'>
        {welcomPage}
        {loginPage}
        {registerPage}
        {questionPage}
        {askForm}
        {tagPage}
        {answerPage}
        {ansForm}
        {userQuestionPage}
        {userAnswerPage}
        {userTagPage}
        {editQuestionPage}
        {editAnswerPage}
        {editTagPage}
      </div>

    </div>
    )
  }
}
