import React, { isValidElement } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
import axios from 'axios'
import Rupiah from 'rupiah-format'

// core components

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
  constructor(props){
    super(props)
    this.state={
      product: []
    }
  }

  componentDidMount = async () =>{
    await this.getProduct()
  }

  getProduct = async () => {
    await axios.get('http://localhost:3000/api/products?filter[include]=category')

    .then(result => {
      this.setState({product: result.data})
    })
    
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <>
        <Header />
        <Container fluid>
              <Row>
                {this.state.product.map((val) => {   
                  return (
                    <Col lg="6" xl="3">
                      <div className="card mb-5" style={{width:'18rem'}}>
                        <img className="card-img-top" style={{maxHeight:'270px', minHeight:'270px'}} src={`http://localhost:3000/api/images/product/download/${val.image}`} alt="Card image cap" />
                        <div className="card-body">
                          <h2 className="card-title">{val.name}</h2>
                          <p note className="card-text">{val.category.name_category}</p>
                          <p className="card-text">{val.description}</p>
                          <p className="card-text">{Rupiah.convert(val.price)}</p>
                        </div>
                      </div>
                    </Col>
                  )             
                })}
              </Row>
          </Container>
      </>
    );
  }
}

export default Index;