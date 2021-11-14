import './App.css';
import Create from './components/Create';
import View from './components/View';
import Edit from './components/Edit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './components/List';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
