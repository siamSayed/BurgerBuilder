import React,{Component}from "react"
import {Link} from "react-router-dom"




import {Navbar,NavbarToggler,NavbarBrand,Collapse} from "reactstrap"
class Header extends Component{
  state={
    clickedNav:false
  }
  onclickChange=()=>{
    this.setState({clickedNav : ! this.state.clickedNav})
  }
  
   render(){

    return(
        
        <div>
  <Navbar
    color="light"
    expand="md"
    light
  >
    
    <NavbarBrand href="/">
      MangaBD
    </NavbarBrand>
    <NavbarToggler onClick={this.onclickChange} />
    <Collapse navbar isOpen={this.state.clickedNav}>
      <Link to="/"> <div className="item"onClick={this.onclickChange}>Home</div></Link>
      <Link to="/products"><div className="item"onClick={this.onclickChange}>Products</div></Link>
      <Link to="/blogs"><div className="item"onClick={this.onclickChange}>Blogs</div></Link>
      <Link to="/about"><div className="item"onClick={this.onclickChange}>About</div></Link>
      <Link to="signin-login"><div className="item"onClick={this.onclickChange}>SignIn/LogIn</div></Link>
      <Link to="/contact-us"><div className="item"onClick={this.onclickChange}>Contact Us</div></Link>
    </Collapse>
    
  </Navbar>
</div>
        
    )
   }
}
export default Header