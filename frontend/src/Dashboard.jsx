import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file to backend
  const handleUpload = async () => {
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
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data.data);
      
    } catch (err) {
      setError("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Bird Voice Classification</h2>
      
      {/* Upload Form */}
      <Link to="/past-searches" className="btn btn-secondary mt-3">View Past Searches</Link>

      <Card className="p-4 mt-4">
        <Form>
          <Form.Group controlId="formFile">
            <Form.Label>Select Bird Voice File</Form.Label>
            <Form.Control type="file" accept="audio/*" onChange={handleFileChange} />
          </Form.Group>
          
          <Button variant="primary" className="mt-3 w-100" onClick={handleUpload} disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Upload & Analyze"}
          </Button>
        </Form>
      </Card>

      {/* Error Message */}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {/* Result Display */}
      {result && (
        <Card className="mt-4 p-3">
          <h4>Bird Identified: {result.birdName}</h4>
          <p><strong>Description:</strong> {result.description}</p>
          <p><strong>Accuracy Score:</strong> {result.accuracy}%</p>
          <img src={result.imageUrl} alt={result.birdName} className="img-fluid mt-2" style={{ maxWidth: "300px" }} />
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;
