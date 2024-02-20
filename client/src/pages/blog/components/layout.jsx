// IMPORT COMPONENTS
import Navbar from "./navbar";

export default function BlogLayout({
    children, // will be a page or nested layout
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <Navbar />

            <div className="mt-8 mt-8 mx-32">
                {children}
            </div>
        </section>
    );
}
