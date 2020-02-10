import React from "react";

class  SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            passwordRepeat:'',
            terms: false,
        }
    }

    //Change value of inputs
    handleChange =(event)=>{
        this.setState({
            [event.target.name]: event.target.value.trim()
        });
    };

    //Change Checkbox value
    changeCheckbox =()=>{
        this.state.terms === true ? this.setState({terms: false}) : this.setState({terms:true});
    };

    //Submit the SignUp
    submitSignUp = (event)=>{
        event.preventDefault();
        let { firstName, lastName, email, password, passwordRepeat } = this.state;
        const dataPost = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        //Sent the information received from user and send to db
        const signupUser= async ()=> {
            try {
                const response = await fetch('NEED URL FOR SIGNUP', {
                    method: 'POST',
                    body: JSON.stringify(dataPost),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });

            }
            catch (err) {
                console.log("Error: "+err)
            }
        };
        if(password.length >= 8 && password === passwordRepeat){
            signupUser();
        }
    };
    render() {
        return (
                <form className="signupForm" onSubmit={this.submitSignUp}>
                    <label>First Name</label>
                        <input type="text" placeholder="Enter First Name" name="firstName" onChange={this.handleChange} required/>
                    <label>Last Name</label>
                        <input type="text" placeholder="Enter LastName" name="lastName" onChange={this.handleChange} required/>
                    <label>Email</label>
                        <input type="email" placeholder="Enter Email" name="email" onChange={this.handleChange} required/>
                    <label>Password</label>
                        <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChange} required/>
                    <label>Repeat Password</label>
                        <input type="password" placeholder="Repeat Password" name="passwordRepeat" onChange={this.handleChange} required/>
                    <label>
                        <input type="checkbox" name="terms" onChange={this.changeCheckbox} defaultChecked={false} required/>
                        I' agree to the <a href="#" >Terms and Privacy</a>
                    </label>
                    <div>
                        <button type="submit">Signup</button>
                    </div>
                </form>
        )
    }
}
export {SignUp}