import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Home from './Pages/Home';
import LoginSignup from "./Pages/LoginSignup";
import NotFound from "./Pages/NotFound";
import Teesheet from "./Pages/Teesheet";
import Layout from "./components/Layout";
import Checkout from "./Pages/Checkout";
import { LoginProvider } from "./context/LoginContext";
import Account from "./Pages/Account";
import Reserve from "./Pages/Reserve";

export default function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginSignup />} />
            <Route path="book" element={<Teesheet />} />
            <Route path="reserve" element={<Reserve />}/>
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginProvider>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
