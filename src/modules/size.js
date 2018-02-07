import {getPizzaSize} from 'queries';

const initialState = {
  err: null,
  pizzaSizes: [],
  selectedSize: null
}

export const getPizzaBaseSizes = () => {
  return dispatch => {
    getPizzaSize().then(({data}) => {
      dispatch({
        type: 'size_fetch_success',
        payload: data.pizzaSizes
      });
    }).catch(({err}) => {
      dispatch({
        type: 'size_fetch_failed',
        payload: err
      });
    })
  }
}

export const setSelectedSize = (size) => {
  return dispatch => {
    dispatch({
      type: 'set_size',
      payload: size
    });
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'size_fetch_success':
      return {
        ...state, pizzaSizes: action.payload
      }

    case 'size_fetch_failed':
      return {
        ...state,
        err: action.payload
      }
    
    case 'set_size' : 
    return {
      ...state,
      selectedSize: action.payload
    }

    default:
      return state
  }
}