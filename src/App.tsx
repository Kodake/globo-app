import './App.css';
import Header from './components/Header';
import HouseList from './components/HouseList';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';

function App() {
  return (
    <Container className="container">
      <Header subtitle='Providing houses all over the world' />
      <HouseList />
    </Container>
  );
}

export default App;
