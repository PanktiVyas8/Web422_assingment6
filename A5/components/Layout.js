import { Container } from 'react-bootstrap';
import MainNav from './MainNav'; 

export default function Layout(props) {
  return (
    <>
    {/* nav bar */}
      <MainNav />     
      <br />
      <Container>  
        {/* content inside layout */}  
        {props.children} 
      </Container>
      <br />
    </>
  );
}
