import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    let userData = [];
    setIsLoading(true);

    try {
      const response = await fetch("https://randomuser.me/api?results=20");
      userData = await response.json();

      setUsers(userData.results)
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  const renderUsers = () => {
    return users.map((user, index) => <tr key={user.email}>
      <td>{index + 1}</td>
      <td>{user.name.first} {user.name.last}</td>
      <td>{user.gender}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <img src={user.picture.thumbnail} alt={user.name.first} />
      </td>
    </tr>)
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <div className="header-text">
        <h2>
          Random Users
        </h2>
        <button onClick={fetchUsers}>
          Reload
        </button>
      </div>

      <table border={1} >
        <thead>
          <tr>
            <td><strong>#</strong></td>
            <td><strong>Name</strong></td>
            <td><strong>Gender</strong></td>
            <td><strong>Email</strong></td>
            <td><strong>Phone</strong></td>
            <td><strong>Photo</strong></td>
          </tr>
        </thead>
        <tbody>
          {!isLoading && renderUsers()}
        </tbody>
      </table>

      {isLoading && <div>
        Loading...
      </div>}

      <small>
        API used: <a href="https://randomuser.me/api?results=20" target="_blank">https://randomuser.me/api?results=20</a>
      </small>
    </div>
  );
}

export default App;
