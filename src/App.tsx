// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeView } from './pages/HomeView';
import { DetailView } from './pages/DetailView';
import { NotFoundView } from './pages/NotFoundView';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/criptomonedas/:id" element={<DetailView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;