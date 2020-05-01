import React from './node_modules/react';
import { Container } from './node_modules/reactstrap';
import Footer from '../../Footer';
import NavMenu from './NavMenu';


export default props => (
  <div>
    <NavMenu/>
    <Container>
      {props.children}
    </Container>
     <Footer/> 

  </div>

);