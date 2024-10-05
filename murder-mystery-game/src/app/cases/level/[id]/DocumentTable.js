/*
This file does the fetching for getting the documents on the table
Also does the opening of the modal when clicking on the image
*/


'use client';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import dynamic from 'next/dynamic';
import Modal from './Modal'; // Import the modal component

const PDFViewer = dynamic(() => import('./PDFViwer'), { ssr: false });

const DocumentsTable = ({ level }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null); // State for the selected document
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/documents/${level}`);
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [level]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  const handleDoubleClick = (doc) => {
    setSelectedDoc(doc);
    setIsModalOpen(true); 
  };

  const closeModal = () => {

    setIsModalOpen(false);
    setSelectedDoc(null); 
  };

  return (
    <div className="table" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {documents.map((doc) => (
        <Draggable key={doc._id} bounds="parent">
          <div className="document" style={{ position: 'absolute', cursor: 'move' }}>
            <img
              src={doc.imageUrl}
              alt={doc.name}
              style={{ maxWidth: '200px', maxHeight: '200px', border:'1px solid white',boxShadow:'0 4px 8px rgba(0,0,0,0.5)'}}
              onDragStart={preventDragHandler}
              onDoubleClick={() => handleDoubleClick(doc)} 
            />
            <p style={{ 
          color: 'white', // Text color to stand out on dark background
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Adds a shadow for better readability
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional background behind text
          padding: '5px', // Padding for better appearance
          borderRadius: '5px', // Rounded corners for text background
          marginTop: '8px', // Adds some space between the image and the text
          textAlign: 'center' // Centers the text below the image
        }}>{doc.name}</p>
          </div>
        </Draggable>
      ))}

      {isModalOpen && (
        <Modal onClose={closeModal} fileUrl={"/"+selectedDoc?.imageName+'.pdf'}>
          <PDFViewer fileUrl={"/"+selectedDoc?.imageName+'.pdf'} />
        </Modal>
      )}
    </div>
  );
};

export default DocumentsTable;
