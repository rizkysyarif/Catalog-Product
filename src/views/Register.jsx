import React from "react";
import axios from 'axios'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col, Container
} from "reactstrap";

class Register extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      email:'',
      username:'',
      password:''
    }
  }
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  inputonChange = (e) => {
    this.setState({[e.target.name] : e.target.value })
  }

  register = (event) => {
    event.preventDefault(event);
    axios.post('http://localhost:3000/api/Users', {
      username:this.state.username,
      email:this.state.email,
      password:this.state.password,
    })

    .then(res => {
      if(res.status === 200){
        axios.post('http://localhost:3000/api/Users/login', {
          email:this.state.email,
          password:this.state.password,
        })
        .then(res => {
          if(res.status === 200){
            localStorage.setItem('token', res.data.id)
            localStorage.setItem('user', res.data.userId)
            window.location.replace('/admin/index')      
          }
        })
    
        .catch(err => {
          window.alert("Login Failed !")
          console.log(err)
        })     
      }
    })

    .catch(err => {
      window.alert("Register Failed !")
      console.log(err)
    })
  }
  render() {
    return (
      <>
        <div className="main-content">
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-5">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome To RiztMart!</h1>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-4">
                    <small>Sign up with</small>
                  </div>
                  <div className="text-center">
                    <Button
                      className="btn-neutral btn-icon mr-4"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <span className="btn-inner--icon">
                        <img
                          alt="..."
                          src={require("assets/img/icons/common/github.svg")}
                        />
                      </span>
                      <span className="btn-inner--text">Github</span>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <span className="btn-inner--icon">
                        <img
                          alt="..."
                          src={require("assets/img/icons/common/google.svg")}
                        />
                      </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign up with credentials</small>
                  </div>
                  <Form role="form" onSubmit={this.register}>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" name="username" value={this.state.username} onChange={this.inputonChange} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" name="email" value={this.state.email} onChange={this.inputonChange} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.inputonChange} />
                      </InputGroup>
                    </FormGroup>
                    <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheckRegister"
                          >
                            <span className="text-muted">
                              I agree with the{" "}
                              <a href="#pablo" onClick={e => e.preventDefault()}>
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button className="mt-4" color="primary" type="submit">
                        Create account
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Register;
