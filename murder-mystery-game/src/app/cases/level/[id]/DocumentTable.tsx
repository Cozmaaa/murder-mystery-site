"use client";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import dynamic from "next/dynamic";
import Modal from "./Modal"; // Import the modal component

interface DocumentsTableProp {
  level: number;
  showAllDocuments: boolean;
  setShowAllDocuments: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Document {
  _id: string;
  imageUrl: string;
  name: string;
  imageName: string;
}

const PDFViewer = dynamic(() => import("./PDFViwer"), { ssr: false });

const DocumentsTable: React.FC<DocumentsTableProp> = ({
  level,
  showAllDocuments,
  setShowAllDocuments,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null); // State for the selected document
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility

  // State to store the positions of the documents
  const [documentPositions, setDocumentPositions] = useState<{ [key: string]: React.CSSProperties }>({});

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/documents/${level}`
        ,{
          credentials: "include",
        });
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [level]);

  const preventDragHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDoubleClick = (doc: Document) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoc(null);
  };

  const handleInitialClick = () => {
    setShowAllDocuments(true);
  };

  // Get the initial document (assuming it's the first in the list)
  const initialDoc = documents[0];

  // Generate positions for documents when showAllDocuments becomes true
  useEffect(() => {
    if (showAllDocuments && documents.length > 0 && Object.keys(documentPositions).length === 0) {
      // Generate random positions for each document (excluding the initialDoc)
      const positions: { [key: string]: React.CSSProperties } = {};
      documents.filter(doc => doc._id !== initialDoc._id).forEach(doc => {
        positions[doc._id] = getRandomPositionStyle();
      });
      setDocumentPositions(positions);
    }
  }, [showAllDocuments, documents]);

  const getRandomPositionStyle = (): React.CSSProperties => {
    const randomTop = Math.floor(Math.random() * 50) + 10; // Random value between 10% and 70%
    const randomLeft = Math.floor(Math.random() * 50) + 10; // Random value between 10% and 70%
    return {
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
      transform: "translate(-50%, -50%)",
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!showAllDocuments) {
    if (!initialDoc) {
      return <div>No documents available.</div>;
    }
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '300px',
          textAlign: 'center',
          opacity: 1,
          transition: 'opacity 0.5s ease',
        }}
        onClick={(e) => {
          e.currentTarget.style.opacity = '0';
          setTimeout(() => {
            handleInitialClick();
          }, 500);
        }}
      >
        <img
          src={initialDoc.imageUrl}
          alt={initialDoc.name}
          style={{
            width: '100%',
            height: 'auto',
            border: '1px solid white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
          }}
          onDragStart={preventDragHandler}
          onDoubleClick={() => handleDoubleClick(initialDoc)}
        />
        <p
          style={{
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '8px',
            textAlign: 'center',
            width: '80%',
            margin: '8px auto',
          }}
        >
          {initialDoc.name}
        </p>
      </div>
    );
  }

  // When showAllDocuments is true, display all documents except the initial document
  return (
    <div
      className="table"
      style={{ position: 'relative', width: '100%', height: '100vh' }}
    >
      {documents
        .filter((doc) => doc._id !== initialDoc._id) // Exclude the initial document
        .map((doc) => (
          <Draggable key={doc._id} bounds="parent">
            <div
              className="document"
              style={{
                position: 'absolute',
                cursor: 'move',
                ...documentPositions[doc._id],
              }}
            >
              <img
                src={doc.imageUrl}
                alt={doc.name}
                style={{
                  maxWidth: '300px',
                  maxHeight: '300px',
                  border: '1px solid white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                }}
                onDragStart={preventDragHandler}
                onDoubleClick={() => handleDoubleClick(doc)}
              />
              <p
                style={{
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '5px',
                  borderRadius: '5px',
                  marginTop: '8px',
                  textAlign: 'center',
                  width: '80%',
                  margin: '8px auto',
                }}
              >
                {doc.name}
              </p>
            </div>
          </Draggable>
        ))}

      {isModalOpen && selectedDoc && (
        <Modal
          onClose={closeModal}
          fileUrl={'/' + selectedDoc.imageName + '.pdf'}
        >
          <PDFViewer
            fileUrl={'/' + selectedDoc.imageName + '.pdf'}
            scale={1.2}
          />
        </Modal>
      )}
    </div>
  );
};

export default DocumentsTable;
