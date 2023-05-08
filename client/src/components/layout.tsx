
import React from 'react';
import Navbar from './navbar';

 export interface LayoutProps {
children: React.ReactNode;
}



const Layout = ({ children }: LayoutProps):any => {
  return (
    <div>
      <Navbar />
      <div className='container'>{children}</div>
    </div>
  );
};

export default Layout;






