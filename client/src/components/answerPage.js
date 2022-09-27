import React from "react";
import "./answerPage.css";
import Answer from "./answer.js";
import Tag from "./tag.js";
import CommentPage from "./commentPage.js"


export default class AnswerPage extends React.Component{


    constructor(props){
        super(props)
        this.state = {
            
        };
        this.handleAskButtonPressed = this.handleAskButtonPressed.bind(this);
        this.handleAnsButtonPressed = this.handleAnsButtonPressed.bind(this);
        this.sortAnswers = this.sortAnswers.bind(this);
        this.handleUpvoteQuestionPressed = this.handleUpvoteQuestionPressed.bind(this);
        this.handleDownvoteQuestionPressed = this.handleDownvoteQuestionPressed.bind(this);
        this.handleUpvoteAnswerPressed = this.handleUpvoteAnswerPressed.bind(this);
        this.handleDownvoteAnswerPressed = this.handleDownvoteAnswerPressed.bind(this);
        this.handlePrevAnsButtonPressed = this.handlePrevAnsButtonPressed.bind(this);
        this.handleNextAnsButtonPressed = this.handleNextAnsButtonPressed.bind(this);
        this.handlePostQuestionComment = this.handlePostQuestionComment.bind(this);
        this.handlePostAnswerComment = this.handlePostAnswerComment.bind(this);
    }

    handlePostQuestionComment(e, text, username, uid, qid){

      this.props.onPostQuestionComment(e, text, username, uid, qid)

    }


    handlePostAnswerComment(e, text, username, uid, aid){
      this.props.onPostAnswerComment(e, text, username, uid, aid)

    }


    handleUpvoteQuestionPressed(){
      if(this.props.user.reputation < 100){
        alert("Only users with reputation greater than 100 can vote")
        return;
      }
      
      this.props.onUpvoteQuestionPressed(this.props.qid);
    }

    handleDownvoteQuestionPressed(){
      if(this.props.user.reputation < 100){
        alert("Only users with reputation greater than 100 can vote")
        return;
      }
      
      this.props.onDownvoteQuestionPressed(this.props.qid);
    }

    handleUpvoteAnswerPressed(aid){
      this.props.onUpvoteAnswerPressed(aid);

    }

    handleDownvoteAnswerPressed(aid){
      this.props.onDownvoteAnswerPressed(aid);
    }

    handlePrevAnsButtonPressed(){
      this.props.onPrevAnsPressed(this.props.pageNum)
    }

    handleNextAnsButtonPressed(){
      this.props.onNextAnsPressed(this.props.pageNum)
    }


    handleAskButtonPressed(){

      this.props.onAskButtonPressed();
    }

    handleAnsButtonPressed(qid){
      this.props.onAnsButtonPressed(qid);
    }

    sortAnswers(a,b){
      var months = ['Dec','Nov','Oct','Sep','Aug','Jul','Jun','May','Apr','Mar','Feb','Jan']
    
      if(a.ansOn.substring(8) != b.ansOn.substring(8)){
    
        return parseInt(b.ansOn.substring(8)) - parseInt(a.ansOn.substring(8))
      }
      else if(a.ansOn.substring(0,3) != b.ansOn.substring(0,3)){
    
        return months.indexOf(a.ansOn.substring(0,3)) - months.indexOf(b.ansOn.substring(0,3))
      }
      else if(a.ansOn.substring(4,6) != b.ansOn.substring(4,6)){
        return parseInt(b.ansOn.substring(4,6)) - parseInt(a.ansOn.substring(4,6))
    
      }
      else if(a.ansAt.substring(0,2) != b.ansAt.substring(0,2)){
        return parseInt(b.ansAt.substring(0,2)) - parseInt(a.ansAt.substring(0,2))
    
      }
    
      else if(a.ansAt.substring(3) != b.ansAt.substring(3)){
    
        return parseInt(b.ansAt.substring(3)) - parseInt(a.ansAt.substring(3))
    
      }
    
      else{
    
        return 0
      }
    
    }


