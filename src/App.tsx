import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/common/Header';
import Carousel from './components/Corousel';
import Sections from './components/Sections';
import Footer from './components/Footer';
import Categories from './components/Categories';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Categories />
          <Carousel />
          <Sections />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const Home: React.FC = () => <div>Welcome to the Home Page!</div>;
const About: React.FC = () => <div>About Us</div>;
const Contact: React.FC = () => <div>Contact Information</div>;

export default App;
