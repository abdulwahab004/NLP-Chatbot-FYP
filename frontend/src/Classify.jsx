import React, { useState } from "react";
import { Container, Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const Classify = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    const formData = new FormData();
    formData.append("audio", file);
    try {
      const response = await axios.post("/api/classify", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      setError("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Bird Voice Classification</h2>
      <Card className="p-4 mt-4">
        <Form onSubmit={handleUpload}>
          <Form.Group controlId="formFile">
            <Form.Label>Select an audio file</Form.Label>
            <Form.Control type="file" accept="audio/*" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" className="mt-3 w-100" type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Upload & Analyze"}
          </Button>
        </Form>
      </Card>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {result && (
        <Card className="mt-4 p-3">
          <h4>Predicted Species: {result.predicted_species}</h4>
          <p><strong>Description:</strong> {result.description}</p>
          <img src={result.imageUrl} alt={result.predicted_species} className="img-fluid mt-2" style={{ maxWidth: "300px" }} />
        </Card>
      )}
    </Container>
  );
};

export default Classify;
