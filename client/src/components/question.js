import React from "react";
import Tag from "./tag.js";

import './question.css';

export default class Question extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleQuestionLinkPressed = this.handleQuestionLinkPressed.bind(this);
        this.handleEditQuestionPressed = this.handleEditQuestionPressed.bind(this);
        this.handleDeleteQuestionPressed = this.handleDeleteQuestionPressed.bind(this);


        
      };


    handleQuestionLinkPressed(e,qid){

        this.props.onQuestionLinkPressed(qid);
    }

    handleEditQuestionPressed(){

        this.props.onEditQuestionPressed(this.props.qid, this.props.title, this.props.summary, this.props.text)
  
      }
  
      handleDeleteQuestionPressed(){
        this.props.onDeleteQuestionPressed(this.props.qid);
    }



    render(){
        

        const tagRow = [];

        const tags = this.props.tags;       

        var count = 0;


        const editButton = this.props.userQuestionPage ? <button onClick={this.handleEditQuestionPressed}>Edit</button> : null;
        const deleteButton = this.props.userQuestionPage ? <button onClick={this.handleDeleteQuestionPressed}>Delete</button> : null;


        tags.forEach((tag) => {

            
            tagRow.push(<Tag name={tag.name} key={tag.tid}/>);
            count += 1;
            if(count == 4){
                tagRow.push(<br key = {tag.tid + "b"}></br>);
                count = 0;
            }
        })

        

        return(
    <tr>
        <td className = "col1">{this.props.views} Views<br></br>{this.props.answers} Answers<br></br>{this.props.upvotes - this.props.downvotes} Votes</td>
        <td className = "col2"> <a href="#" id = {this.props.qid} className = "questionLink" onClick={(e) => {this.handleQuestionLinkPressed(e,this.props.qid)}}>{this.props.title}</a>
            <br></br><p>{this.props.summary}<br></br></p>{tagRow}<br></br>{editButton}{deleteButton}                  
        </td>
        <td className = "col3">Asked By {this.props.askedBy}<br></br>On {this.props.askedOn}<br></br>At {this.props.askedAt}</td>
    </tr>

        );
    }
}