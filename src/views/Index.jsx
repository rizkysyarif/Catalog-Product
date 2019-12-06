import React, { isValidElement } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col, InputGroupText, Input,
  Form, FormGroup, InputGroup, InputGroupAddon
} from "reactstrap";
import axios from 'axios'
import Rupiah from 'rupiah-format'
import { getProduct } from '../Public/Redux/Actions/Product'
import { connect } from 'react-redux'

// core components

import Header from "components/Headers/Header.jsx";

let BASE_URL = process.env.REACT_APP_BASE_URL;
class Index extends React.Component {
  constructor(props){
    super(props)
    this.state={
      search:''
    }
  }

  componentDidMount = async () =>{
    await this.getProduct()
  }

  getProduct = async (search="") => {
    await this.props.dispatch(getProduct(
      search
    ))
    this.setState({
      search: search
    })
  }

  render() {
    return (
      <>
        <Header />
        <Container fluid>
              <Row>
                {this.props.data.productList.map((val) => {   
                  return (
                    <Col lg="6" xl="3">
                      <div className="card mb-5" style={{width:'18rem'}}>
                        <img className="card-img-top" style={{maxHeight:'270px', minHeight:'270px'}} src={`${BASE_URL}/images/product/download/${val.image}`} alt="Card image cap" />
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

const mapStateToProps = state => {
  return {
    data: state.productList
  }
}

export default connect(mapStateToProps)(Index);
