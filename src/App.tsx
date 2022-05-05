import { Routes, Route, Link } from "react-router-dom";
import CountryDetails from "./pages/CountryDetails";
import NotFound from "./pages/NotFound";
import styles from "./App.module.css";
import InputPage from "./pages/InputPage";

const myStyle={
  backgroundImage: "url(./types/bkgd.png)",
  height:'100vh',
  marginTop:'-70px',
  fontSize:'50px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

function App() {
  return (
    <div  style={myStyle}>
      <Link className={styles.header} to="/">
        Country Weather App
      </Link>
      <div className={styles.appContainer}>
        <Routes>
          <Route path="/" element={<InputPage/>} />
          <Route path="countryDetails" element={<CountryDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
