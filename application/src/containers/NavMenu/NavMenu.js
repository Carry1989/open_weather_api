import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';
import TreamsLogo from '../../assets/logo_treams.png';

export class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white mb-3 box-shadow" color="light" light expand="lg">
                    <Container>
                        <NavbarBrand to="/">
                            <img src={TreamsLogo} className="logo" alt="Treams Logo" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink exact className="inactive" activeClassName="active" to="/">Dashboard</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="inactive" activeClassName="active" to="/settings">Settings</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
