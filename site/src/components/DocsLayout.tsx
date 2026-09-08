import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import ThemeControl from './ThemeControl';

export default function DocsLayout() {
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
    document.title = 'The Gallery Design System';
  }, [location.pathname]);

  return (
    <div className="docs-layout">
      <Sidebar />
      <ThemeControl />

      <main className="docs-main" ref={mainRef}>
        <Outlet />
      </main>
    </div>
  );
}
