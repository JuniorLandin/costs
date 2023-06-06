import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Container from './componentes/layout/Container';
import Company from './componentes/pages/Company';
import Contact from './componentes/pages/Contact';
import Home from './componentes/pages/Home';
import NewProject from './componentes/pages/NewProject';
import Footer from './componentes/layout/Footer'
import Navbar from './componentes/layout/Navbar';
import Projects from './componentes/pages/Projects';
import Project from './componentes/pages/Project';

function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass='min-height'>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/projects' element={<Projects/>}/>
            <Route path='/company' element={<Company/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/newproject' element={<NewProject/>}/>
            <Route path='/project/:id' element={<Project/>}/>
          </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
