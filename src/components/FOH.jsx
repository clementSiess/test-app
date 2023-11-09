import React from "react";
import "./style.css";
import MessageButton from './MessageButton';
import {Col, Container, Row} from "react-bootstrap";

function FohView  ()  {
  const saveMessageEndpoint = 'http://localhost:8080/message/save';
  const buttonsMessage = [
    'Full lobby',
    'Full DT',
    'Bus',
    'Waiting on...',
    'TYPE YOUR MESSAGE HERE...',
  ];
  const handleSaveMessageButtonClick = (messageText) => {
    const requestBody = {
      locationNumber: '01437',
      createdTime: new Date().toISOString(),
      messageTxt: messageText,
    };

    fetch(saveMessageEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
        .then((response) => {
          if (response.ok) {
            console.log('Message sent successfully.');
          } else {
            console.error('Failed to send the message.');
          }
        })
        .catch((error) => {
          console.error('Error sending the message:', error);
        });
  };

  return (
      <div className="FOH-view centered-container" style={{ width: '100%', height: '100vh' }}>
        <Container className="custom-container" style={{ width: '100%', height: '100%' }}>
          <Row className="center-row" style={{ width: '100%', height: '100%' }}>
            <Col md={6}>
              {/* Left Column */}
              <div className="column" style={{ backgroundColor: 'lightblue', height: '100%', width: '100%' }}>
                <div className="center-row" style={{ backgroundColor: 'lightgreen', height: '10%', width: '100%' }}>
                  <h2>Create A Hold</h2>
                </div>
                <div className="column" style={{ backgroundColor: 'lightgreen', height: '100%', width: '20%', border: '0px'}}>
                </div>
              </div>
            </Col>
            <Col md={6} >
              <div className="column" style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                <div className="center-row" style={{ backgroundColor: 'lightgreen', height: '10%', width: '100%' }}>
                  <h2>Communication</h2>
                </div>
                <Row className="center-row" style={{ width: '100%', height: '35%', borderBottom: '2px solid red', marginBottom: '10px'}}>
                  <Col md={2}>
                    <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                      <img src="ChatIcon.png" alt="Chat Icon" style={{ maxWidth: '130%', height: 'auto' }}  />
                    </div>
                  </Col>
                  <Col>
                    <h5>MESSAGES FROM FOH</h5>

                  </Col>
                </Row>
                <Row className="center-row" style={{ width: '100%', height: '55%' }}>
                  <Col md={2}>
                    <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                      <img src="ChatIcon.png" alt="Chat Icon" style={{ maxWidth: '130%', height: 'auto' }}  />
                    </div>
                  </Col>
                  <Col>
                    <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                      <h5>SEND A MESSAGE TO BOH</h5>
                      <div>
                        {buttonsMessage.map((text, index) => (
                            <button key={index} className={`btn btn-secondary mb-2`} style={{ backgroundColor: 'lightcoral' }} onClick={() => handleSaveMessageButtonClick(text)}>
                              {text}
                            </button>
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default FohView;
