import React from "react";
import QuestionPage from "./questionPage.js"
import "./userQuestionPage.css"

export default class UserQuestionPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {

        }
        this.handleUserAnswerPressed = this.handleUserAnswerPressed.bind(this);
        this.handleUserTagPressed = this.handleUserTagPressed.bind(this);
        this.handleAskButtonPressed = this.handleAskButtonPressed.bind(this);
        this.handleUserNextButtonPressed = this.handleUserNextButtonPressed.bind(this);
        this.handleUserPrevButtonPressed = this.handleUserPrevButtonPressed.bind(this);
        this.handleQuestionLinkPressed = this.handleQuestionLinkPressed.bind(this);
        this.handleEditQuestionPressed = this.handleEditQuestionPressed.bind(this);
        this.handleDeleteQuestionPressed = this.handleDeleteQuestionPressed.bind(this);
    }


    handleUserAnswerPressed(){
        this.props.onUserAnswerPressed(this.props.user.uid)


    }

    handleUserTagPressed(){
        this.props.onUserTagPressed(this.props.user.uid)
    }

    handleAskButtonPressed(){
        this.props.onAskButtonPressed()
    }

    handleUserNextButtonPressed(){
        this.props.onUserNextPressed(this.props.pageNum)
    }

    handleUserPrevButtonPressed(){
        this.props.onUserPrevPressed(this.props.pageNum)
    }
    handleQuestionLinkPressed(qid){
        this.props.onQuestionLinkPressed(qid)
    }

    handleEditQuestionPressed(qid, title, summary, text){
        this.props.onEditQuestionPressed(qid, title,summary, text)
    }

    handleDeleteQuestionPressed(qid){
        this.props.onDeleteQuestionPressed(qid)
    }



    render(){

        const filterEnable = false;
        const filterText = "";
        const isLoggedIn = true;
        const userQuestionPage = true;

        const questionPage = <QuestionPage 
        data={this.props.questions} 
        filterText = {filterText}
        filterEnable = {filterEnable}
        onAskButtonPressed = {this.handleAskButtonPressed} 
        onQuestionLinkPressed = {this.handleQuestionLinkPressed}
        isLoggedIn = {isLoggedIn}
        pageNum = {this.props.pageNum}
        onPrevPressed = {this.handleUserPrevButtonPressed}
        onNextPressed = {this.handleUserNextButtonPressed}
        userQuestionPage = {userQuestionPage}
        onEditQuestionPressed ={this.handleEditQuestionPressed}
        onDeleteQuestionPressed = {this.handleDeleteQuestionPressed}/>




        return(
            <div>
            <div className="sidenav">
                <a href="#" id="UserAnswerLink" onClick={this.handleUserAnswerPressed}>Answers</a>
                <a href="#" id="UserTagLink" onClick={this.handleUserTagPressed}>Tags</a>
            </div>
            <div className="main">
                <h2>Been a member since: {this.props.user.register_date_time}</h2>
                <h2>User Reputation: {this.props.user.reputation}</h2>
                {questionPage}

            </div>
            </div>
        )
    }



    
}