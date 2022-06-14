import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import CheytamDataService from "../services/cheytam.services";

const AddCheytam = ({ id, setCheytamId }) => {
  const [title, setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || description === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newCheytam = {
      title,
      description,
      status,
    };
    console.log(newCheytam);

    try {
      if (id !== undefined && id !== "") {
        await CheytamDataService.updateCheytam(id, newCheytam);
        setCheytamId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await CheytamDataService.addCheytam(newCheytam);
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setDescription("");
  };

  

  useEffect(() => {
    const editHandler = async () => {
      setMessage("");
      try {
        const docSnap = await CheytamDataService.getCheytam(id);
        console.log("the record is :", docSnap.data());
        setTitle(docSnap.data().title);
        setDescription(docSnap.data().description);
        setStatus(docSnap.data().status);
      } catch (err) {
        setMessage({ error: true, msg: err.message });
      }
    };
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCheytamTitle">
            <InputGroup>
              <InputGroup.Text id="formCheytamTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Cheytam Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCheytamDescription">
            <InputGroup>
              <InputGroup.Text id="formCheytamDescription">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddCheytam;