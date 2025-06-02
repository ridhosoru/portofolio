import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      
      <body className={`bg-black h-full w-full`}>
        <div className="lg:w-3/4 lg:min-h-screen lg:flex-row flex flex-col w-full min-h-screen bg-black mx-auto">
          {<Navbar/>}
          <div className="lg:w-5/6 flex flex-1 lg:outline lg:outline-gray-500 lg:outline-1 w-full h-full">
          {children}
          </div>
        </div>
      </body>
    </html>
  );
}
