import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import PlanetComp from './PlanetComp';
import {connect} from 'react-redux';
import ajax from 'superagent';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'
import PlanetOverLay from './PlanetOverLay'
import ErrorOverlay from './ErrorOverLay'

var UPDATE_DATA = "UPDATE_DATA";
var searchSugesstions = null;

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

	class ScreenClass extends React.Component{
    constructor(props, context){
    super(props, context);
         this.searchPlanet = this.searchPlanet.bind(this);
         this.getPlanetInfo = this.getPlanetInfo.bind(this);    
         this.updateSearchCount = this.updateSearchCount.bind(this); 
         this.state = {
                  loader: false
                     };       
  }

  searchPlanet(e){
      var value = e.target.value;
      var searchCount = this.props.searchCount ? this.props.searchCount : 0;
      var userName = getCookie("name");

        if(userName != "Luke Skywalker" && searchCount > 15){
          this.props.showErrorOverlayFunc();
          return;
        }
       if(this.props[value] && this.props[value].length > 0){
          
          this.props.searchPlanetAfter(this.props[value],value,searchCount);  //getting data from cache
          return;
      }
      var searchPlanetAfter = this.props.searchPlanetAfter;
      var thisPrev = this;
      if(searchSugesstions != null){
        searchSugesstions  = searchSugesstions.abort();
      }

     this.setState({loader:true})

     searchSugesstions = ajax.get('/search?q=' + value).end(function (err, response) {
        if (err) {
          return;
        }
          var data = response.body;
        
        thisPrev.setState({loader:false})
        searchPlanetAfter(data.results,value,searchCount);

      });

  }

  getPlanetInfo(planetName){
    var getPlanetInfo = this.props.getPlanetInfo;
   
     if(this.props[planetName]){
          
           this.props.getPlanetInfo(this.props[planetName],planetName); //getting data from cache
         
          return;
      }

     var invocation = ajax.get('/getPlanetInfo?planet=' + planetName).end(function (err, response) {
        if (err) {
          return;
        }
          var data = response.body;
          getPlanetInfo(data,planetName);
       
      });
  }

    updateSearchCount(){
      this.props.updateSearchCount()
    }

    componentDidMount(){
      if(getCookie("name") != "Luke Skywalker"){
      setInterval(this.updateSearchCount, 60000);
    }
    }
   	   render() {
          var data = this.props.searchData;
         return(<div className="container">
         <Header headerName = {this.props.heading}/>
         <div className="row"><div className="container"><a href="/logout"><button type="button" className="btn btn-danger logout" >Logout</button> </a></div></div>
        <div className="form-group planetSearch">
          <input type="text" className="form-control" id="Search" placeholder="Start typing planets..." onChange = {this.searchPlanet}/>
        </div> 
        <div className="container planetcontainer" >
        <OverlayLoader 
              color={'red'} 
              loader="ScaleLoader" 
              text="Loading... Please wait!" 
              active={this.state.loader} 
              backgroundColor={'black'} 
              opacity=".4" 
              >
          <PlanetComp data = {data} onClickFunc = {this.getPlanetInfo} />
         
           </OverlayLoader>

        </div>
        <PlanetOverLay planetInfo = {this.props.planetInfo} showPlanetOverlay = {this.props.showPlanetOverlay} closePlanetOverlay = {this.props.closePlanetOverlay} />
          <ErrorOverlay showErrorOverlay = {this.props.showErrorOverlay} closeErrorOverlayFunc = {this.props.closeErrorOverlayFunc} />
    
         </div>);
		  }
    };


   
    const mapStateToProps = (state,ownProps) => {
  			return state;
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      updateSearchCount:() => {
        dispatch(updateSearchCount());
      },
        showErrorOverlayFunc:() => {
          dispatch(showErrorOverlayFunc());
        },
         closeErrorOverlayFunc:() => {
          dispatch(closeErrorOverlayFunc());
        },
       searchPlanetAfter: (data,value,searchCount) =>{
        dispatch(searchPlanetAfter(data,value,searchCount));
      },
      getPlanetInfo: (data,planetName) => {

        dispatch(updatePlanetInfo(data,planetName));
      },
      closePlanetOverlay: () =>{
        dispatch(closePlanetOverlay());
      }
  }
  	}

    const closePlanetOverlay = () => {
       return{
        type: "CLOSE_PLANET_OVERLAY"
      }
    }

    const updateSearchCount = () => {
       return{
        type: "UPDATE_SEARCH_COUNT"
      }
    }
        
   const showErrorOverlayFunc = () => {
       return{
        type: "SHOW_ERROR_OVERLAY"
      }
    }

     const closeErrorOverlayFunc = () => {
       return{
        type: "CLOSE_ERROR_OVERLAY"
      }
    }

    const updatePlanetInfo = (data,planetName) => {
       return{
        type: "UPDATE_PLANET_INFO",data:data,planetName:planetName
      }
    }

  
    const searchPlanetAfter = (data,value,searchCount) =>{
      return{
        type: UPDATE_DATA,data:data,value:value,searchCount
      }
    }

    
     export const Reducer = (state = {},action) => {
    switch(action.type){
      case "UPDATE_SEARCH_COUNT":
                    return Object.assign({},state,{searchCount:0})

      case "SHOW_ERROR_OVERLAY":
              return Object.assign({},state,{showErrorOverlay:true})

  case "CLOSE_ERROR_OVERLAY":
          return Object.assign({},state,{showErrorOverlay:false})

      case "CLOSE_PLANET_OVERLAY":
          return Object.assign({},state,{showPlanetOverlay:false})
      case "UPDATE_PLANET_INFO" :
        var state = state;
        state[action.planetName] = action.data;

      return Object.assign({},state,{planetInfo:action.data.results[0], showPlanetOverlay:true})
      case UPDATE_DATA:
      var state = state;
      state[action.value] = action.data;
      var searchCount = state.searchCount;
      searchCount = searchCount + 1;
      return Object.assign({},state,{searchData:action.data,searchCount:searchCount})
      default:
      return state;
    }
  }


  export const Screen = connect(mapStateToProps,mapDispatchToProps)(ScreenClass);
