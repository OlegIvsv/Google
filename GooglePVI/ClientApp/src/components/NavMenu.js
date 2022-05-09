import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import SearchLine from '../myComponents/SearchLine.js';
import Logo from '../myComponents/Logo.js';


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container fluid>
            <NavbarBrand tag={Link} to="/">
              <Logo/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem className="mx-4">
                  <NavLink tag={Link} className="text-dark" to="/">
                    <i class="bi bi-gear display-6"></i>
                  </NavLink>
                </NavItem>
                <NavItem className="mx-4">
                  <NavLink tag={Link} className="text-dark" to="/accountsetting">
                    <i class="bi bi-person-square display-6"></i>
                  </NavLink>
                </NavItem>
                <NavItem className="mx-4">
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">
                    <i class="bi bi-search-heart display-6"></i>
                  </NavLink>
                </NavItem>
                <NavItem className="mx-4">
                  <NavLink className="text-dark" href='https://github.com/OlegIvsv/GooglePVI'  target="_blank">
                    <i class="bi bi-github display-6"></i>
                  </NavLink>
                </NavItem>
                <NavItem className="mx-4">
                  <NavLink className="text-dark" href='/add-data'>
                    <i class="bi bi-plus-square-dotted display-6"></i>
                  </NavLink>
                </NavItem>
                <NavItem className="mx-4">
                  <NavLink className="text-dark" href='/add-user'>
                  <i class="bi bi-person-plus-fill display-6"></i>
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

<i class="bi bi-person-plus-fill"></i>