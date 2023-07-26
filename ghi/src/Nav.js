import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function CampNav() {
    return (
        <Navbar bg="white" data-bs-theme="dark" >
            <Container fluid>
                <img
                alt=""
                src='/img/camplogo.png'
                width="30"
                height="30"
                className="d-inline-block align-top"
                />
            <Navbar.Brand href="/"className="Title">Camp Scout</Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/login">
                    <Button style={{ backgroundColor: "#464F2E", color: "white" }}>LogIn</Button>
                </Nav.Link>
                <Nav.Link href="/logout">
                    <Button variant="outline-success">LogOut </Button>
                </Nav.Link>
                <Nav.Link href="/signup">
                    <Button style={{ backgroundColor: "#464F2E", color: "white" }}>SignUp </Button>
                </Nav.Link>
                </Nav>

                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CampNav;
