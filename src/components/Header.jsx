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

  // Fetch and update menu based on the user role
  useEffect(() => {
    if (userInfo) {
      setMenu(getMenu(userInfo.role)); // Update menu when user info changes
    } else {
      setMenu([]); // Clear menu when user is not logged in
    }
  }, [userInfo]);

  const logout = () => {
    deleteCookie('_USER_AUTH_'); // Clear the auth cookie
    setUserInfo(null); // Clear user info from context
    navigate('/'); // Redirect to home
    setMenu([]); // Clear menu
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Marco</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Render dynamic menu items based on user role */}
            {menu.map((item, index) => (
              <NavLink key={index} className="ms-2 nav-link" to={item.path}>
                {item.displayName}
              </NavLink>
            ))}

            {/* Conditionally render Logout button or Login button */}
            {userInfo ? (
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button variant="primary">
                <NavLink to="/login" className="text-white">
                  Login
                </NavLink>
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
