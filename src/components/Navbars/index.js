import React from 'react';
import { Link } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from 'reactstrap';
import { connect } from 'react-redux';
import { DestroyUser } from 'actions/index';

class NavbarGlobal extends React.Component {
  componentDidMount() {
    const headroom = new Headroom(document.getElementById('navbar-main'));
    // initialise
    headroom.init();
  }

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            // className="navbar-main navbar-transparent navbar-light headroom"
            className="navbar-dark"
            expand="lg"
            id="navbar-main"
            style={{ backgroundColor: '#0B7B52' }}
          >
            <Container>
              <NavbarBrand
                className="mr-lg-5"
                to="/"
                tag={Link}
                style={{ fontSize: '1.5rem' }}
              >
                <img
                  alt="..."
                  src={require('asset/image/logo.png')}
                  style={{ margin: '5%' }}
                />
                Billy
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <p
                  style={{
                    display: 'inline',
                    marginRight: '0.7em',
                    fontSize: '20px'
                  }}
                >
                  {`สวัสดี ${
                    this.props.username ? this.props.username : 'User'
                  }`}
                </p>
                <span className="">
                  <i className="fas fa-cog"></i>
                </span>
              </button>
              <UncontrolledCollapse
                navbar
                toggler="#navbar_global"
                style={{ position: 'relative', zIndex: 9999 }}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        {/* <img
                          alt="..."
                          //   src={require('assets/img/brand/argon-react.png')}
                        /> */}
                        Billy
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <Link to="#">
                      <NavLink className="nav-link-icon" id="tooltip112445449">
                        <i className="fas fa-cog"></i>
                        <span className="nav-link-inner--text d-lg-none ml-2">
                          Setting
                        </span>
                      </NavLink>
                    </Link>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      Setting
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <Link to="#">
                      <NavLink className="nav-link-icon" id="tooltip112445449">
                        <i className="fas fa-user"></i>
                        <span
                          className="nav-link-inner--text d-lg-none ml-2"
                          style={{ fontWeight: 'bold' }}
                        >
                          {this.props.username ? this.props.username : 'User'}
                        </span>
                      </NavLink>
                    </Link>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      User
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      id="tooltip112445449"
                      onClick={e => this.props.DestroyUser()}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Logout
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      Logout
                    </UncontrolledTooltip>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
        {this.props.children}
      </>
    );
  }
}
const mapStateToprops = state => {
  return { username: state.auth.username };
};
export default connect(mapStateToprops, { DestroyUser })(NavbarGlobal);
