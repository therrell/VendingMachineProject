import React, { Component } from 'react';
import { render } from "react-dom";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import "./styles/loc.css"
import VMinfoModal from './VMinfoModal.jsx';
import VMinfo from './VMinfo.jsx';

const apiLink_vm = 'http://127.0.0.1:8000/api/machines/';;
const apiLink_dist = 'http://127.0.0.1:8000/api/distance/';;
const apiLink = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAVDsmLtJdg7kUJb_eiFPJhKkf0uZvPjTY';;

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
          a:'',
          b:'',
          union_dist:'',
          findResult: [],
          vm_info : [],
          back: false,
          visited: true,
          dcl: {buildId:210, latitude:40.113132, longitude:-88.226455},
          siebal: {buildId:563, latitude:40.11385483196672,longitude:-88.22493553161621},
          grainger: {buildId:324, latitude:40.1125317,longitude:-88.2269931},
          union: {buildId:23, latitude:40.1093460, longitude:-88.2272315},
        }
        this.back = this.back.bind(this);
        this.addDist = this.addDist.bind(this);
      this.distance = this.distance.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.loadVMs = this.loadVMs.bind(this);

      this.loadVMs()

    };

    back() {
        this.setState({
            back: true
        });
    }

    addDist(dcl_dist, siebal_dist, grainger_dist, union_dist) {
    console.log(`Adding new Distances eg Siebal has ${this.state.dcl.buildId}:${dcl_dist}`)
      const distURL = apiLink_dist;
      const options = {
        buildingID: this.state.dcl.buildId,
        distance: dcl_dist,
      };
      fetch(distURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(options)
      })
        .then(res => res.json())
        .then(json => {
        });

        const options2 = {
          buildingID: this.state.siebal.buildId,
          distance: siebal_dist,
        };
        fetch(distURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify(options2)
        })
          .then(res => res.json())
          .then(json => {
          });

          const options3 = {
            buildingID: this.state.grainger.buildId,
            distance: grainger_dist,
          };
          fetch(distURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(options3)
          })
            .then(res => res.json())
            .then(json => {
            });

            const options4 = {
              buildingID: this.state.union.buildId,
              distance: union_dist,
            };
            fetch(distURL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('access_token')}`
              },
              body: JSON.stringify(options4)
            })
              .then(res => res.json())
              .then(json => {
              });
               this.setState({
                 visited: false
               });
    }

    loadVMs() {
        // axios.get(apiLink_vm).then((response)=>{
        //     this.setState({
        //         vm_info: response.data
        //     })
        //     console.log(this.state.result);
        // }).catch((error)=>{
        //     console.log(error);
        //     this.setState({
        //         catchError: true
        //     });
        // });
    }


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
  if (this.state.back) {
      return (
          <Redirect to={{ pathname: '/vminfo', state: { id: this.state.id } }} />
      )
  }
  const self = this;

var dcl_dist =  this.distance(self.state.a, self.state.b, self.state.dcl.latitude, self.state.dcl.longitude, "K")
var siebal_dist = this.distance(self.state.a, self.state.b, self.state.siebal.latitude, self.state.siebal.longitude, "K")
var grainger_dist = this.distance(self.state.a, self.state.b, self.state.grainger.latitude, self.state.grainger.longitude, "K")
var union_dist = this.distance(self.state.a, self.state.b, self.state.union.latitude, self.state.union.longitude, "K")
if (this.visited) {
  this.addDist(dcl_dist,siebal_dist,grainger_dist,union_dist)
};

        return (
            <div className="container">
            <Button className="form" onClick={this.back} startIcon={<ArrowBackIcon />} variant="contained" color="primary">
            Find a Vending Machine
            </Button>
                <Typography variant="h3">
                    Vending Machine Locator
                </Typography>
                <Paper className="paper">
                <form className="form">
                    </form>
                    <Typography variant="h4">
                        Based on Location and Popularity
                    </Typography>
                    <Typography variant="h6">
                    Distance in km
                    <br/>
                    Dcl (210) is : {dcl_dist} <br/>
                    Siebal (563) is : {siebal_dist}
                    <br/>
                    Grainger (324) is : {grainger_dist}
                    <br/>
                    Union (23) is : {union_dist}
                    <br/>
                    </Typography>
              </Paper>
              <TableContainer component={Paper}>
                  <Table >
                      <TableHead>
                      <TableRow>
                          <TableCell align="left">BuildingID</TableCell>
                          <TableCell align="left">VMID</TableCell>
                          <TableCell align="left">VMLocation</TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Type</TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody >
                        {this.state.vm_info.map((row, i) => (
                          <TableRow key={row.vmID}>
                          <TableCell align="left">{row.buildingID}</TableCell>
                          <TableCell align="left">{row.vmID}</TableCell>
                          <TableCell align="left">{row.VMLocation}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                          <TableCell align="left">{row.type}</TableCell>
                          <TableCell align="left" ><VMinfoModal vmId={row.vmID}/></TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              </TableContainer>
            </div>
        )
    }
}
render(<Location />, document.getElementById("root"));

export default (Location);
