import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component{
      render() {
        return (
     <header> 
            <nav className="navbar navbar-default header-custom">
                  <a className="logo-custom" href="javascript:void(0)">{this.props.headerName}</a>
            </nav> 
      </header>
        );
      }
    };

	   module.exports = Header;