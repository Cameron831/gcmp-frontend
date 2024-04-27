import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Home from './Pages/Home';
import LoginSignup from "./Pages/LoginSignup";
import NotFound from "./Pages/NotFound";
import Teesheet from "./Pages/Teesheet";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<LoginSignup />}/>
          <Route path="*" element={<NotFound />} /> 
          <Route path="book" element={<Teesheet />} />
          {/*         
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> 
          */}
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
