import React from './node_modules/react';
import { Container } from './node_modules/reactstrap';
import NavMenu from './NavMenu';


export default props => (
  <div>
    <NavMenu/>
    <Container>
      {props.children}
    </Container>

  </div>

);