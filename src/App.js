import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Attendees from './Components/AttendeesComponent';
import Events from './Components/EventComponent';
import Registrations from './Components/RegistrationComponent';;

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Attendees</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registrations">Registrations</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container d-flex justify-content-center">
          <div className="col-md-8">
            <Routes>
              <Route path="/" element={<Attendees />} />
              <Route path="/events" element={<Events />} />
              <Route path="/registrations" element={<Registrations />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
