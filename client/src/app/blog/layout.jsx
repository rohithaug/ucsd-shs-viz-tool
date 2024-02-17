// IMPORT COMPONENTS
import Navbar from "./components/navbar";

// IMPORT STYLES
import '../../styles/globals.css';

export default function BlogLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar />
 
      {children}
    </section>
  );
}
