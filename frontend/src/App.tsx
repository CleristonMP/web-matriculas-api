import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Admin from "pages/Admin";
import "./assets/styles/custom.scss";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Admin />
      </main>
      <Footer />
    </>
  );
}

export default App;
