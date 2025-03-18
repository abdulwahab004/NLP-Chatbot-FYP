import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
  return (
    <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/dashboard">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/dashboard">Chat with Us</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;


