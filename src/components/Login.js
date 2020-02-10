import React from "react";

class  Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    //Change value of inputs from form
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value.trim()
        });

    };
    //Submit the Login and store the userID in the state
    submitLogin = (event)=>{
        event.preventDefault();
        let {username, password} = this.state;
        const loginData = {
            username: username,
            password: password
        };
        const loginUser= async ()=> {
            try {
                const loginURL = "https://5ddbb358041ac10014de140b.mockapi.io/login";
                const response = await fetch(loginURL, {
                    method: 'POST',
                    body: JSON.stringify(loginData),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                let json = await response.json();
                //Use userID like 'token' just for validate the login, for now.
               //Temporary solution
              //The api to verify the token didn't exist
                await this.props.changeToken(json.userId);
            }
            catch (err) {
                console.log("Error: "+err)
            }
        };
        loginUser()
    };

    render() {

        return (
                <form className="loginForm" onSubmit={this.submitLogin}>
                    <label>Username</label>
                    <input type="email" placeholder=" Please enter your e-mail" name="username" onChange={this.handleChange}
                           required/>
                    <label>Password</label>
                    <input type="password" placeholder=" Please enter your password" name="password" onChange={this.handleChange}
                           required/>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
        )
    }
}
export {Login}