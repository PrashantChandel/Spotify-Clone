import { Routes, Route } from 'react-router-dom';
import './App.css';
// import Authorize from './Authorize';
import Search from './Search';
import Tracks from './Tracks';
import Albums from './Albums';
import Authorizeclass from './Authorizeclass';


function App() {

  // let token = window.localStorage.getItem("token");
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App_title'> Spotify Artist Search</h1>
        <Routes >
          <Route exact path="/" element={<> <Authorizeclass /> <Search /></>} />
          <Route exact path="/albums" element={<Albums />} />
          <Route exact path="/albums/tracks" element={<Tracks />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
