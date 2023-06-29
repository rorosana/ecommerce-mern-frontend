import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navigation from "./components/Navigation"
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route index element={<Home /> }/>
        <Route path="*" element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
