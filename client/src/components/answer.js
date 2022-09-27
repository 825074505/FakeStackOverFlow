import React from "react";

import CommentPage from "./commentPage";



export default class Answer extends React.Component{


    constructor(props){
        super(props)

        this.state = {

        };

        this.handleUpvoteAnswerPressed = this.handleUpvoteAnswerPressed.bind(this);
        this.handleDownvoteAnswerPressed = this.handleDownvoteAnswerPressed.bind(this);
        this.handlePostComment = this.handlePostComment.bind(this);
        this.handleEditAnswerPressed = this.handleEditAnswerPressed.bind(this);
        this.handleDeleteAnswerPressed = this.handleDeleteAnswerPressed.bind(this);

    }

    handleEditAnswerPressed(){
        this.props.onEditAnswerPressed(this.props.aid, this.props.text);
    }

    handleDeleteAnswerPressed(){
        this.props.onDeleteAnswerPressed(this.props.aid);
    }

    handlePostComment(e, text, username, uid, aid){
        this.props.onPostComment(e, text, username, uid, aid);
    }

    handleUpvoteAnswerPressed(){
        if(this.props.user.reputation < 100){
            alert("Only users with reputation greater than 100 can vote")
            return;
          }
        this.props.onUpvoteAnswerPressed(this.props.aid);
    }

    handleDownvoteAnswerPressed(){
        if(this.props.user.reputation < 100){
            alert("Only users with reputation greater than 100 can vote")
            return;
          }
        this.props.onDownvoteAnswerPressed(this.props.aid);
    }


    render(){

        const aComments = <CommentPage id ={this.props.aid} isLoggedIn ={this.props.isLoggedIn} comments = {this.props.comments} user = {this.props.user} onPostComment ={this.handlePostComment}/>

        const upvoteButton = this.props.isLoggedIn ? <button id ="upvoteButton" onClick={this.handleUpvoteAnswerPressed}>Upvote</button> : null;
        const downvoteButton = this.props.isLoggedIn ? <button id ="downvoteButton" onClick={this.handleDownvoteAnswerPressed}>Downvote</button> : null;
        const editButton = this.props.userAnswerPage ? <button onClick={this.handleEditAnswerPressed}>Edit</button> : null;
        const deleteButton = this.props.userAnswerPage ? <button onClick={this.handleDeleteAnswerPressed}>Delete</button> : null;

        const votes = this.props.upvotes - this.props.downvotes;
        return(
    <tr>
        <td>{upvoteButton} <br></br> {votes} Votes <br></br> {downvoteButton}</td>
        <td>{this.props.text}<br></br>{aComments}<br></br>{editButton}{deleteButton}</td>
        
        <td className = "col3">Ans By {this.props.ansBy}<br></br>On {this.props.ansOn}<br></br>At {this.props.ansAt}</td>
    </tr>
        )
    }

}