import React from 'react';
import "./registerForm.css"


export default class RegisterPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
        this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(this);
    }


    handleRegisterButtonPressed(){

        console.log('1')

        let username = document.getElementById('UsernameReg').value;

        let password = document.getElementById('PasswordReg').value;
        let email = document.getElementById("EmailReg").value;

        let emailSplit = email.split("@");

        let validated = true;


        var errMsgs = document.getElementsByClassName("errMsg")
        for(let i = 0; i< errMsgs.length; i++){
            if(errMsgs[i].style.display != "none"){
            errMsgs[i].style.display = "none";
            }
        }

        if(!email.includes("@") || !email.includes(".")){

            validated = false;
            document.getElementById("regErrMsg1").style.display = "flex";
        }
        if(emailSplit.includes("") || emailSplit.length > 2){
            validated = false;
            document.getElementById("regErrMsg1").style.display = "flex";
        }
        if(password.includes(username) || password.includes(emailSplit[0])){
            validated = false;
            document.getElementById('regErrMsg2').style.display = "flex";
        }

        if(username.length > 15){
            validated = false;
            document.getElementById('regErrMsg4').style.display = "flex";
        }

        
        if(validated){
            this.props.onRegisterButtonPressed(username, password, email);

        }

        
    }

    render(){

        return(
            <div className='RegisterForm'>
                <form>
                    <p id='regErrMsg1' className='errMsg'>Email is not valid</p>
                    <p id='regErrMsg2' className='errMsg'>Password must not include username or email id</p>
                    <p id="regErrMsg3" className='errMsg'>Email already exist</p>
                    <p id="regErrMsg4" className='errMsg'>Username should not be more than 15 characters</p>
                    <h1>FakeStackOverFlow</h1>
                    <h4>Enter Email</h4>
                    <input type="text" id="EmailReg" name="EmailReg"></input><br></br>
                    <h4>Enter Password</h4>
                    <input type="text" id = "PasswordReg" name = "PasswordReg"></input><br></br>
                    <h4>Enter Username</h4>
                    <input type="text" id = "UsernameReg" name='UsernameReg'></input><br></br>
                    <button id ="RegisterButton" type="button" onClick={this.handleRegisterButtonPressed}>Sign Up</button>
                </form>
            </div>
        )
    }
}