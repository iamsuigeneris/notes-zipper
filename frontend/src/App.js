import {useState} from 'react'
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import LandingPage from './components/screens/landingPage/LandingPage';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MyNotes from './components/screens/landingPage/myNotes/MyNotes';
import LoginScreen from './components/screens/login/LoginScreen';
import RegisterScreen from './components/screens/register/RegisterScreen';
import CreateNote  from './components/screens/singlenote/CreateNote'
import SingleNote  from './components/screens/singlenote/SingleNote'
import ProfileScreen from './components/screens/profile/ProfileScreen';

const App = () => {
  const [search, setSearch] = useState("")
  return (
    <Router>
      <Header setSearch={setSearch} />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/createnote" component={CreateNote} />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/mynotes" component={() => <MyNotes search={ search } />} />
      
      </main>
      <Footer />
    </Router>
  )
}
    
export default App;
