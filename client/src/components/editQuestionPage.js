import React from "react";

import "./editQuestionPage.css";


export default class EditQuestionPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }

        this.handleSaveQuestionPressed = this.handleSaveQuestionPressed.bind(this);
    }


    handleSaveQuestionPressed(){

        let qid = this.props.id;
        let title = document.getElementById("new_Question_Title").value;
        let text = document.getElementById("new_Question_Text").value;
        let summary = document.getElementById("new_Question_Summary").value;

        let validated = true;

        var errMsgs = document.getElementsByClassName("errMsg")
        for(let i = 0; i< errMsgs.length; i++){
            if(errMsgs[i].style.display != "none"){
            errMsgs[i].style.display = "none";
            }
        }

        if(title.length == 0){
            document.getElementById("errEditMsg1").style.display = "flex";
            validated = false;
        }

        if(title.length > 50){
            document.getElementById("errEditMsg2").style.display = "flex";
            validated = false;
        }
        if(summary.length > 140){
            document.getElementById("errEditMsg3").style.display = "flex";
            validated = false;
        }
        if(text.length == 0){
            document.getElementById("errEditMsg4").style.display = "flex";
            validated = false;
        }
        if(validated){

            this.props.onSaveQuestionPressed(qid, title, text, summary)
        }
    }


    render(){

        return(
            <form>
    
            <p id = "errEditMsg1" className = "errMsg">Question title cannot be empty! </p>
            <p id = "errEditMsg2" className = "errMsg">Question title cannot be more than 50 characters!</p>
            <p id = "errEditMsg3" className = "errMsg">Question text cannot be empty! </p>
            <p id = "errEditMsg4" className='errMsg'>Question summary cannot be more than 140 characters!</p>
            <h2 >Question Title</h2>
            <p className = "hint msg">Title should not be more than 50 characters</p><br></br>
            <input defaultValue={this.props.newTitle} type="text" id="new_Question_Title" name="Question Title"></input><br></br>
            <h2>Question Summary</h2>
            <p className='hint msg'>Summary should not be more than 140 characters</p>
            <input defaultValue={this.props.newSummary} type="text" id='new_Question_Summary' name='Question Summary'></input>
            <h2>Question Text</h2>
            <p className = "hint msg">Add details</p><br></br>
            <input defaultValue={this.props.newText} type="text" id="new_Question_Text" name="Question Text"></input><br></br>
            
            <button id ="saveButton" type="button" onClick={this.handleSaveQuestionPressed}>Save Changes</button>
    
            </form>)
    }
}