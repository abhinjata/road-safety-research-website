import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Home from './pages/Home';
import Journey from './pages/Journey';
import AboutUs from './pages/AboutUs';
import Prototype from './pages/Prototype';
import ClickSpark from './components/reactbits/ClickSpark';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/prototype" element={<Prototype />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ClickSpark>
      <BrowserRouter>
        <Nav />
        <AnimatedRoutes />
      </BrowserRouter>
    </ClickSpark>
  );
}
