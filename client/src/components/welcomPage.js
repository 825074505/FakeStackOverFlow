import React from 'react';
import "./welcomPage.css";

export default class WelcomePage extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
        this.handleRegisterPressed = this.handleRegisterPressed.bind(this);
        this.handleGuestPressed = this.handleGuestPressed.bind(this);
        this.handleLogInPressed = this.handleLogInPressed.bind(this);
    }


    handleLogInPressed(){
        this.props.onLogInPressed();
    }


    handleRegisterPressed(){
        this.props.onRegisterPressed();
    }

    handleGuestPressed(){
        this.props.onGuestPressed();
    }



    render(){
        return(
            <div className='WelcomePage'>
            <div className='Title'>
                <h1>
                    Welcome to FakeStackOverflow
                </h1>
            </div>
            <div className='LoginButton'>
                <button className='WelcomeButton' type="button" onClick={this.handleLogInPressed}>Login as existing user</button>

            </div>
            <div className='RegisterButton'>
                <button className='WelcomeButton' type="button" onClick={this.handleRegisterPressed}>Register as new user</button>     

            </div>
            <div className='GuestButton'>
                <button className='WelcomeButton' type="button" onClick= {this.handleGuestPressed}>Continue as guest</button>
            </div>
            </div>
        )
    }

}