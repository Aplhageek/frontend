import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Explore from './Components/Explore/Explore';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />

        {/* Explore Page */}

        <Route path="/listings" element={<Explore />} />
        {/* Listing details page */}
      </Routes>

    </div>
  );
}

export default App;
