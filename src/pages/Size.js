import React from 'react';
import { connect } from 'react-redux';
import {css} from 'glamor';

import {pizz} from 'assets/images';
import {getPizzaBaseSizes, setSelectedSize} from 'modules/size';
import Header from 'container/Header';

class Size extends React.Component {

  componentWillMount() {
    this.props.dispatch(getPizzaBaseSizes());
  }

  render() {
    const sizes = this.props.pizzaSizes;
    if(sizes.length === 0) {
      return (
        <h1 className="tc"> Loading.... </h1>
      )
    }
    return (
      <div className="w-100 fl-ns cf">
        <Header />
        <div className="f4 black tc mt6 b">All new Pizza..Select the size of pizza?</div>
          <div className="w-100 fl-ns cf" style={{}}>
            {sizes.map((size, indx) => (
              <div className="mw5 mt4 center pb2 bg-white" key={indx} onClick={() => {
                this.props.dispatch(setSelectedSize(size));
                this.props.history.push(`/toppings`);
                }} style={{boxShadow: 'rgba(0,0,0,0.5) 0px 0px 8px 0px'}}>
                  <img
                    src={pizz}
                    {...css({height: "60%", width: "60%", paddingLeft: "3rem", paddingRight: "3rem"})}
                    className="pointer pt3"
                  />
                 <div className="tc f5">Size: {size.name}</div>
                 <div className="tc f5">Price: ${size.basePrice}</div>
                </div>
            ))}
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    err: state.size.err,
    pizzaSizes: state.size.pizzaSizes
  }
}

export default connect(
  mapStateToProps
)(Size);
