import React from 'react';
import { Container } from 'reactstrap';
// import NavMenu from './NavMenu';
import NavigMenu from './NavigMenu';
import Footer from './Footer';

export default props => (
  <div>
    <NavigMenu/>
    <Container>
      {props.children}
    </Container>
    <Footer/>
  </div>

);







