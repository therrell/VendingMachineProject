import React, { Component } from 'react';
import { render } from "react-dom";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import "./styles/loc.css"


const apiLink = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAVDsmLtJdg7kUJb_eiFPJhKkf0uZvPjTY';;

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
          a:'',
          b:'',
          dcl: {buildId:210, latitude:40.113132, longitude:-88.226455},
          siebal: {buildId:563, latitude:40.11385483196672,longitude:-88.22493553161621},
          grainger: {buildId:324, latitude:40.1125317,longitude:-88.2269931},
          union: {buildId:23, latitude:40.1093460, longitude:-88.2272315},
        }
      this.distance = this.distance.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
    };

distance(lat1, lon1, lat2, lon2, unit) {
    	if ((lat1 == lat2) && (lon1 == lon2)) {
        console.log("Distance is :", "0");
    		return 0;
    	}
    	else {
    		var radlat1 = Math.PI * lat1/180;
    		var radlat2 = Math.PI * lat2/180;
    		var theta = lon1-lon2;
    		var radtheta = Math.PI * theta/180;
    		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    		if (dist > 1) {
    			dist = 1;
    		}
    		dist = Math.acos(dist);
    		dist = dist * 180/Math.PI;
    		dist = dist * 60 * 1.1515;
    		if (unit=="K") { dist = dist * 1.609344 }
    		if (unit=="N") { dist = dist * 0.8684 }
        console.log("Distance is :", dist);
    		return dist.toFixed(4);
    	}
}

componentDidMount(props) {
  let currentComponent = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        //var distance = navigator.geolocation.distance(position.coords.latitude, position.coords.longitude, 48.8567, 2.3508, 'M');
        currentComponent.setState({a: position.coords.latitude,
                                   b: position.coords.longitude})
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
}

render() {
  const self = this;
        return (
            <div className="container">
                <Typography variant="h2">
                    Vending Machine Locator
                </Typography>
                <Paper className="paper">
                    <Typography variant="h4">
                        Distance from my Location (km)
                    </Typography>
                    <Typography variant="h6">
                    Dcl (210) is : {this.distance(self.state.a, self.state.b, self.state.dcl.latitude, self.state.dcl.longitude, "K")}
                    <br/>
                    Siebal (563) is : {this.distance(self.state.a, self.state.b, self.state.siebal.latitude, self.state.siebal.longitude, "K")}
                    <br/>
                    Grainger (324) is : {this.distance(self.state.a, self.state.b, self.state.grainger.latitude, self.state.grainger.longitude, "K")}
                    <br/>
                    Union (23) is : {this.distance(self.state.a, self.state.b, self.state.union.latitude, self.state.union.longitude, "K")}
                    <br/>
                    </Typography>
              </Paper>
            </div>
        )
    }
}
render(<Location />, document.getElementById("root"));

export default (Location);
