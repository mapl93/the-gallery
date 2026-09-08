import { Routes, Route } from 'react-router-dom';
import DocsLayout from './components/DocsLayout';
import Home from './pages/Home';
import Architecture from './pages/Architecture';
import Adapters from './pages/Adapters';
import Contracts from './pages/Contracts';
import Foundations from './pages/Foundations';
import Tokens from './pages/Tokens';
import ControlPilot from './pages/ControlPilot';
import ContactComposition from './pages/ContactComposition';
import ComponentList from './pages/ComponentList';
import ComponentDetail from './pages/ComponentDetail';

export default function App() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route index element={<Home />} />
        <Route path="architecture" element={<Architecture />} />
        <Route path="adapters" element={<Adapters />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="foundations" element={<Foundations />} />
        <Route path="foundations/control-pilot" element={<ControlPilot />} />
        <Route path="compositions/contact" element={<ContactComposition />} />
        <Route path="tokens" element={<Tokens />} />
        <Route path="components" element={<ComponentList />} />
        <Route path="components/:slug" element={<ComponentDetail />} />
      </Route>
    </Routes>
  );
}
