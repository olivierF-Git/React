import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Container } from 'react-bootstrap';

import IssueList from './IssueList.js';
import IssueEdit from './IssueEdit.js';

import IssueAdd from './IssueAdd.js';

const NoMatch = () => <p>Page Not Found</p>;


const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Issue Tracker</Navbar.Brand>
      </Container>
      <Nav>
        <Link to="/issues">
          <Nav.Item>Issues</Nav.Item>
        </Link>
        <Link to="/reports">
          <Nav.Item>Reports</Nav.Item>
        </Link>
      </Nav>
      <Nav align="end">
        <Nav.Item>
           Create Issue
        </Nav.Item>
        <NavDropdown id="user-dropdown">
          <MenuItem>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
};

const App = (props) => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        {props.children}
        <hr />
      </div>
    </div>
  )


};

App.propTypes = {
  children: PropTypes.object.isRequired,
};

const RoutedApp = () => (
  <Router >
    <Redirect from="/" to="/issues" />
    <Route path="/" component={App} />
    <Switch>
      <Route path="/issues" component={IssueList} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </Router>
);

render(<RoutedApp />, document.getElementById('root'));    // Render the component inside the root Node
