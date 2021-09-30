import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";

const users = [
  {
    id: 1,
    name: "Param",
    description:
        "Guy who writes lorem ipsum all the time when he needs content placeholder",
    tabs: [
      {
        name: "personal",
        content: {
          firstname: "Param",
          lastname: "Harrison"
        }
      },
      {
        name: "employer",
        content: {
          name: "Jobbatical",
          city: "Tallinn, Estonia"
        }
      }
    ]
  },
  {
    id: 2,
    name: "Miguel",
    description:
        "the best guy doing deployment in his own clusters of kubernetes world",
    tabs: [
      {
        name: "personal",
        content: {
          firstname: "Miguel",
          lastname: "Medina"
        }
      },
      {
        name: "employer",
        content: {
          name: "Skype",
          city: "Arizona, US"
        }
      },
      {
        name: "other",
        content: {
          country: "Mexico",
          age: 30
        }
      }
    ]
  }
];

function TabPage({match}) {
  const {params: {userName, tabName}} = match;
  const tab = users.find(user => user.name === userName).
              tabs.find(tab => tab.name ===tabName);

  return (
      <div>
        Tab Name: <strong>{tab.name}</strong>
        <h5>Tab content: </h5>
        {Object.keys(tab.content).map((key, index) =>
            <li key={index}>
              <span>{key} : </span>
              {<strong>{tab.content[key]}</strong>}
            </li>
        )}
      </div>
  );
}

function UserPage({match}) {
  const userName = match.params.userName;
  const user = users.find(user => user.name === userName);

  return (
      <div>
        User Name: <strong>{user.name}</strong>
        <p>{user.description}</p>
        <p>Dyanmic nested route</p>
        <ul className="list">
          {user.tabs.map( tab =>
              <li key={tab.name}>
                <NavLink to={`${match.url}/tab/${tab.name}`}>{tab.name}</NavLink>
              </li>
          )}
        </ul>
        <Route path={`${match.path}/tab/:tabName`} component={TabPage}></Route>
      </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <h3>Top level routes</h3>
        <ul className="list">
          {users.map( user =>
            <li key={user.id}>
              <NavLink to={`/user/${user.name}`} activeClassName="active">{user.name}</NavLink>
            </li>
          )}
        </ul>
          <Route path="/user/:userName" component={UserPage}></Route>
      </Router>
    </div>
  );
}

export default App;

