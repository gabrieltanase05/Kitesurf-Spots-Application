import React from 'react'
import {Table} from './Table'
import {Map} from './Map'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            displayDropdown: 'none',
            locations: {},
        }
    }
    //Dropdown the profile content with the Logout button
    openProfile=()=>{
        if (this.state.displayDropdown === 'flex') {
            this.setState({
                displayDropdown: 'none'
            })
        } else {
            this.setState({
                displayDropdown: 'flex'
            })
        }
    };
    //Temporary log out system. The real token doesn't exist already.
    logout=()=>{
        this.props.changeToken(null)
    };
render() {
        return (
            <>
                <header>
                    <h2> Kite</h2>
                    <div>
                        <button>ADD SPOT</button>
                        <div className={'dropdown'}>
                            <i onClick={this.openProfile} className="fas fa-user-circle"></i>
                            <div style={{display:this.state.displayDropdown}} className={'dropdown-content'}>
                                <p onClick={this.logout}><i className="fas fa-sign-out-alt"></i> <span>Logout</span></p>
                            </div>
                        </div>
                    </div>
                </header>
                <Map/>
                <Table/>
            </>
        )
}
}
export {Dashboard}