    render(){

        
        let Question = "";
        

        for(let i = 0; i< this.props.questions.length; i++){
          if(this.props.questions[i].qid == this.props.qid){
            Question = this.props.questions[i];
            
          }
        }


        const numOfAnswers = Question.answers.length;
        const numOfViews = Question.views;
        const Qtitle = Question.title;
        const Qtext = Question.text;
        const votes = Question.upvotes - Question.downvotes;
        // Tag
        const tagRow = [];
        const tags = Question.tags;
        var count = 0;
        tags.forEach((tag) => {

            
            tagRow.push(<Tag name={tag.name} key={tag.tid}/>);
            count += 1;
            if(count == 4){
                tagRow.push(<br key = {tag.tid + "b"}></br>);
                count = 0;
            }
        })
        //
        //Comment
        const qComments = <CommentPage id ={Question.qid} user ={this.props.user} isLoggedIn = {this.props.isLoggedIn} comments = {Question.comments} onPostComment = {this.handlePostQuestionComment}/>

        const upvoteButton = this.props.isLoggedIn ? <button id ="upvoteButton" onClick={this.handleUpvoteQuestionPressed}>Upvote</button> : null;
        const downvoteButton = this.props.isLoggedIn ? <button id ="downvoteButton" onClick={this.handleDownvoteQuestionPressed}>Downvote</button> : null;
        const askButton = this.props.isLoggedIn ? <button id= "askButton" onClick={this.handleAskButtonPressed}>Ask A Question</button> : <h3>Log in to ask Question</h3>;
        const ansButton = this.props.isLoggedIn ? <button id ="ansButton" onClick={() => {this.handleAnsButtonPressed(this.props.qid)}}>Answer Question</button> : <h3>Log in to answer Question</h3>
        const rows = [];

        var askBy = Question.asked_by;

        
        let date1 = new Date(Question.ask_date_time)
        let e1 = date1.toString().split(" ");
          
        let time1 = e1.slice(1,4)
        let f1 = e1[4].substring(0,5)
        time1.push(f1)

        var askedOn = time1[0] + ' ' + time1[1] +','+' ' + time1[2];
        var askedAt = time1[3];

        Question.askedOn = askedOn;
        Question.askedAt = askedAt;

        

        for(let i = 0; i < Question.answers.length; i++){

          let date = new Date(Question.answers[i].ans_date_time)
          let e = date.toString().split(" ");
          
          let time = e.slice(1,4)
          let f = e[4].substring(0,5)
          time.push(f)

          var ansOn = time[0] + ' ' + time[1] +','+' ' + time[2];

          var ansAt = time[3];

          Question.answers[i].ansOn = ansOn
          Question.answers[i].ansAt = ansAt
        }

        var answers = Question.answers.sort(this.sortAnswers);

        let prevButton = (this.props.pageNum == 1) ? <p>Already First Page</p> : <button id = "prevButton" onClick={this.handlePrevAnsButtonPressed}>Prev</button>;
        let nextButton = (this.props.pageNum == Math.ceil(answers.length/5) || answers.length == 0) ? <p>Already Last Page</p>:<button id = "nextButton" onClick={this.handleNextAnsButtonPressed}>Next</button>;


        let startIdx = (this.props.pageNum -1) * 5;
        let endIdx = startIdx + 5;
        
        
        for(let n = startIdx; n <answers.length && n < endIdx; n++){
            

          
            rows.push(<Answer comments = {answers[n].comments} onPostComment = {this.handlePostAnswerComment} key={answers[n].aid} user={this.props.user} aid = {answers[n].aid} upvotes = {answers[n].upvotes} downvotes = {answers[n].downvotes} isLoggedIn={this.props.isLoggedIn} text={answers[n].text} ansBy = {answers[n].ans_by} ansOn = {answers[n].ansOn} ansAt = {answers[n].ansAt} onUpvoteAnswerPressed = {this.handleUpvoteAnswerPressed} onDownvoteAnswerPressed = {this.handleDownvoteAnswerPressed} userAnswerPage = {false}/>)
            rows.push(
              <tr key ={answers[n].aid + "d"}> 
                <td><hr></hr></td>
                <td><hr></hr></td>
                <td><hr></hr></td>
              </tr>);
          
        }

        rows.push(
          <tr key ="btn">
            <td>{prevButton}</td>
            <td><hr></hr></td>
            <td>{nextButton}</td>

          </tr>
        )

        return ( 
            <table id = "table">
            <thead>
              <tr className="headerRow">
                <th className="col1">{numOfAnswers} Answers</th>  
                <th className="col2">{Qtitle}</th>
                <th className="col3"> {askButton}</th>
              </tr>
              <tr className="headerRow">
                <th className="col1">{numOfViews} Views <br></br> {upvoteButton} <br></br> {votes} <br></br> {downvoteButton}</th>  
                <td className="col2">{Qtext}<br></br>{tagRow}<br></br>{qComments}</td>
                <td className="col3">Asked By {askBy} <br></br> On {askedOn} <br></br> At {askedAt}</td>
              </tr>
              <tr className="headerRow">
                <td className="col1"><hr></hr></td>  
                <td className="col2"><hr></hr></td>
                <td className="col3"><hr></hr></td>
              </tr>

            </thead>
            <tbody>
              {rows}
              <tr className="footer">
            
                <td id = "footer" colSpan={3}>{ansButton}</td> 
                
              </tr>
            </tbody>
            </table>)
    }
}