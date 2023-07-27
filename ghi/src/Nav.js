
import { Button, Container, Form, Nav, Navbar, NavLink } from "react-bootstrap";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FaUser } from "react-icons/fa";
import { PiCampfireBold } from "react-icons/pi";
import React, { useState, useEffect } from "react";

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

    const profileURL = `http://localhost:3000/profile/${account_id}`;

    return (
        <Navbar expand="lg" className="bg-white">
            <Container fluid>
            <Navbar.Brand href="/" className="logo">
                <PiCampfireBold style={{color: 'rgb(190, 84, 13)', fontSize: '40px'}}/>
            </Navbar.Brand>
            <Navbar.Brand href="/" className="Title">
                Camp Scout
            </Navbar.Brand>

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                {!token && (
                    <Nav.Link href="/login">
                    <Button style={{ backgroundColor: "#464F2E", color: "white" }}>LogIn</Button>
                    </Nav.Link>
                )}

                {token && (
                    <Nav.Link href="/">
                    <Button variant="success" onClick={logout}>
                        LogOut{" "}
                    </Button>
                    </Nav.Link>
                )}
                {!token && (
                    <Nav.Link href="/signup">
                    <Button style={{ backgroundColor: "#464F2E", color: "white" }}>SignUp </Button>
                    </Nav.Link>
                )}
                </Nav>

                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="success">Search</Button>
                </Form>
                <NavLink href={profileURL} className="profile button">
                {token && <FaUser style={{color: 'rgb(190, 84, 13)', fontSize: '30px', margin: '10px'}}/>}
                </NavLink>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CampNav;
