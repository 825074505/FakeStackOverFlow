import React from 'react';

import "./loginForm.css"



export default class LogInPage extends React.Component{


    constructor(props){
        super(props)
        this.state = {

        }
        this.handleLogInButtonPressed = this.handleLogInButtonPressed.bind(this);
    }


    handleLogInButtonPressed(){


        let email = document.getElementById('Email').value;
        let password = document.getElementById("Password").value;


        this.props.onLogInButtonPressed(password,email);

    }


    render(){

        return(
            <div className='loginForm'>
                <form>
                    <p id='loginErrMsg1' className='errMsg'>Email does not exist</p>
                    <p id='loginErrMsg2' className='errMsg'>Email and Password doesnt match</p>
                    <h1>FakeStackOverFlow</h1>
                    <h4>Enter Email :</h4>
                    <input type="text" id="Email" name="Email"></input><br></br>
                    <h4>Enter Password :</h4>
                    <input type="text" id = "Password" name = "Password"></input><br></br>
                    <button id ="LoginButton" type="button" onClick={this.handleLogInButtonPressed}>Log In</button>
                </form>
            </div>
        )
    }
}