import React from 'react'

class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            filterActive: false,
            spotList: null,
            country: null,
            wind: null,
            displayFilterForm: 'none',
            displayFilterButton: 'block'
        };
        //Create the Google Map script in HTML using Google API
        const googleApiURL ="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjXyrEK_vC0qFtMbVAHTiyg1jvb-x6N5g&libraries=places";
        const googleMapScript = document.createElement('script');
        googleMapScript.src = googleApiURL;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener('load', ()=>{
            this.googleMap = this.initMap();
        });
    }
    //The main function who create the map
    initMap = () => new window.google.maps.Map(document.getElementById('map'),{
            center: new google.maps.LatLng(44.426765, 26.102537),
            zoom: 10,
            disableDefaultUI: true,
            zoomControl: true
        });
    componentDidMount() {
            //Attach the description in infoWindow from Markers
            const attachDescription=(marker, description)=> {
                let infowindow = new google.maps.InfoWindow({
                    content: description
                });
                //Open the infoWindow
                marker.addListener('click', ()=>{
                    infowindow.open(marker.get(this.googleMap), marker);
                });
            };
            //Fetch the spot location and put the Markers on the map at
           // the right position
            const getLocations = async () => {
                let json = null;
                try {
                    const spotURL = "https://5ddbb358041ac10014de140b.mockapi.io/spot";
                    const response = await fetch(spotURL);
                     json = await response.json();
                     if (json !== null && this.state.filterActive == false) {
                        json.map((element) => {
                            let marker = new window.google.maps.Marker({
                                position: {
                                    lat: parseInt(element.lat),
                                    lng: parseInt(element.long)
                                },
                                map: this.googleMap,
                                icon: {
                                    url: "https://i.ibb.co/VjxdhZk/clipart-0-30-23-9-8-2.png"
                                }
                            });
                            let description =
                                '<div id="contentMarker">' +
                                    '<h1 class="titleInfoWindow">'+ element.name +'</h1>' +
                                    '<p>' + element.country + '<br/>' +
                                    '<div>' +
                                        '<p><span>WIND PROBABILITY</span>' +'<br/>' + element.probability + '%' +'<br/>' +
                                        '<p><span>LATITUDE</span>' +'<br/>' + element.lat + '&#176' + ' N' + '<br/>' +
                                        '<p><span>LONGITUDE</span>' +'<br/>' + element.long + '&#176'+' W' + '<br/>' +
                                        '<p><span>WHEN TO GO</span>' +'<br/>' + element.month + '<br/>' +
                                    '</div>' +
                                '</div>';
                            attachDescription(marker, description.toString());
                        });
                     }
                } catch (err) {
            console.log("Error: " + err)
            }
                this.setState({
                    spotList:json
                });
            };
            getLocations();

    }

    //Change value of inputs from Filter form
    handleChange =(event)=> {
        this.setState({
            [event.target.name]:
            event.target.value
        });
    };
    //Open the for filter whe the FILTER button is pushed
    openFormFilter = (event) => {
      if(this.state.displayFilterForm == 'flex') {
          this.setState({
              displayFilterForm: 'none',
              displayFilterButton: 'block'
          })
      } else {
          this.setState({
              displayFilterForm: 'flex',
              displayFilterButton: 'none'
          })
      }
    };
    //Apply the filter using the information received from te user
   //Capitalize the first letter to prevent the errors, then
  //Search the spot and create a marker for him
    applyFilter = (event) => {
        event.preventDefault();
        let {country, wind, filterActive} = this.state;
        if(country != null && country.length > 1 ) {
            let uppercaseFirstLetter = country;
            function capitalizeFirstLetter(string) {
                return string[0].toUpperCase() + string.slice(1);
            }
            uppercaseFirstLetter = capitalizeFirstLetter(uppercaseFirstLetter.toString());
            this.state.spotList.map(element => {
                if(element.country == uppercaseFirstLetter && element.probability == wind) {
                    let marker = new window.google.maps.Marker({
                        position: {
                            lat: parseInt(element.lat),
                            lng: parseInt(element.long)
                        },
                        map: this.initMap(),
                        icon: {
                            url: "https://i.ibb.co/VjxdhZk/clipart-0-30-23-9-8-2.png"
                        }
                    });
                    if(filterActive){
                        this.setState({
                            filterActive: false
                        });
                    } else {
                        this.setState({
                            filterActive: true
                        });
                    }
                }
            })
        }
    };
    //Update the map after filter has apply
    componentDidUpdate(){
    };
    render() {
        this.googleMap = React.createRef();
        return (
            <>
                <div id={'filter-container'}>
                        <div onClick={this.openFormFilter} style={{display: this.state.displayFilterButton}}>
                            <div className={'button'}><span>
                                <div></div>
                                <div></div>
                                <div></div>
                            </span> FILTER</div>
                        </div>
                        <form style={{display: this.state.displayFilterForm}} id={'filter-page'} onSubmit={this.applyFilter}>
                            <label>Country</label>
                            <input type={'text'} name={'country'} onChange={this.handleChange}/>
                            <label>Wind Probability</label>
                            <input type={'text'} name={'wind'} onChange={this.handleChange}/>
                            <div>
                                <button onClick={this.openFormFilter}>APPLY FILTER</button>
                            </div>
                        </form>
                </div>
                <div id={'map'} ref={this.googleMap}>
                </div>
            </>
                )
    }
}

export  {Map}