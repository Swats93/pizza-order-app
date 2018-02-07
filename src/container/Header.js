import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {css} from 'glamor';
import {cart} from '../assets/images';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="w-100 fl-ns cf f3" style={{backgroundColor: '#095c91'}}>
          <div className="w-30 white b fl-ns pl4 pt2 pb2">Pizzmaina</div>
          <div className="w-30 white f5 tr fr-ns pr4 pl4 pt2 pb1">
            <Link to={`/checkout`}>
            <img
                src={cart}
                {...css({height: "35", width: "35"})}
                className="pointer"
              />``
            </Link>
              
          </div>
        </div>
      </div>
    )
  }
}


export default connect()(Header);