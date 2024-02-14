// IMPORT COMPONENTS
import Navbar from './navbar';

const Layout = ({ children }) => (
  <div>
    <Navbar /> {/* Include the Navbar component */}
    {children}
  </div>
);

export default Layout;
