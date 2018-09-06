import React  from 'react';
import {Provider} from 'react-redux';
import { createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import ReactDOM from 'react-dom';
import {Reducer} from './screen';
import {Screen} from './screen';
import Login from './login';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
	var heading = "Welcome " + getCookie("name");

var initialStore = {'showErrorOverlay' : false,'searchCount':0,"heading":heading,"searchData" : [],"showPlanetOverlay" : false, "planetInfo" : {}};
		var initialState = Object.assign({},initialStore);
		const store = createStore(Reducer,
 			initialState,
			compose(applyMiddleware(thunk))
  		);

ReactDOM.render(
	<Provider store={store}>
	  <Router>
	  <div>
  <Route exact path="/" component={Screen}/>
    <Route path="/login" component={Login}/>
    </div>
	  </Router>
   </Provider>,
		    document.getElementById('projectcontent')
		  );