import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class IssueAdd extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log('==> soumission du formulaire')
    e.preventDefault();
    var form = document.forms.issueAdd;
    console.log("issue add :",this.props);
    this.props.createIssue(
      {
        owner: form.owner.value,
        title: form.title.value,
        status: 'NEW',
        created: new Date()
      }
    );
    // clear the form for the next input
    form.owner.value = "";
    form.title.value = "";
  }


  render() {
    return (
      <Form name="issueAdd" onSubmit={this.handleSubmit}>
        <Form.Control name="owner" placeholder="Owner" />
        {' '}
        <Form.Control name="title" placeholder="Title" />
        {' '}
        <Button type="submit" bsstyle="primary">Add</Button>
      </Form>
    )
  }
}

IssueAdd.propTypes = {
  createIssue: PropTypes.func.isRequired,
};
