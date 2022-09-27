import React from "react";
import "./commentPage.css";
import Comment from "./comment.js";

export default class CommentPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {

        }
        this.handlePostComment = this.handlePostComment.bind(this);
        this.sortComments = this.sortComments.bind(this);
    }

    sortComments(a,b){
        var months = ['Dec','Nov','Oct','Sep','Aug','Jul','Jun','May','Apr','Mar','Feb','Jan']
      
        if(a.cmtOn.substring(8) != b.cmtOn.substring(8)){
      
          return parseInt(b.cmtOn.substring(8)) - parseInt(a.cmtOn.substring(8))
        }
        else if(a.cmtOn.substring(0,3) != b.cmtOn.substring(0,3)){
      
          return months.indexOf(a.cmtOn.substring(0,3)) - months.indexOf(b.cmtOn.substring(0,3))
        }
        else if(a.cmtOn.substring(4,6) != b.cmtOn.substring(4,6)){
          return parseInt(b.cmtOn.substring(4,6)) - parseInt(a.cmtOn.substring(4,6))
      
        }
        else if(a.cmtAt.substring(0,2) != b.cmtAt.substring(0,2)){
          return parseInt(b.cmtAt.substring(0,2)) - parseInt(a.cmtAt.substring(0,2))
      
        }
      
        else if(a.cmtAt.substring(3) != b.cmtAt.substring(3)){
      
          return parseInt(b.cmtAt.substring(3)) - parseInt(a.cmtAt.substring(3))
      
        }
      
        else{
      
          return 0
        }
      
      }

    handlePostComment(e){
        let text = document.getElementById(this.props.id.toString()).value;
        let username = this.props.user.username;
        let uid = this.props.user.uid;
        let id = this.props.id;
        this.props.onPostComment(e, text, username, uid, id );  

    }


    render(){

        let comments = this.props.comments;

        for(let i = 0; i < comments.length; i++){

            let date = new Date(comments[i].comment_date_time)
            let e = date.toString().split(" ");
            
            let time = e.slice(1,4)
            let f = e[4].substring(0,5)
            time.push(f)
  
            var cmtOn = time[0] + ' ' + time[1] +','+' ' + time[2];
  
            var cmtAt = time[3];
  
            comments[i].cmtOn = cmtOn
            comments[i].cmtAt = cmtAt
          }

        comments = comments.sort(this.sortComments);

        const commentRow = [];

        let inputId = this.props.id.toString();


        const commentBox = this.props.isLoggedIn ? <input type="text" name="commentInput" id={inputId} placeholder="Comment Here..." onKeyUp={this.handlePostComment}></input> : null;

        comments.forEach((comment) => {
            commentRow.push(
                <Comment text ={comment.text} comment_by = {comment.comment_by}/>
            )

            commentRow.push(
                <tr key ={comment.cid + "d"}> 
                  <td><hr></hr></td>
                  <td><hr></hr></td>
                </tr>);
        })



        return ( 
        <table id = "commentTable">
        <tbody>{commentRow}
        <tr>
            
        <td id = "commentBox" colSpan={2}>{commentBox}</td> 
                
        </tr>
        </tbody>
      </table>)
        
    }
}
