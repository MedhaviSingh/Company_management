import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { deleteCookie } from '../utils/common';
import { useEffect, useState } from 'react';
import { getMenu } from '../utils/menu';

function Header() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUser();
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    if (userInfo) {
      setMenu(getMenu(userInfo.role)); 
    } else {
      setMenu([]); 
    }
  }, [userInfo]);

  const logout = () => {
    deleteCookie('_USER_AUTH_'); 
    setUserInfo(null); 
    navigate('/'); 
    setMenu([]); 
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {menu.map((item, index) => (
              <NavLink key={index} className="ms-2 nav-link" to={item.path}>
                {item.displayName}
              </NavLink>
            ))}
            {userInfo && (
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
