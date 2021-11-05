import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Popup from 'reactjs-popup';

import { Table, Form } from 'react-bootstrap';

//import 'reactjs-popup/dist/index.css';

//import mockupIssues from '../mockups/issues';

import IssueRow from './IssueRow.js';
import IssueAdd from './IssueAdd.js';
/**
 * TODO LIST
 * 05/11/21
 * Importer issue filter et corriger les erreurs
 */
import IssueFilter from './IssueFilter.js';



// Un composant plus classique avec un return,
// indispensable lorsque la fonction comprend plus d'une instruction
function IssueTable(props) {
  const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} deleteIssue={props.deleteIssue} />)
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </Table>
  );
}

IssueTable.propTypes = {
  issues: PropTypes.array.isRequired,
  deleteIssue: PropTypes.func.isRequired,
};

function ShowPopup(props) {
  return (
    <Popup trigger={<button> Create Issue</button>} position="right center">
      <IssueAdd createIssue={props.createIssue} />
    </Popup>
  );
}

ShowPopup.propTypes = {
  createIssue: PropTypes.func.isRequired,
};

export default class IssueList extends Component {
  // On définit le state dans le constructeur
  constructor() {
    super();
    // l'état initial est un tableau d'issues vide
    this.state = {
      issues: [],
      toastVisible: false, toastMessage: '', toastType: 'success',
    };
    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  // Méthode appelée lorsque la page est rechargée
  componentDidMount() {
    this.loadData();
  }

  // Méthode appelée lorsqu'une propriété du composant change
  // React Router parse la query string dans l'url et la rend disponible
  // au composant dans une propriété nommée 'location'
  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location;
    const newQuery = this.props.location;
    if (oldQuery.state === newQuery.state
      && oldQuery.effort_gte === newQuery.effort_gte
      && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }

  // Chargement des données
  loadData() {
    // on récupère les 'issues' depuis le backend
    console.log('Loading data from : ' + `/api/issues${this.props.location.search}`);
    fetch(`/api/issues${this.props.location.search}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("Nb d'enregistrements:", data._metadata.total_count);
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) {
              issue.completionDate = new Date(issue.completionDate);
            }
          });
          // le nouveau state contient les enregistrements récupérés
          console.log(data.records);
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(error => {
          this.showError(`Failed to fetch issues ${error.message}`);
        });
      }
    }).catch(err => {
      this.showError(`Error in fetching data from server: ${err}`);
      //this.setState({ issues: mockupIssues });
    });
  }

  // Création et envoi au serveur d'une nouvelle 'issue'
  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIssue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          // le state est immuable, on utilise la fonction concat qui retourne
          // une copie de la liste à laquelle on ajoute un élément
          const newIssues = this.state.issues.concat(updatedIssue);
          this.setState({
            issues: newIssues
          });
        });
      } else {
        response.json().then(error => {
          alert("Failed to add issue: " + error.message)
        });
      }
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  }

  // la méthode setFilter prend en paramètre un objet query du type : { status: 'Open' }
  // on utilise la méthode push du router pour changer la query string en conservant le
  // pathname
  setFilter(query) {
    this.props.router.push({ pathname: this.props.location.pathname, query });
  }

  deleteIssue(id) {
    fetch(`/api/issues/${id}`, {
      method: 'DELETE'
    }).then(response => {
      if (!response.ok) {
        alert('Failed to delete issue');
      } else {
        this.loadData();
      }
    });
  }


  render() {
    return (
      <div>
        {
          <Form>
            <IssueFilter setFilter={this.setFilter} initFilter={this.props}/>
          </Form>
        }
        <hr />
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
        <hr />
        <ShowPopup createIssue={this.createIssue} />
      </div>
    );
  }
}

IssueList.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
};
