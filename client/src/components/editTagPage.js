import React from "react";

import "./editTagPage.css";


export default class EditTagPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }

        this.handleSaveTagPressed = this.handleSaveTagPressed.bind(this);
    }


    handleSaveTagPressed(){

        let tid = this.props.id;
        let name = document.getElementById("new_Tag_Name").value.toLowerCase();
        let allTags = this.props.tags;
        
       

        var errMsgs = document.getElementsByClassName("errMsg")
        for(let i = 0; i< errMsgs.length; i++){
            if(errMsgs[i].style.display != "none"){
            errMsgs[i].style.display = "none";
            }
        }

        if(name.length == 0){
            document.getElementById("errEditTagMsg1").style.display = "flex";
            return
        }
        if(name.includes(" ")){
            document.getElementById("errEditTagMsg2").style.display = "flex";
            return
        }

        for(let i = 0; i < allTags.length; i++){
            if(allTags[i].name === name){
                document.getElementById("errEditTagMsg3").style.display = "flex";
                return
            }
        }
        
        

        this.props.onSaveTagPressed(tid, name);

        
    }


    render(){

        return(
            <form>
    
            <p id = "errEditTagMsg1" className = "errMsg">Tag Name cannot be empty! </p>
            <p id = "errEditTagMsg2" className = "errMsg">Tag Name cannot have space in between! </p>
            <p id = "errEditTagMsg3" className = "errMsg">Tag Name already exist! </p>

            <h2>Tag Name</h2>
            <p className = "hint msg">Change Name</p><br></br>
            <input defaultValue={this.props.newName} type="text" id="new_Tag_Name" name="Tag Name"></input><br></br>
            
            <button id ="saveButton" type="button" onClick={this.handleSaveTagPressed}>Save Changes</button>
    
            </form>)
    }
}