import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddCheytam from "./components/AddBook";
import CheytamsList from "./components/BookList";
import "./App.css";

function App() {
  const [cheytamId, setCheytamId] = useState("");

  const getCheytamIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setCheytamId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Cheytam - Admin</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddCheytam id={cheytamId} setCheytamId={setCheytamId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <CheytamsList getCheytamId={getCheytamIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;