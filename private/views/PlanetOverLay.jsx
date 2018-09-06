 import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/lib/Modal';

 class PlanetOverLay extends React.Component{
       constructor(props, context){
    super(props, context);             
      }
      render(){
        return(
        <Modal show={this.props.showPlanetOverlay} onHide={this.props.closePlanetOverlay}  bsSize="small">
        <Modal.Header closeButton  >
        Infomation About {this.props.planetInfo.name}
        </Modal.Header>
        <Modal.Body>
         <div>
         Name : {this.props.planetInfo.name} <br/>
         Rotation Period : {this.props.planetInfo.rotation_period} <br/>
         Orbital Period : {this.props.planetInfo.orbital_period} <br/>
         Diameter : {this.props.planetInfo.diameter} <br/>
         Climate : {this.props.planetInfo.climate} <br/>
         Gravity : {this.props.planetInfo.gravity} <br/>
         Terrain : {this.props.planetInfo.terrain} <br/>
         Population : {this.props.planetInfo.population}

        </div>
        </Modal.Body>
        </Modal>
        )
      }
    }

           module.exports = PlanetOverLay;