import React from "react";

// reactstrap components
import {
  Button,
  Card,
  Media,
  Table,
  Container,
  Row,
  Modal, 
  Input,
  ModalBody, 
  ModalHeader, ModalFooter
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import axios from "axios";
import Rupiah from 'rupiah-format'
const qs = require('querystring')
let BASE_URL = process.env.REACT_APP_BASE_URL;

class Tables extends React.Component {
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.state = {
      modal: false,
      modalUpdate: false,
      product:[],
      categories:[],
      name:'',
      category:0,
      description:'',
      price:0,
      image:'',
      idProduct:0

    }
  }

  componentDidMount = async () =>{
    await this.getProduct()
    await this.getCategory()
  }

  getCategory = async () => {
    await axios.get(BASE_URL + '/categories')

    .then(result => {
      this.setState({categories: result.data})
    })
    
    .catch(err => {
      console.log(err)
    })
  }

  getProduct = async () => {
    await axios.get( BASE_URL + '/products?filter[include]=category')

    .then(result => {
      this.setState({product: result.data})
    })
    
    .catch(err => {
      console.log(err)
    })
  }

  delete(val){
    let id=val.id
    axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    })
    if(window.confirm('Are You Sure to Delete This Product'))
      window.location.reload()
    }
  

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleUpdate(val) {
    this.setState({
      modalUpdate: !this.state.modalUpdate,
      name:val.name,
      price:val.price,
      description:val.description,
      image:val.image,
      category:val.categoryId,
      idProduct:val.id
    });
  }
  
  addProduct(e){
    e.preventDefault();
    let formData = new FormData()
    let imageFile = e.target.image.files[0]
    formData.append("file", imageFile)

    let bodyData = {
      "name": e.target.name.value,
      "price": e.target.price.value,
      "categoryId": e.target.category.value,
      "description": e.target.description.value,
    }

    axios.post( BASE_URL + '/images/product/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": localStorage.getItem('token')
      }
    })
    .then(res =>{
      let imageName = res.data.result.files.file[0].name
      let token = localStorage.getItem('token')
      bodyData['image'] = imageName
      axios.post( BASE_URL + '/products', qs.stringify(bodyData), {
        headers: {
          "Authorization": token
        }
      })
      .then(res=> {
        window.alert('Add Product Success')
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
      // throw "stop execution";
    })
    .catch(err =>{
      console.log(err)
    })
  }

  updateProduct(e) {
    e.preventDefault();
    let id = e.target.id.value
    let formData = new FormData()
    let imageFile = e.target.image.files[0]
    let bodyData = {
      "name": e.target.name.value,
      "price": e.target.price.value,
      "categoryId": e.target.category.value,
      "description": e.target.description.value,
    }
    if (imageFile) {
      formData.append("file", imageFile)

    axios.post( BASE_URL + '/images/product/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": localStorage.getItem('token')
      }
    })
    .then(res =>{
      let imageName = res.data.result.files.file[0].name
      let token = localStorage.getItem('token')
      bodyData['image'] = imageName
      axios.patch('/products/' + id, qs.stringify(bodyData), {
        headers: {
          "Authorization": token
        }
      })
      .then(res=> {
        window.alert('Edit Product Success')
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err =>{
      console.log(err)
    })
    } else {
      let token = localStorage.getItem('token')
      axios.patch( BASE_URL + '/products/' + id, qs.stringify(bodyData), {
        headers: {
          "Authorization": token
        }
      })
      .then(res=> {
        window.alert('Edit Product Success')
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
    }
    
  }

  handlerChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt-5" fluid>
          <div className='text-right mr-2'>
            <Button color="success" onClick={this.toggle}> <i className="fas fa-plus" /> Add Product </Button>
            <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
              <ModalBody>
              <form onSubmit={this.addProduct} style={{marginLeft:'100px'}} enctype="multipart/form-data">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label >Product Name :</label>
                      <input style={{width:'250px'}} required class="form-control" id="exampleFormControlInput1" placeholder="Product Name" name="name" />
                    </div>
                    <div class="form-group">
                      <label >Price :</label>
                      <input required style={{width:'250px'}} type="text" pattern="[0-9]*" class="form-control" id="exampleFormControlInput1" placeholder="Price" name="price"/>
                    </div>
                    <div>
                      <label >Description :</label>
                      <textarea required style={{width:'250px'}} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description Product" name="description"></textarea>
                    </div>
                    <label >Category :</label>
                    <Input style={{color:'black', width:'250px'}} type="select" ype="select" name="category" id="category" value={this.state.category} onChange={(event) => this.handlerChange(event)}>
                    {this.state.categories.map((item) => {
                      return(
                        <option key={item.id} value={item.id} >{item.name_category}</option>
                        )
                      })  
                    }

                    </Input>
                    <div className="form-group" >
                      <label >Image :</label>
                      <input required type="file" name="image" />
                    </div>
                  </div>
                </div>
                <Button color="primary" type="submit">Add</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </form>
                
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </Modal>
          </div>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light" style={{height:'80px'}}>
                    <tr>
                      <th scope="col" className='text-center'>Product</th>
                      <th scope="col" className='text-center'>Description</th>
                      <th scope="col" className='text-center'>Price</th>
                      <th scope="col" className='text-center'>Category</th>
                      <th scope="col" className='text-center'> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.product.map((val, key) => {
                      return (
                        <tr>
                          <th scope="row" className='text-center'>
                            <Media className="align-items-center ml-4">
                                <img
                                  style={{maxWidth:'100px', maxHeight:'100px'}}
                                  alt="..."
                                  src={`${BASE_URL}/images/product/download/${val.image}`}
                                />
                              <Media>
                                <span className="mb-0 text-sm ml-3">
                                  {val.name}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td className='text-center'>{val.description}</td>
                          <td className='text-center'>
                             {Rupiah.convert(val.price)}
                          </td>
                          <td>{val.category.name_category}</td>
                          
                          <td className="text-center">
                            <Button outline color='info' onClick={()=>this.toggleUpdate(val)}>
                              <i className='far fa-edit' /> Update
                            </Button>
                            <Button outline color='danger' onClick={()=> this.delete(val)}>
                              <i className='far fa-trash-alt' /> Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
        <Modal isOpen={this.state.modalUpdate} fade={false} toggle={this.toggleUpdate} className={this.props.className}>
              <ModalHeader toggle={this.toggleUpdate}>Edit Product</ModalHeader>
              <ModalBody>
              <form onSubmit={this.updateProduct} style={{marginLeft:'100px'}} enctype="multipart/form-data">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label >Product Name :</label>
                      <input style={{width:'250px'}} required class="form-control" id="exampleFormControlInput1" placeholder="Product Name" value={this.state.name} name="name"  onChange={(event) => this.handlerChange(event)} />
                    </div>
                    <div class="form-group">
                      <label >Price :</label>
                      <input required style={{width:'250px'}} type="text" pattern="[0-9]*" class="form-control" id="exampleFormControlInput1" placeholder="Price" name="price" value={this.state.price} onChange={(event) => this.handlerChange(event)}/>
                    </div>
                    <div>
                      <label >Description :</label>
                      <textarea required style={{width:'250px'}} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description Product" name="description" value={this.state.description} onChange={(event) => this.handlerChange(event)} ></textarea>
                    </div>
                    <label >Category :</label>
                    <Input style={{color:'black', width:'250px'}} type="select" ype="select" name="category" id="category" value={this.state.category} onChange={(event) => this.handlerChange(event)}>
                    <Input hidden name="id" value={this.state.idProduct}/>
                    {this.state.categories.map((item) => {
                      return(
                        <option key={item.id} value={item.id} >{item.name_category}</option>
                        )
                      })  
                    }

                    </Input>
                    <div className="form-group" style={{width:'250px'}}>
                      <label >Image :</label>
                      <input type="file" name="image"  />    
                      <small>Note : Pilih jika ingin merubah gambar</small>
                    </div>
                  </div>
                </div>
                <Button color="primary" type="submit">Save</Button>
                <Button color="secondary" onClick={this.toggleUpdate}>Cancel</Button>
              </form>
                
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </Modal>
        
      </>
    );
  }
}

export default Tables;
