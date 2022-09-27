import React from 'react';
import "./questionPage.css"
import Question from './question.js'

export default class QuestionPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleAskButtonPressed = this.handleAskButtonPressed.bind(this);
        this.handleQuestionLinkPressed = this.handleQuestionLinkPressed.bind(this);
        this.sortQuestions = this.sortQuestions.bind(this);
        this.handlePrevButtonPressed = this.handlePrevButtonPressed.bind(this);
        this.handleNextButtonPressed = this.handleNextButtonPressed.bind(this);
        this.handleEditQuestionPressed = this.handleEditQuestionPressed.bind(this);
        this.handleDeleteQuestionPressed = this.handleDeleteQuestionPressed.bind(this);


        
      };

    
    handleEditQuestionPressed(qid, title, summary, text){

      this.props.onEditQuestionPressed(qid, title, summary, text)

    }

    handleDeleteQuestionPressed(qid){
      this.props.onDeleteQuestionPressed(qid);
    }

 

    handleAskButtonPressed(){
        this.props.onAskButtonPressed();
    }


    handleQuestionLinkPressed(qid){
      this.props.onQuestionLinkPressed(qid);
    }

    handlePrevButtonPressed(){
      this.props.onPrevPressed(this.props.pageNum);
    }

    handleNextButtonPressed(){
      this.props.onNextPressed(this.props.pageNum);
    }


    checkWord(arr, title, text){
      for(let i = 0; i< arr.length; i++){
        if(title.toLowerCase().includes(arr[i].toLowerCase()) || text.toLowerCase().includes(arr[i].toLowerCase())){
          return true;
        }
      }
      return false;
    }

    checkTag(filterTag, QTags){
      for(let i =0; i<QTags.length; i++){
        if(filterTag.includes(QTags[i].name.toLowerCase())){
          return true;
        }
      }
      return false;
    }


    sortQuestions(a, b){

      

      let date = new Date(a.ask_date_time)
      let e = date.toString().split(" ");
        
      let time = e.slice(1,4)
      let f = e[4].substring(0,5)
      time.push(f)

      var askedOn = time[0] + ' ' + time[1] +','+' ' + time[2];

      var askedAt = time[3];

      a.askedOn = askedOn
      a.askedAt = askedAt

      let date1 = new Date(b.ask_date_time)
      let e1 = date1.toString().split(" ");
        
      let time1 = e1.slice(1,4)
      let f1 = e1[4].substring(0,5)
      time1.push(f1)

      var askedOn = time1[0] + ' ' + time1[1] +','+' ' + time1[2];

      var askedAt = time1[3];

      b.askedOn = askedOn
      b.askedAt = askedAt


      var months = ['Dec','Nov','Oct','Sep','Aug','Jul','Jun','May','Apr','Mar','Feb','Jan']
    
      if(a.askedOn.substring(8) != b.askedOn.substring(8)){
    
        return parseInt(b.askedOn.substring(8)) - parseInt(a.askedOn.substring(8))
      }
      else if(a.askedOn.substring(0,3) != b.askedOn.substring(0,3)){
    
        return months.indexOf(a.askedOn.substring(0,3)) - months.indexOf(b.askedOn.substring(0,3))
      }
      else if(a.askedOn.substring(4,6) != b.askedOn.substring(4,6)){
        return parseInt(b.askedOn.substring(4,6)) - parseInt(a.askedOn.substring(4,6))
    
      }
      else if(a.askedAt.substring(0,2) != b.askedAt.substring(0,2)){
        return parseInt(b.askedAt.substring(0,2)) - parseInt(a.askedAt.substring(0,2))
    
      }
    
      else if(a.askedAt.substring(3) != b.askedAt.substring(3)){
    
        return parseInt(b.askedAt.substring(3)) - parseInt(a.askedAt.substring(3))
    
      }
    
      else{
    
        return 0
      }
     
    }

    render(){
        
        const questions = this.props.data.sort(this.sortQuestions);
        const filteredQuestions = [];


        
   
        let numOfQuestions = questions.length;
    
        const rows = [];

        const filterArr = this.props.filterText.split(" ");
        const filterTagArr = [];

        let idx1 = 0;
        let idx2 = 0;
        for(let i = 0; i< this.props.filterText.length; i++){

        if(this.props.filterText[i] =='['){
          idx1 = i;
        }
        if(this.props.filterText[i] == ']'){
          idx2 = i;
          var tagWord = this.props.filterText.slice(idx1+1, idx2);
          filterTagArr.push(tagWord.toLowerCase());
          
          }
        }

        
  
        
        if(!this.props.filterEnable || this.props.filterText === ""){

          let startIdx = (this.props.pageNum - 1) * 5;
          let endIdx = startIdx + 5;

          for(let i = startIdx; i < endIdx && i < questions.length; i++){

            
                      
            rows.push(

              <Question
               qid = {questions[i].qid}
               title = {questions[i].title}
               summary = {questions[i].summary}
               text = {questions[i].text}
               answers = {questions[i].answers.length}
               views = {questions[i].views}
               askedOn = {questions[i].askedOn}
               askedAt = {questions[i].askedAt}
               askedBy = {questions[i].asked_by}
               onQuestionLinkPressed = {this.handleQuestionLinkPressed}
               tags = {questions[i].tags}
               key = {questions[i].qid}
               isLoggedIn = {this.props.isLoggedIn}
               upvotes = {questions[i].upvotes}
               downvotes ={questions[i].downvotes}
               userQuestionPage={this.props.userQuestionPage}
               onEditQuestionPressed = {this.handleEditQuestionPressed}
               onDeleteQuestionPressed = {this.handleDeleteQuestionPressed}/>   
               
            );

            rows.push(
              <tr key ={questions[i].qid + "d"}> 
                <td><hr></hr></td>
                <td><hr></hr></td>
                <td><hr></hr></td>
              </tr>);
          }
  
        }
        else{
          questions.forEach((question) => {

            var title = question.title;
            var text = question.text;
            var QTags = question.tags;
            
            if(this.checkWord(filterArr, title, text) || this.checkTag(filterTagArr,QTags)){
              filteredQuestions.push(question);

            }
            
          })

          numOfQuestions = filteredQuestions.length;
          let startIdx = (this.props.pageNum -1) * 5;
          let endIdx = startIdx + 5;

          for(let i = startIdx; i < endIdx && i < filteredQuestions.length; i++){
            rows.push(
              <Question
               qid = {filteredQuestions[i].qid}
               title = {filteredQuestions[i].title}
               summary = {filteredQuestions[i].summary}
               text = {filteredQuestions[i].text}
               answers = {filteredQuestions[i].answers.length}
               views = {filteredQuestions[i].views}
               askedOn = {filteredQuestions[i].askedOn}
               askedAt = {filteredQuestions[i].askedAt}
               askedBy = {filteredQuestions[i].asked_by}
               onQuestionLinkPressed = {this.handleQuestionLinkPressed}
               tags = {filteredQuestions[i].tags}
               key = {filteredQuestions[i].qid}
               isLoggedIn = {this.props.isLoggedIn}
               upvotes = {filteredQuestions[i].upvotes}
               downvotes = {filteredQuestions[i].downvotes}
               userQuestionPage={this.props.userQuestionPage}
               onEditQuestionPressed = {this.handleEditQuestionPressed}
               onDeleteQuestionPressed = {this.handleDeleteQuestionPressed}/>   
               
            );
            

            rows.push(
              <tr key ={filteredQuestions[i].qid + "d"}> 
                <td><hr></hr></td>
                <td><hr></hr></td>
                <td><hr></hr></td>
              </tr>);
          }

        }


        

        
        if(rows.length === 0){
          rows.push(
        <tr key ={1}> 
          <td><h3>No Questions Found</h3></td>
          
        </tr>)
        }

        let askButton = this.props.isLoggedIn ? <button id= "askButton" onClick={this.handleAskButtonPressed}> Ask A Question </button> : <h3>Log In to Ask Question</h3>;
        let prevButton = (this.props.pageNum == 1) ? <p>Already First Page</p> : <button id = "prevButton" onClick={this.handlePrevButtonPressed}>Prev</button>;
        let nextButton = (this.props.pageNum == Math.ceil(numOfQuestions/5) || numOfQuestions == 0) ? <p>Already Last Page</p>:<button id = "nextButton" onClick={this.handleNextButtonPressed}>Next</button>;


        rows.push(
          <tr key ="footer">
            <td>{prevButton}</td>
            <td><hr></hr></td>
            <td>{nextButton}</td>

          </tr>
        )


        return ( 
        <table id = "table">
        <thead>
          <tr id="headerRow">
            <th>{numOfQuestions} Questions</th>  
            <th>All Questions</th>
            <th> {askButton}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>)
    }

}