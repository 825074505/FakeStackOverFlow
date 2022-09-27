import React from "react";
import "./ansForm.css"


export default class AnsForm extends React.Component{

    constructor(props){

        super(props)

        this.handlePostAnswerPressed = this.handlePostAnswerPressed.bind(this);
    }

    handlePostAnswerPressed(qid){

        
        var text = document.getElementById("Answer_Text").value;
        
        var username = this.props.user.username;

        var uid = this.props.user.uid;

        var validated = true;

        var errMsgs = document.getElementsByClassName("errMsg")
        for(let i = 0; i< errMsgs.length; i++){
            if(errMsgs[i].style.display != "none"){
            errMsgs[i].style.display = "none";
            }
        }


        if(text.length == 0){
            document.getElementById("errMsg1").style.display = "initial";
            validated = false;
        }

        if(validated){
            this.props.onPostAnswerPressed(qid,text, username, uid);
        }

    }


    render(){

        return(
            <form>
    
            <p id = "errMsg1" className = "errMsg">Answer text cannot be empty! </p>
            <h2>Answer Text</h2>
            <input type="text" id="Answer_Text" name="Answer_Text"></input><br></br>
            <button id ="postButton" type="button" onClick={() =>{this.handlePostAnswerPressed(this.props.qid)}}>Post Answer</button>
    
            </form>)
    }

}