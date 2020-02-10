import React from 'react'

//This function for dynamic search.
//Searching by Name, Country and Month
function searchingFor(atr) {
    return function (x) {
        return (
            x.name.toLowerCase().includes(atr.toLowerCase() || !atr)
            || x.country.toLowerCase().includes(atr.toLowerCase() || !atr)
            || x.month.toLowerCase().includes(atr.toLowerCase() || !atr)
        )
    }
}
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            locations: null,
            searchFilter: '',
            sortType: 'default'
        };
    }
    componentDidMount() {
        //Load the location information in dashboard table
        const getLocations = async () => {
            try {
                const response = await fetch("https://5ddbb358041ac10014de140b.mockapi.io/spot");
                let json = await response.json();
                if(json!==null){
                    //Save the spots in locations state
                   //if the response isn't empty
                    this.setState({
                            locations:json,
                        });
                }
            } catch (err) {
                console.log("Error: " + err)
            }
        };
        getLocations()
    }
    //Change the searchFilter value with the input value
    handleChange = (event) =>{
      this.setState({
          searchFilter: event.target.value
      });
    };
    render() {
        const {searchFilter, locations} = this.state;
        return (
            <section className={'locationsTable'}>
                <div className={'container'}>
                <h1>Locations</h1>
                    <form>
                        <input
                            type={'text'}
                            value={searchFilter}
                            onChange={this.handleChange}
                            placeholder="  &#xF002;   Search..."
                        />
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Name <i className="fas fa-sort"></i></th>
                                <th>Country <i className="fas fa-sort"></i></th>
                                <th>Latitude <i className="fas fa-sort"></i></th>
                                <th>Longitude <i className="fas fa-sort"></i></th>
                                <th>Wind Probability <i className="fas fa-sort"></i></th>
                                <th>When to go <i className="fas fa-sort"></i></th>
                            </tr>
                        </thead>

                            <tbody>
                            {    //Check if the spots has load and the user type
                                //in the search bar and show the results
                                locations !== null && searchFilter !== ''?
                                locations.filter(searchingFor(searchFilter)).map(element=>{
                                    return (
                                        <tr key={element.id}>
                                            <td>{element.name}</td>
                                            <td>{element.country}</td>
                                            <td>{element.lat}</td>
                                            <td>{element.long}</td>
                                            <td>{element.probability}</td>
                                            <td>{element.month}</td>
                                        </tr>
                                    )
                                }):
                                //If the user don't use the search bar and
                               // the spots it's load display all spots
                                locations !==null && searchFilter === '' ?
                                    locations.map(element=>{
                                        return (
                                            <tr key={element.id}>
                                                <td>{element.name}</td>
                                                <td>{element.country}</td>
                                                <td>{element.lat}</td>
                                                <td>{element.long}</td>
                                                <td>{element.probability}</td>
                                                <td>{element.month}</td>
                                            </tr>
                                        )
                                    }): null
                            }
                            </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

export {Table}