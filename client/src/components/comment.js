import React from "react";
import './comment.css';


export default class Comment extends React.Component{


    constructor(props){
        super(props)

        this.state = {

        }
        
    }

    render(){

        return(
        <tr>
        <td className="coomentCol1">
            Comment : {this.props.text} 
        </td>
        <td className="commentCol2"> 
            Commented By {this.props.comment_by}                   
        </td>
        </tr>
        )
    }
}