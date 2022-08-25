import './App.css';
import Header from './components/Header';
import HouseList from './components/HouseList';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HouseDetail from './components/HouseDetail';
import HouseAdd from './components/HouseAdd';
import HouseEdit from './components/HouseEdit';
import useFetchUser from './hooks/useUsers';

function App() {
  const { isSuccess } = useFetchUser();

  return (
    <BrowserRouter>
      <Container className='container'>
      {!isSuccess && <a href='/account/login'>Login</a>}
        <Header subtitle='Providing houses all over the world' />
        <Routes>
          <Route path='/' element={<HouseList />}></Route>
          <Route path='/house/:id' element={<HouseDetail />}></Route>
          <Route path='/house/add' element={<HouseAdd />}></Route>
          <Route path='/house/edit/:id' element={<HouseEdit />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
