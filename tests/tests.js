import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import screen  from '../private/views/screen';
import Header  from '../private/views/header';
import PlanetComp  from '../private/views/PlanetComp';
import PlanetOverLay  from '../private/views/PlanetOverLay';
import {spy} from 'sinon';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Reducer} from '../private/views/screen';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

var initialStore = {"heading":"Welcome","searchData" : [],"showPlanetOverlay" : false, "planetInfo" : {}};
var store = createStore(Reducer, initialStore,applyMiddleware(
   thunkMiddleware 
    ));



  describe('Test cases for Screen Component: ', () => {

  it('Screen should exist', () => {
    let wrapper = mount(<Provider store={store}><screen/></Provider>);

    expect(wrapper).to.exist;
  });

   
     it('should contains <Header />, <PlanetComp />, <PlanetOverLay />', () => {
        
        const wrapper = mount(<Provider store={store}><screen/></Provider>);
        const Header = wrapper.find('Header');
        const PlanetComp = wrapper.find('PlanetComp');
        const PlanetOverLay = wrapper.find('PlanetOverLay');

        assert.equal(Header.length, 0);
        assert.equal(PlanetComp.length, 0);
        assert.equal(PlanetOverLay.length, 0);
        });

      
        it('title in the header should be same as passed as props', () => {
          const HEADER_PROPS = {
        headerName: 'Welcome'
        };
    const wrapper = shallow(<Header {...HEADER_PROPS} />);

expect(wrapper.find('.logo-custom').text()).to.equal('Welcome');

                    });



        it('length of anchor tags should be 1', () => {
          const HEADER_PROPS = {
        headerName: 'Welcome'
        };
  
    const wrapper = shallow(<Header {...HEADER_PROPS} />);
        const aResult = wrapper.find('a');

        assert.equal(aResult.length, 1);

                    });


                      it('planet component should show name of the planet as passed', () => {
          const PLANET_PROPS = {
        data: [{
                  "name": "Yavin IV",
                  "rotation_period": "24",
                  "orbital_period": "4818",
                  "diameter": "10200",
                  "climate": "temperate, tropical",
                  "gravity": "1 standard",
                  "terrain": "jungle, rainforests",
                  "surface_water": "8",
                  "population": "1000",
                  "residents": [],
                  "films": [
                    "https://swapi.co/api/films/1/"
                  ],
                  "created": "2014-12-10T11:37:19.144000Z",
                  "edited": "2014-12-20T20:58:18.421000Z",
                  "url": "https://swapi.co/api/planets/3/"
                }]
                        };

    const wrapper = shallow(<PlanetComp {...PLANET_PROPS} />);
    expect(wrapper.find('.planetName').text()).to.equal('Yavin IV');

                    });       
        
});

