import React from "react";
import TagRow from "./tagRow.js"

export default class TagPage extends React.Component{


    constructor(props){
        super(props)

        this.handleAskButtonPressed = this.handleAskButtonPressed.bind(this);
        this.handleTagLinkPressed = this.handleTagLinkPressed.bind(this);
        this.handleEditTagPressed = this.handleEditTagPressed.bind(this);
        this.handleDeleteTagPressed = this.handleDeleteTagPressed.bind(this);
    }

    handleAskButtonPressed(){
        this.props.onAskButtonPressed();
    }

    handleTagLinkPressed(name){
        this.props.onTagLinkPressed(name);
    }

    handleDeleteTagPressed(tid){
        this.props.onDeleteTagPressed(tid)
    }

    handleEditTagPressed(tid,name){
        this.props.onEditTagPressed(tid, name)
    }


    render(){


       
        const numOfTags = this.props.data.length;


        const tags = this.props.data;

        const askButton = this.props.isLoggedIn ? <button id= "askButton" onClick={this.handleAskButtonPressed}> Ask A Question </button> : null;

        

        const rows = [];

        
        if(tags.length % 3 ==0){
            
            for(let i = 0 ; i< tags.length; i+=3){
                
                rows.push(<TagRow key={i} col1={tags[i]} col2={tags[i+1]} col3 = {tags[i+2]} onTagLinkPressed={this.handleTagLinkPressed} 
                    userTagPage ={this.props.userTagPage} 
                    onEditTagPressed = {this.handleEditTagPressed}
                    onDeleteTagPressed = {this.handleDeleteTagPressed}/>)
            }
        }
        else if(tags.length % 3 == 1){
            
            for(let i = 0 ; i< tags.length-3; i+=3){
                
                rows.push(<TagRow key={i} col1={tags[i]} col2={tags[i+1]} col3 = {tags[i+2]} onTagLinkPressed={this.handleTagLinkPressed} 
                    userTagPage ={this.props.userTagPage} 
                    onEditTagPressed = {this.handleEditTagPressed}
                    onDeleteTagPressed = {this.handleDeleteTagPressed}/>)
            }
            rows.push(<TagRow key ={tags.length-1} col1={tags[tags.length-1]} col2={-1} cold3={-1} onTagLinkPressed = {this.handleTagLinkPressed}
                userTagPage ={this.props.userTagPage} 
                onEditTagPressed = {this.handleEditTagPressed}
                onDeleteTagPressed = {this.handleDeleteTagPressed}/>)

        }
        else if(tags.length % 3 == 2){
            
            for(let i = 0 ; i< tags.length-3; i+=3){
                
                rows.push(<TagRow key={i} col1={tags[i]} col2={tags[i+1]} col3 = {tags[i+2]} onTagLinkPressed={this.handleTagLinkPressed}
                    userTagPage ={this.props.userTagPage} 
                    onEditTagPressed = {this.handleEditTagPressed}
                    onDeleteTagPressed = {this.handleDeleteTagPressed}/>)
            }
            rows.push(<TagRow key ={tags.length-2} col1={tags[tags.length-2]} col2={tags[tags.length-1]} col3={-1} onTagLinkPressed = {this.handleTagLinkPressed}
                userTagPage ={this.props.userTagPage} 
                onEditTagPressed = {this.handleEditTagPressed}
                onDeleteTagPressed = {this.handleDeleteTagPressed}/>)

        }
        
        



        return( 
            <table id = "table">
            <thead>
              <tr id="headerRow">
                <th >{numOfTags} Tags</th>  
                <th >All Tags</th>
                <th > {askButton}</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>)
    }
}