import React from "react";

import "./userTagPage.css"

import TagPage from "./tagPage.js"


export default class UserTagPage extends React.Component{


    constructor(props){
        super(props)

        this.state = {


        }
        this.handleUserAnswerPressed = this.handleUserAnswerPressed.bind(this);
        this.handleUserTagPressed = this.handleUserTagPressed.bind(this);
        
        
        this.handleEditTagPressed = this.handleEditTagPressed.bind(this);
        this.handleDeleteTagPressed = this.handleDeleteTagPressed.bind(this);

        this.handleTagLinkPressed = this.handleTagLinkPressed.bind(this);
        this.handleAskButtonPressed = this.handleAskButtonPressed.bind(this);
    }

    handleAskButtonPressed(){
        this.props.onAskButtonPressed()
    }


    handleUserAnswerPressed(){

        this.props.onUserAnswerPressed(this.props.user.uid)
    }

    handleUserTagPressed(){
        this.props.onUserTagPressed(this.props.user.uid)
    }

    handleDeleteTagPressed(tid){
        this.props.onDeleteTagPressed(tid)

    }

    handleEditTagPressed(tid, name){
        this.props.onEditTagPressed(tid, name)

    }

    handleTagLinkPressed(name){
        this.props.onTagLinkPressed(name);
    }



    render(){


        const tagPage = <TagPage
        data = {this.props.tags}
        onTagLinkPressed = {this.handleTagLinkPressed}
        onAskButtonPressed = {this.handleAskButtonPressed}
        isLoggedIn = {true}
        userTagPage = {true}
        onEditTagPressed = {this.handleEditTagPressed}
        onDeleteTagPressed = {this.handleDeleteTagPressed}
        />

        return(
            <div>
            <div className="sidenav">
                <a href="#" id="UserAnswerLink" onClick={this.handleUserAnswerPressed}>Answers</a>
                <a href="#" id="UserTagLink" onClick={this.handleUserTagPressed}>Tags</a>
            </div>
            <div className="main">
                <h2>Been a member since: {this.props.user.register_date_time}</h2>
                <h2>User Reputation: {this.props.user.reputation}</h2>
                {tagPage}

            </div>
            </div>
        )
    }



}