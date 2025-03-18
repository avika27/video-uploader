import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VideoUploader from './components/VideoUploader';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import Logoutt from './components/Logoutt';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Button variant="contained" color="primary" href="/login" sx={{ marginBottom: 2 }}>
            Go to Login
          </Button>
          <Routes>
            <Route path='/' element={<Protected Component={VideoUploader} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logoutt' element={<Logoutt />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
