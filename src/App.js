import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";

function App(props) {
    return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
