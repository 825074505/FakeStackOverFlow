import React from "react"
import "./tagRow.css";

export default class TagRow extends React.Component{

    constructor(props){
        super(props)

        this.handleTagLinkPressed = this.handleTagLinkPressed.bind(this);
        this.handleEditTagPressed = this.handleEditTagPressed.bind(this);
        this.handleDeleteTagPressed = this.handleDeleteTagPressed.bind(this);
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

        const col1 = this.props.col1;
        const col2 = this.props.col2;
        const col3 = this.props.col3;

        

        if(col2 == -1){

            return(
                <tr>
                    <td className = "tagBlock">
                        <a href="#"  className = "tagLink" onClick={() => {this.handleTagLinkPressed(col1.name)}}>{col1.name}<br></br>{col1.qs.length} Questions</a>
                        <div className="tagButtons">{this.props.userTagPage ? <button onClick={() => {this.handleEditTagPressed(col1.tid, col1.name)}}>Edit</button> :null }
                        {this.props.userTagPage ? <button onClick={() => {this.handleDeleteTagPressed(col1.tid)}}>Delete</button> :null } </div>
                    </td>
                </tr>
            )
        }
        if(col3 == -1){
            return(
                <tr>
                    <td className = "tagBlock">
                        <a href="#"  className = "tagLink" onClick={() => {this.handleTagLinkPressed(col1.name)}}>{col1.name}<br></br>{col1.qs.length} Questions</a>
                        <div className="tagButtons">{this.props.userTagPage ? <button onClick={() => {this.handleEditTagPressed(col1.tid, col1.name)}}>Edit</button> :null }
                        {this.props.userTagPage ? <button onClick={() => {this.handleDeleteTagPressed(col1.tid)}}>Delete</button> :null } </div> 
                    </td>
                    <td className = "tagBlock"> 
                        <a href="#"  className = "tagLink" onClick={() => {this.handleTagLinkPressed(col2.name)}}>{col2.name}<br></br>{col2.qs.length} Questions</a>
                        <div className="tagButtons">{this.props.userTagPage ? <button onClick={() => {this.handleEditTagPressed(col2.tid, col2.name)}}>Edit</button> :null }
                        {this.props.userTagPage ? <button onClick={() => {this.handleDeleteTagPressed(col2.tid)}}>Delete</button> :null } </div>                  
                    </td>
                </tr>
            )
        }

        return(
        <tr>
            <td className = "tagBlock">
                <a href="#"  className = "tagLink" onClick={() => {this.handleTagLinkPressed(col1.name)}}>{col1.name}<br></br>{col1.qs.length} Questions</a> 
                <div className="tagButtons">{this.props.userTagPage ? <button onClick={() => {this.handleEditTagPressed(col1.tid, col1.name)}}>Edit</button> :null }
                {this.props.userTagPage ? <button onClick={() => {this.handleDeleteTagPressed(col1.tid)}}>Delete</button> :null } </div>
            </td>
            <td className = "tagBlock"> 
                <a href="#"  className = "tagLink" onClick={() => {this.handleTagLinkPressed(col2.name)}}>{col2.name}<br></br>{col2.qs.length} Questions</a>
                <div className="tagButtons">{this.props.userTagPage ? <button onClick={() => {this.handleEditTagPressed(col2.tid, col2.name)}}>Edit</button> :null }
                {this.props.userTagPage ? <button onClick={() => {this.handleDeleteTagPressed(col2.tid)}}>Delete</button> :null } </div>
          
                             
                                
            </td>
            <td className = "tagBlock">
                <a href="#"  className = "tagLink" onClick={() => {this.handleTagLinkPressed(col3.name)}}>{col3.name}<br></br>{col3.qs.length} Questions</a>
                <div className="tagButtons">{this.props.userTagPage ? <button onClick={() => {this.handleEditTagPressed(col3.tid, col3.name)}}>Edit</button> :null }
                {this.props.userTagPage ? <button onClick={() => {this.handleDeleteTagPressed(col3.tid)}}>Delete</button> :null } </div>
            </td>
        </tr>
        )
    }
}