import React from 'react';
import ReactDOM from 'react-dom';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class Login extends React.Component{
      render() {
        return (
          <div className = "startWarsLogin">
      <div className="container">
        <form className="form-signin" method="post" action="/authenticate">
       <h2 className="form-signin-heading"> {getParameterByName("retry") ?  "Invalid Credentials, Try Again" : "Please Log In to Access"}</h2>
          <label htmlFor="inputEmail" className="sr-only">Enter your Name</label>
          <input type="text" id="inputEmail" className="form-control" placeholder="Enter your Name" required autoFocus name="username" />
          <br />
          <label htmlFor="inputPassword" className="sr-only">Enter Password</label>
          <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Enter your Password" required />
          <br />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
      </div>
        );
      }
    };

	   module.exports = Login;