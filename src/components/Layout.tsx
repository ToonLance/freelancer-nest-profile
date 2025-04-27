
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  withFooter?: boolean;
}

export function Layout({ children, withFooter = true }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      {withFooter && <Footer />}
    </div>
  );
}
