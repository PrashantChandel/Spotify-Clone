import { Routes, Route } from 'react-router-dom';
import './App.css';
// import Authorize from './Authorize';
import Search from './Search';
import Tracks from './Tracks';
import Albums from './Albums';
import Authorizeclass from './Authorizeclass';
import Navbar from './Navbar';
import Users from './Users.jsx'
import Favourites from './Favourites';
import { useEffect } from 'react';
import { useState } from 'react';



function App() {
  const [token, setToken] = useState();
  const temp = window.localStorage.getItem('token')

  useEffect(() => {
    setToken(temp)
  }, [temp])


  return (



    < div className="App" >
      <header className="App-header">
        <h1 className='App_title'> Spotify Artist Search</h1>
        {token ? <Navbar /> : null}
        <Routes >
          <Route exact path="/" element={<> <Authorizeclass /> <Search /></>} />
          <Route exact path="/albums" element={<Albums />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/albums/tracks" element={<Tracks />} />
          <Route exact path="/Favourites" element={<Favourites />} />


        </Routes>
      </header>
    </div >
  );
}

export default App;
