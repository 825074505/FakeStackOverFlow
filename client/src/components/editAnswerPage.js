import React from "react";

import "./editAnswerPage.css";


export default class EditAnswerPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }

        this.handleSaveAnswerPressed = this.handleSaveAnswerPressed.bind(this);
    }


    handleSaveAnswerPressed(){

        let aid = this.props.id;
        let text = document.getElementById("new_Answer_Text").value;

       

        var errMsgs = document.getElementsByClassName("errMsg")
        for(let i = 0; i< errMsgs.length; i++){
            if(errMsgs[i].style.display != "none"){
            errMsgs[i].style.display = "none";
            }
        }

        if(text.length == 0){
            document.getElementById("errEditAnsMsg1").style.display = "flex";
            return
        }

        this.props.onSaveAnswerPressed(aid, text);

        
    }


    render(){

        return(
            <form>
    
            <p id = "errEditAnsMsg1" className = "errMsg">Answer Text cannot be empty! </p>

            <h2>Answer Text</h2>
            <p className = "hint msg">Add details</p><br></br>
            <input defaultValue={this.props.newText} type="text" id="new_Answer_Text" name="Answer Text"></input><br></br>
            
            <button id ="saveButton" type="button" onClick={this.handleSaveAnswerPressed}>Save Changes</button>
    
            </form>)
    }
}