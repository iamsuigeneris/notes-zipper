
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import LandingPage from './components/screens/landingPage/LandingPage';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MyNotes from './components/screens/landingPage/myNotes/MyNotes';
import LoginScreen from './components/screens/login/LoginScreen';
import RegisterScreen from './components/screens/register/RegisterScreen';

const App = () => (
  <Router>
    <Header />
    <main>
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/mynotes" component={MyNotes} />
      
    </main>
  <Footer />
  </Router>
)

    
export default App;
