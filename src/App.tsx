import './App.css';
import Header from './components/Header';
import HouseList from './components/HouseList';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
      <Header subtitle='Providing houses all over the world' />
      <HouseList />
    </div>
  );
}

export default App;
