import React, {useEffect, useState} from "react";
import "./style.css";
import MessageButton from './MessageButton';
import {Col, Container, Row} from "react-bootstrap";

function FohView  ()  {
  const saveMessageEndpoint = 'http://localhost:8080/message/save';
  const holdEventsEndpoint = 'http://localhost:8080/hold-events?locationNumber=01437';
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    fetch('http://localhost:8080/messages')
        .then((response) => response.json())
        .then((data) => setMessages(data.map((message) => message.messageTxt)))
        .catch((error) => console.error('Error fetching messages:', error));
  };

  useEffect(() => {
    fetchMessages(); // Initial fetch

    // Fetch messages every 10 seconds (adjust the interval as needed)
    const interval = setInterval(fetchMessages, 10000);

    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
  }, []);

  const [events, setEvents] = useState([]);
  const fetchEvents = () => {
    console.log("FetchEvent")
    fetch(holdEventsEndpoint)
        .then((response) => response.json())
        //.then((data) => console.log(data.toString()))
        .then((data) => setEvents(data))
        .catch((error) => console.error('Error fetching events:', error));
  };
  useEffect(() => {
    fetchEvents(); // Initial fetch
    const interval = setInterval(fetchEvents, 10000); // Fetch events every 10 seconds

    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
  }, []);

  const buttonsMessage = [
    'Full lobby',
    'Full DT',
    'Bus',
    'Waiting on...',
    'TYPE YOUR MESSAGE HERE...',
  ];

  const items = [
    { text: 'Spicy Fillet', color: 'red' },
    { text: 'Grilled Fillet', color: 'blue' },
    { text: 'Nuggets', color: 'green' },
    { text: 'Strips', color: 'purple' },
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
              <div className="column" style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                <div className="center-row" style={{ backgroundColor: 'gainsboro', height: '10%', width: '100%' }}>
                  <h2>Current Holds</h2>
                </div>
                <Row className="center-row" style={{ width: '100%', height: '100%', borderBottom: '2px solid red', marginBottom: '10px' }}>
                  <Col md={2}>
                    <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                      <img src="ReadyTimerIcon.png" alt="Ready Timer" style={{ maxWidth: '130%', height: 'auto' }}  />
                    </div>
                  </Col>
                  <Col md={10}>
                    <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '90%' }}>
                      <div>
                        <ul>
                          {events.map((event) => {
                            const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
                            const eventTimeInSeconds = event.createdTime + event.secToBeReady;
                            const secondsLeft = eventTimeInSeconds - currentTimeInSeconds;

                            // Only display events that are in the future
                            if (secondsLeft > 0) {
                              return (
                                  <li key={event.id}>
                                    Event ID: {event.id}, Time Left: {secondsLeft} seconds
                                  </li>
                              );
                            }
                            return null; // If the event is in the past, don't display it
                          })}
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={6} >
              <div className="column" style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                <div className="center-row" style={{ backgroundColor: 'gainsboro', height: '10%', width: '100%' }}>
                  <h2>Communication</h2>
                </div>
                <Row className="center-row" style={{ width: '100%', height: '35%', borderBottom: '2px solid red', marginBottom: '10px'}}>
                  <Col md={2}>
                    <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                      <img src="ChatIcon.png" alt="Chat Icon" style={{ maxWidth: '130%', height: 'auto' }}  />
                    </div>
                  </Col>
                  <Col>
                    <h5>SENT TO BOH</h5>
                    <div>
                      {messages.length > 0 && (
                          <ul>
                            {messages.map((message, index) => (
                                <li key={index} className={`btn btn-secondary mb-2`} style={{ backgroundColor: 'lightcoral' }}>
                                  {message}
                                </li>
                            ))}
                          </ul>
                      )}
                    </div>

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
