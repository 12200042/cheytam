import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import CheytamDataService from "../services/cheytam.services";

const CheytamsList = ({ getCheytamId }) => {
  const [cheytams, setCheytams] = useState([]);
  useEffect(() => {
    getCheytam();
  }, []);

  const getCheytam = async () => {
    const data = await CheytamDataService.getAllCheytams();
    console.log(data.docs);
    setCheytams(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await CheytamDataService.deleteCheytam(id);
    getCheytam();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getCheytam}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cheytams.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.description}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getCheytamId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default CheytamsList;