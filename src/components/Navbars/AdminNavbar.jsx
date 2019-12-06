import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media, Button
} from "reactstrap";
import Axios from "axios";
import { getProduct } from '../../Public/Redux/Actions/Product'
import { connect } from 'react-redux'

let BASE_URL = process.env.REACT_APP_BASE_URL;

class AdminNavbar extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isLogin:localStorage.getItem('user'),
      user:[],
      product:[],
      search:''
    }
  }
  componentDidMount = async () =>{
    await this.getProduct
    if(this.state.isLogin !== null){
      await this.getUser()
    }
  }

  getUser = () => {
    Axios.get(BASE_URL + '/Users/' + this.state.isLogin,{
      headers: {
        "Authorization": localStorage.getItem('token')
    }  
    })

    .then(res => {
      this.setState({user:res.data})
    })

    .catch(err => {
      console.log(err)
    })
  }
  

  logout(){
    Axios.post(BASE_URL + '/Users/logout')
    localStorage.clear()
    window.location.reload()
  }

  __loginRender(){
    let element = []
    if(this.state.isLogin !== null){
     
      element.push(
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                    <i className="far fa-user" />
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold" style={{color:'white'}}>
                      {this.state.user.username}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem href="#pablo" onClick={() => this.logout()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      )
    } else {
      element.push(
        <Nav className="align-items-center d-none d-md-flex" navbar>
          <Button color="info" href="/login"> Login </Button>
        </Nav>
        
      )
    }
    return element
  }

  async getDataProduct(search=""){
    await this.props.dispatch(getProduct(search))
  }

  async searchValue(e) {
    let value = e.target.value
    setTimeout( async () => {
      await this.getDataProduct(
        value
      )
    }, 1000)
  }

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto" onSubmit={e => { e.preventDefault(); }}> 
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend" >
                    <InputGroupText > 
                      <i className="fas fa-search" style={{color:'white'}}  />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" style={{color:'white'}} onChange={(e) => this.searchValue(e)} />
                </InputGroup>
              </FormGroup>
            </Form>
            {this.__loginRender()}
          </Container>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.productList
  }
}

export default connect (mapStateToProps)(AdminNavbar);
