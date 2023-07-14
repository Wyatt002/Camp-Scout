import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./img/camplogo.png";
import usericon from "./img/usericon.png"
import useToken from "@galvanize-inc/jwtdown-for-react";


function CampNav() {
    const { logout, token } = useToken();


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <img
                alt=""
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                href="/"
                />
            <Navbar.Brand href="/"className="Title">Camp Scout</Navbar.Brand>

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                { !token && (
                <Nav.Link href="/login">
                    <Button variant="success">LogIn </Button>
                </Nav.Link>
                )}

                { token && (
                <Nav.Link href="/">
                    <Button variant="success"onClick={logout}>LogOut </Button>
                </Nav.Link>
                )}
                { !token && (
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
                { token && (
                <img
                alt=""
                src={usericon}
                width="40"
                height="40"
                className="d-inline-block align-top"
                />
                )}
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CampNav;
