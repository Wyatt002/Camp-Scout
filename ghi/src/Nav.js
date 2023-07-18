import logo from "./img/camplogo.png";
import {Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FaUser } from "react-icons/fa";

function CampNav() {
    const { logout, token } = useToken();


    return (
        <Navbar expand="lg" className="bg-white">
            <Container fluid>
            <Navbar.Brand href="/" className="logo">
                <img
                alt=""
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                href="/"
                />
            </Navbar.Brand>
            <Navbar.Brand href="/" className="Title">
                Camp Scout
            </Navbar.Brand>

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                {!token && (
                    <Nav.Link href="/login">
                    <Button variant="success">LogIn </Button>
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
                    <Button variant="success">SignUp </Button>
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
                <Navbar.Brand href="/profile" className="profile button">
                {token && <FaUser style={{color: 'rgb(190, 84, 13)', fontSize: '30px', margin: '10px'}}/>}
                </Navbar.Brand>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CampNav;
