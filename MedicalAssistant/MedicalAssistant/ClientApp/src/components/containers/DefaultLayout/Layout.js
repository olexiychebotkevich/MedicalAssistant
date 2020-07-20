import React from 'react';
import { Container } from 'reactstrap';
import Footer from '../../Footer';
import NavMenu from './NavMenu';


export default props => (
  <div>
    <NavMenu/>
    <Container>
      {props.children}
    </Container>
   {/* <Footer/>  */}

  </div>

);