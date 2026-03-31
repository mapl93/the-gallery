import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';

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

      <main className="docs-main" ref={mainRef}>
        <Outlet />
      </main>
    </div>
  );
}
