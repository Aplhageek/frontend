import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Explore from './Components/Explore/Explore';
import ListingDetailsPage from './Components/ListingDetailsPage.js/ListingDetailsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />

        {/* Explore Page */}
        <Route path="/listings" element={<Explore />} />
        {/* Listing details page */}
        <Route path="/details/:property_id" element={<ListingDetailsPage/> }/>
      </Routes>

    </div>
  );
}

export default App;
