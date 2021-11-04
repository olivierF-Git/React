import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';


export default class IssueRow extends Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    this.props.deleteIssue(this.props.issue.id);
  }

  render() {
    // On récupère l'attribut issue dans les props histoire de factoriser
    const {issue} = this.props;
    if(!issue){
      return(<tr></tr>)
    }
    return (
      <tr>
        <td><Link to={`/issues/${issue.id}`}>{issue.id}</Link></td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
        <td>{issue.title}</td>
        <td>
          <Button bssize="xsmall" onClick={this.onDeleteClick}>Delete</Button>
        </td>
      </tr>
    );
  }
}

IssueRow.propTypes = {
  issue: PropTypes.object.isRequired,
  deleteIssue: PropTypes.func.isRequired,
};
