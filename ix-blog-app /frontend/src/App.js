import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="container-fluid justify-content-end">
            <div className="d-flex">
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link" href="./">Option 1</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./">Option 2</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./">Option 3</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./">Option 4</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;