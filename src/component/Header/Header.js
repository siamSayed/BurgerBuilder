import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Header.css"
import { connect } from "react-redux"
import { Navbar, NavbarToggler, NavbarBrand, Collapse } from "reactstrap"


const mapStateToProps = (state) => {
  return {
    idToken: state.idToken,
    localId: state.localId
  }
}
class Header extends Component {
  state = {
    clickedNav: false
  }
  onclickChange = () => {
    this.setState({ clickedNav: !this.state.clickedNav })
  }

  render() {

    return (

      <div className="navigationBar">
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
            {this.props.idToken && this.props.localId ?
              <>
                <Link to="/"> <div className="item" onClick={this.onclickChange}>BurgerBuilder</div></Link>
                <Link to="/order"><div className="item" onClick={this.onclickChange}>Order</div></Link>
                <Link to="/checkout"><div className="item" onClick={this.onclickChange}>Checkout</div></Link>
                <Link to="/logout"><div className="item" onClick={this.onclickChange}>Logout</div></Link>
              </>
              : null}

            {!this.props.idToken && !this.props.localId ? <Link to="/login-signup"><div className="item" onClick={this.onclickChange}>LogIn/SignUp</div></Link> : null}
          </Collapse>

        </Navbar>
      </div>

    )
  }
}
export default connect(mapStateToProps)(Header)