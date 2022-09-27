import React from 'react';
import "./askForm.css";



export default class AskForm extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handlePostQuestionPressed = this.handlePostQuestionPressed.bind(this);


        
      };



    
    handlePostQuestionPressed(){
        
        var title = document.getElementById("Question_Title").value;
        var text = document.getElementById("Question_Text").value;
        var tags = document.getElementById("Formtags").value;
        var summary = document.getElementById('Question_Summary').value;
        var username = this.props.user.username;
        var uid = this.props.user.uid;
        var reputation = this.props.user.reputation;


        var errMsgs = document.getElementsByClassName("errMsg")
        for(let i = 0; i< errMsgs.length; i++){
            if(errMsgs[i].style.display != "none"){
            errMsgs[i].style.display = "none";
            }
        }

        var validated = true;

        if(title.length == 0){
            document.getElementById("errMsg1").style.display = "flex";
            validated = false;
        }

        if(title.length > 50){
            document.getElementById("errMsg2").style.display = "flex";
            validated = false;
        }
        if(summary.length > 140){
            document.getElementById("errMsg6").style.display = "flex";
            validated = false;
        }
        if(text.length == 0){
            document.getElementById("errMsg3").style.display = "flex";
            validated = false;
        }
        if(tags.length == 0){
            document.getElementById("errMsg4").style.display = "flex";
            validated = false;

        }

        if(validated){
            this.props.onPostQuestionPressed(uid,username,title,summary,text,tags, reputation);

        }
        
    }




    render(){


        return(
        <form>

        <p id = "errMsg1" className = "errMsg">Question title cannot be empty! </p>
        <p id = "errMsg2" className = "errMsg">Question title cannot be more than 50 characters!</p>
        <p id = "errMsg3" className = "errMsg">Question text cannot be empty! </p>
        <p id = "errMsg4" className = "errMsg">Tags cannot be empty!</p>
        <p id = "errMsg5" className='errMsg'>New Tags can only be created by user with 100 reputation or higher</p>
        <p id = "errMsg6" className='errMsg'>Question summary cannot be more than 140 characters!</p>
        <h2 >Question Title</h2>
        <p className = "hint msg">Title should not be more than 50 characters</p><br></br>
        <input type="text" id="Question_Title" name="Question Title"></input><br></br>
        <h2>Question Summary</h2>
        <p className='hint msg'>Summary should not be more than 140 characters</p>
        <input type="text" id='Question_Summary' name='Question Summary'></input>
        <h2>Question Text</h2>
        <p className = "hint msg">Add details</p><br></br>
        <input type="text" id="Question_Text" name="Question Text"></input><br></br>
        <h2>Tags</h2>
        <p className = "hint msg">Add keyword separated by whitespace.</p><br></br>
        <input type="text" id="Formtags" name="Tags"></input><br></br> 
        
        <button id ="postButton" type="button" onClick={this.handlePostQuestionPressed}>Post Question</button>

        </form>)

    }
}