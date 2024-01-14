import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QcmDetails = () => {
  const { qcmId } = useParams();
  const [qcmDetails, setQcmDetails] = useState(null);

  useEffect(() => {
    const fetchQcmDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/QCM/getQcmById/${qcmId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch QCM details: HTTP status ${response.status}`);
        }
        const data = await response.json();
        setQcmDetails(data);
      } catch (error) {
        console.error('Error fetching QCM details:', error);
      }
    };

    fetchQcmDetails();
  }, [qcmId]);

  return (
    <div>
      <h1>QCM Details</h1>
      {qcmDetails ? (
        <div>
          <h2>{qcmDetails.titre}</h2>
          <p>{qcmDetails.description}</p>

        </div>
      ) : (
        <p>Loading QCM details...</p>
      )}
    </div>
  );
};

export default QcmDetails;
