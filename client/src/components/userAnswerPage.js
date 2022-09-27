import React from "react";

import "./userAnswerPage.css"

import Answer from "./answer.js"


export default class UserAnswerPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {

        }
        this.handleUserAnswerPressed = this.handleUserAnswerPressed.bind(this);
        this.handleUserTagPressed = this.handleUserTagPressed.bind(this);
        
        this.handleUserNextButtonPressed = this.handleUserNextButtonPressed.bind(this);
        this.handleUserPrevButtonPressed = this.handleUserPrevButtonPressed.bind(this);
        
        this.handleEditAnswerPressed = this.handleEditAnswerPressed.bind(this);
        this.handleDeleteAnswerPressed = this.handleDeleteAnswerPressed.bind(this);

        this.handleAskButtonPressed = this.handleAskButtonPressed.bind(this);

        this.sortAnswers = this.sortAnswers.bind(this);
    }

    handleAskButtonPressed(){
        this.props.onAskButtonPressed();
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

      handleDeleteAnswerPressed(aid){

        this.props.onDeleteAnswerPressed(aid);

      }


      handleEditAnswerPressed(aid, text){
          this.props.onEditAnswerPressed(aid, text);
      }

      handleUserAnswerPressed(){

        this.props.onUserAnswerPressed(this.props.user.uid)
      }

      handleUserTagPressed(){
          this.props.onUserTagPressed(this.props.user.uid)
      }


      handleUserNextButtonPressed(){
        this.props.onUserNextPressed(this.props.pageNum)
      }

      handleUserPrevButtonPressed(){
         this.props.onUserPrevPressed(this.props.pageNum)
      }



    render(){

        

        const answers = this.props.answers.sort(this.sortAnswers);

        const numOfAnswers = answers.length;
        const answerRows = [];

        let prevButton = (this.props.pageNum == 1) ? <p>Already First Page</p> : <button id = "prevButton" onClick={this.handleUserPrevButtonPressed}>Prev</button>;
        let nextButton = (this.props.pageNum == Math.ceil(answers.length/5) || answers.length == 0) ? <p>Already Last Page</p>:<button id = "nextButton" onClick={this.handleUserNextButtonPressed}>Next</button>;
        let askButton = <button id= "askButton" onClick={this.handleAskButtonPressed}>Ask A Question</button>

        let startIdx = (this.props.pageNum -1) * 5;
        let endIdx = startIdx + 5;

        for(let n = startIdx; n <answers.length && n < endIdx; n++){
            

          
            answerRows.push(<Answer onEditAnswerPressed = {this.handleEditAnswerPressed} onDeleteAnswerPressed = {this.handleDeleteAnswerPressed} comments={[]} key={answers[n].aid} user={this.props.user} aid = {answers[n].aid} upvotes = {answers[n].upvotes} downvotes = {answers[n].downvotes} isLoggedIn={false} text={answers[n].text} ansBy = {answers[n].ans_by} ansOn = {answers[n].ansOn} ansAt = {answers[n].ansAt} userAnswerPage= {true}/>)
            answerRows.push(
              <tr key ={answers[n].aid + "d"}> 
                <td><hr></hr></td>
                <td><hr></hr></td>
                <td><hr></hr></td>
              </tr>);
          
        }

        answerRows.push(
          <tr key ="btn">
            <td>{prevButton}</td>
            <td><hr></hr></td>
            <td>{nextButton}</td>

          </tr>)

        return(
            <div>
            <div className="sidenav">
                <a href="#" id="UserAnswerLink" onClick={this.handleUserAnswerPressed}>Answers</a>
                <a href="#" id="UserTagLink" onClick={this.handleUserTagPressed}>Tags</a>
            </div>
            <div className="main">
                <h2>Been a member since: {this.props.user.register_date_time}</h2>
                <h2>User Reputation: {this.props.user.reputation}</h2>
                <table id="table">
                    <thead>
                    <tr className="headerRow">
                    <th className="col1">{numOfAnswers} Answers</th>  
                    <th className="col2"> All Answers </th>
                    <th className="col3"> {askButton}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {answerRows}

                    </tbody>
                </table>

            </div>
            </div>
        )
    }

}