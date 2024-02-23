import Navbar from "./navbar";
import Footer from "./footer";

export default function DasboardLayout({
  children, // will be a page or nested layout
}) {
    return (
        <section>
            <Navbar />
            {/* Include shared UI here e.g. a header or sidebar */} 
            {children}
            <Footer />
        </section>
    );
}
