import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FaUser } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import campLogo from '../src/img/campLogo.jpg';

function CampNav() {
    const { logout, token } = useToken();
    const { fetchWithCookie } = useToken();
    const [accountData, setAccountData] = useState("");
    const [account_id, setAccountId] = useState(null);

    const getAccountData = async () => {
        const accountData = await fetchWithCookie(`${process.env.REACT_APP_API_HOST}/token`);
        setAccountData(accountData.account);
        setAccountId(accountData.account.id);
    };

    useEffect(() => {
        if (token) {
        getAccountData();
        }
    }, [token]);

    const profileURL = `/profile/${account_id}`;

    return (
      <Navbar bg="white" data-bs-theme="dark" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
                src={campLogo}
                alt="Your Alt Text"
                width="75px"
                height="45px"
                className="d-inline-block align-top"
            />{' '}
            </Navbar.Brand>
          <Navbar.Brand href="/" className="Title">
            Home
          </Navbar.Brand>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {!token && (
                <Nav.Link href="/login">
                  <Button
                    style={{ backgroundColor: "#464F2E", color: "white" }}
                  >
                    LogIn
                  </Button>
                </Nav.Link>
              )}

              {token && (
                <Nav.Link href="/">
                  <Button
                    style={{ backgroundColor: "#464F2E", color: "white" }}
                    variant="success"
                    onClick={logout}
                  >
                    LogOut
                  </Button>
                </Nav.Link>
              )}
              {!token && (
                <Nav.Link href="/signup">
                  <Button
                    style={{ backgroundColor: "#464F2E", color: "white" }}
                  >
                    SignUp
                  </Button>
                </Nav.Link>
              )}
            </Nav>

            <NavLink href={profileURL} className="profile button">
              {token && (
                <FaUser
                  style={{ color: "#464F2E", fontSize: "30px", margin: "15px" }}
                />
              )}
            </NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default CampNav;
