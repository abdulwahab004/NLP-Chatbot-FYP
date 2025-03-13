import { useState, useEffect } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const PastSearches = ({ userId }) => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const response = await axios.get(`/api/queries/${userId}`);
        setSearches(response.data.data);
        
      } catch (err) {
        setError("Failed to fetch past searches.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearches();
  }, [userId]);

  return (
    <Container className="mt-5">
      <h2 className="text-center">Your Past Searches</h2>

      {loading && <Spinner animation="border" className="d-block mx-auto mt-4" />}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {!loading && searches.length === 0 && (
        <Alert variant="info" className="mt-3">No past searches found.</Alert>
      )}

      {/* Display past searches */}
      {searches.map((search) => (
        <Card key={search.id} className="mt-4 p-3">
          <h4>Bird Identified: {search.result}</h4>
          <p><strong>Uploaded Audio:</strong> <a href={search.audioUrl} target="_blank" rel="noopener noreferrer">Listen</a></p>
          <p><strong>Search Date:</strong> {new Date(search.createdAt).toLocaleString()}</p>
        </Card>
      ))}
    </Container>
  );
};

export default PastSearches;
