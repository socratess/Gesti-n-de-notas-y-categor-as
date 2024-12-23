import {Nav, Navbar, Container} from 'react-bootstrap'
import {Link, useLocation} from 'react-router-dom';



function AppNavbar() {

    const location = useLocation();
    
      return (
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container className="mt-3">
            <Navbar.Brand as={Link} to="/">Notes</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/active" className={location.pathname === "/note" ? "active":""}>Active Notes</Nav.Link>
                <Nav.Link as={Link} to="/inactive" className={location.pathname === "/note" ? "active":""}>Inactive Notes</Nav.Link>
                <Nav.Link as={Link} to="/categories" className={location.pathname === "/categories" ? "active":""}>Categories</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    
    export default AppNavbar;

  