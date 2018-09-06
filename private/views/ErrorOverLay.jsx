 import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/lib/Modal';

 class ErrorOverlay extends React.Component{
       constructor(props, context){
    super(props, context);             
      }
      render(){
        return(
        <Modal show={this.props.showErrorOverlay} onHide={this.props.closeErrorOverlayFunc}  bsSize="small">
        <Modal.Header closeButton  >
       Error
        </Modal.Header>
        <Modal.Body>
         <div>

        You can only perform 15 searches per minute.
        
        </div>
        </Modal.Body>
        </Modal>
        )
      }
    }

           module.exports = ErrorOverlay;