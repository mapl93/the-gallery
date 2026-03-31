import { Routes, Route } from 'react-router-dom';
import DocsLayout from './components/DocsLayout';
import Home from './pages/Home';
import Foundations from './pages/Foundations';
import Tokens from './pages/Tokens';
import ComponentList from './pages/ComponentList';
import ComponentDetail from './pages/ComponentDetail';

export default function App() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route index element={<Home />} />
        <Route path="foundations" element={<Foundations />} />
        <Route path="tokens" element={<Tokens />} />
        <Route path="components" element={<ComponentList />} />
        <Route path="components/:slug" element={<ComponentDetail />} />
      </Route>
    </Routes>
  );
}
