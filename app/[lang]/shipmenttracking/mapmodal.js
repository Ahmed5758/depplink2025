// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// // import { Modal, Button } from 'react-bootstrap';

// const MapModal = ({ show, onClose, onSave }) => {
//   const [position, setPosition] = useState(null);

//   const mapContainerStyle = {
//     height: '400px',
//     width: '100%',
//     border: '2px solid #007bff',
//     borderRadius: '8px',
//   };

//   const handleMapClick = (e) => {
//     const { latLng } = e;
//     setPosition({ lat: latLng.lat(), lng: latLng.lng() });
//   };

//   return (
//     <Modal show={show} onHide={onClose} style={{ 
//       maxWidth: '90%', 
//       display:'flex',
//       alignItems:'center',
//       borderRadius: '8px', 
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//     }}>
//       <Modal.Header closeButton style={{ backgroundColor: '#007bff', color: '#fff' }}>
//         <Modal.Title>Select Location</Modal.Title>
//       </Modal.Header>
//       <Modal.Body style={{ padding: '0' }}>
//         <LoadScript googleMapsApiKey="AIzaSyB3ekz5eMwuRZGvFy2HUADZVhxAzTWV5Ok">
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={{ lat: 51.505, lng: -0.09 }}
//             zoom={13}
//             onClick={handleMapClick}
//           >
//             {position && <Marker position={position} />}
//           </GoogleMap>
//         </LoadScript>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//         <Button 
//           variant="primary" 
//           onClick={() => { onSave(position); onClose(); }} 
//           disabled={!position}
//           style={{
//             backgroundColor: '#007bff',
//             borderColor: '#007bff',
//             color: '#fff',
//           }}
//         >
//           Save Location
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default MapModal;
