import React from 'react';
import ReactDOM from 'react-dom';

class PlanetComp extends React.Component{
      render() {
        var data = this.props.data;
        return (
        <div>
       {data.map((item,index) => {
            return( <button key = {index} type="button" className = "btn btn-default btn-circle" onClick={() => this.props.onClickFunc(item.name)} ><p className="planetName">{item.name}</p><br/> <span className="populationHidden"> {item.population} </span></button>)
          })}
       </div>
        );
      }
    };

module.exports = PlanetComp;