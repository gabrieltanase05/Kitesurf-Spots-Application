//React.JS - MAIN//
import React from 'react';
import ReactDOM from 'react-dom';
import {SignUp} from "../src/components/SignUp";
import {Login} from "../src/components/Login";
import {Dashboard} from "../src/components/Dashboard"

class Authentification extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            register: true
        }
    }
    changeRegisterForLogin =(event)=>{
        this.setState({register:true})
    }
    changeRegisterForSignup =(event)=>{
        this.setState({register:false})
    }
    render() {
        let {register} = this.state;
        if(register){
            return (
                <article>
                        <div>
                            <button type={'swich'} onClick={this.changeRegisterForLogin} >Login</button>
                            <button type={'swich'} onClick={this.changeRegisterForSignup} >Signup</button>
                        </div>
                        <Login changeToken={this.props.changeToken}/>
                </article>
            )
        } else {
            return (
                <article>
                        <div>
                            <button type={'swich'} onClick={this.changeRegisterForLogin} >Login</button>
                            <button type={'swich'} onClick={this.changeRegisterForSignup} >Signup</button>
                        </div>
                        <SignUp/>
                </article>
            )
        }
    }
}
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            token: null //defaul NULL!!
        }
    }
    //Set token to null for Logout
    changeToken=(token)=>{
        this.setState({
            token:token
        });
    }
    render() {
        //The condition for showing te corect window for user.
       //If the token exist the user can use the Dashboard,
      // also he need to Login
        let {token} = this.state;
        if(token !== null) {
            return(
                <Dashboard changeToken={this.changeToken}/>
            )
        } else {
            return (
                    <section className={'authentification'}>
                        <div className={'title'}>Kite</div>
                        <Authentification changeToken={this.changeToken}/>
                    </section>
                )
        }

    }
}
document.addEventListener('DOMContentLoaded', function (event) {
//////DOM//////
ReactDOM.render(
    <App/>, document.getElementById('app')
);
//////DOM//////
})