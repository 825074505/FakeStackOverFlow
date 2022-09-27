import React from 'react';
import './header.css';


export default class Header extends React.Component{

  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleQuestionPressed = this.handleQuestionPressed.bind(this);
    this.handleTagPressed = this.handleTagPressed.bind(this);
    this.handleEnterKeyUp = this.handleEnterKeyUp.bind(this);
    this.handleLogOutPressed = this.handleLogOutPressed.bind(this);
    this.handleUserPressed = this.handleUserPressed.bind(this);
  }


  handleLogOutPressed(){

    this.props.onLogOutPressed();

  }

  handleUserPressed(){
    this.props.onUserPressed(this.props.user.uid);
  }

  handleEnterKeyUp(e){
    this.props.onEnterKeyUp(e);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleQuestionPressed(){
    this.props.onQuestionClick();

  }

  handleTagPressed(){
    this.props.onTagClick();
  }



    render(){

        var Question = <a id = "Questions" href="#"  className='header_link'  onClick={this.handleQuestionPressed}>Questions</a>
        
        if(this.props.Qpage){
          Question = <a style={{backgroundColor: '#0281E8'}} id = "Questions" href="#"  className='header_link' onClick={this.handleQuestionPressed}>Questions</a>
        }


        var user = this.props.isLoggedIn ? <a id = "UserLink" href = "#" className='header_link' onClick={this.handleUserPressed}>Hi, {this.props.user.username}</a>  
        : <p id ="Guest">Hello, Guest</p>
        
        var logOut = this.props.isLoggedIn ? <button id='LogOutButton' onClick={this.handleLogOutPressed}>Log Out</button> : null;

        return (
            <div className="header">
      
      
              <div className='header_links'>
                {Question}
                <a id = "Tags" href="#" className='header_link' onClick={this.handleTagPressed}>Tags</a>
              </div>
            
              <h1 className='title'> FakeStackOverflow </h1>
            
              {user}
              {logOut}
              <div className="header__search">
                <input id = "search" className="header__searchInput" type="text" placeholder='Search...' 
                value={this.props.filterText}
                onKeyUp={this.handleEnterKeyUp}
                onChange={this.handleFilterTextChange}/>
                
              </div>
      
              
          </div>
        )

    }
}