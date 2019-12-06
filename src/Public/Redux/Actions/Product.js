import axios from 'axios'

let BASE_URL = process.env.REACT_APP_BASE_URL;

export const getProduct = (search='') => {
  return {
    type: 'GET_PRODUCT',
    payload: new Promise((resolve, reject) => {

        axios.get(BASE_URL + `/products?filter[include]=category&filter[where][name][like]=${search}%`,{
        })
            .then(result => resolve(result, search))
            .catch(error => reject(error))    
    })
  }
}