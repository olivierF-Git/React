import PropTypes from 'prop-types';
import React from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


import IssueList from './IssueList.js';
import IssueEdit from './IssueEdit.js';

const NoMatch = () => <p>Page Not Found</p>;

const Header = () => (
  //  <Navbar fluid>
  //    <Navbar.Header>
  //      <Navbar.Brand>Issue Tracker</Navbar.Brand>
  //    </Navbar.Header>
  //    <Nav>
  //      <LinkContainer to="/issues">
  //        <NavItem>Issues</NavItem>
  //      </LinkContainer>
  //      <LinkContainer to="/reports">
  //        <NavItem>Reports</NavItem>
  //      </LinkContainer>
  //    </Nav>
  //    <Nav pullRight>
  //      <NavItem><Glyphicon glyph="plus" /> Create Issue</NavItem>
  //      <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
  //        <MenuItem>Logout</MenuItem>
  //      </NavDropdown>
  //    </Nav>
  //  </Navbar>
  <div>
    <Link to="/issues">Issues</Link>;
    <Link to="/reports">Reports</Link>
  </div>
);

const App = (props) => (
  <div>
    <Header />
    <div className="container-fluid">
      {props.children}
      <hr />
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

const RoutedApp = () => (
  <Router >
    <Redirect from="/" to="/issues" />
    <Switch>
      <Route path="/issues" component={withRouter(IssueList)} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </Router>
);

render(<RoutedApp />, document.getElementById('root'));    // Render the component inside the root Node
