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
    const interval = setInterval(fetchMessages, 5000);

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

  // Function to format seconds as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
                <Row className="center-row" style={{ width: '100%', height: '100%', marginBottom: '10px' }}>
                  <Col md={1} >
                    {/*<div style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                      <img src="ReadyTimerIcon.png" alt="Ready Timer" style={{ maxWidth: '130%', height: 'auto' }}  />
                    </div>*/}
                  </Col>
                  <Col md={11}>
                    <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '90%' }}>
                      <div>
                        <ul>
                          {events.map((event, index) => {
                            const eventText = event.proteinType; // Assuming the event text is in 'proteinType'
                            const eventTime = new Date(event.createdTime); // Convert ISO string to Date
                            const currentTime = new Date();
                            const timeLeftInSeconds = Math.floor((eventTime - currentTime) / 1000);

                            const matchingItem = items.find((item) => item.text === eventText);
                            const color = matchingItem ? matchingItem.color : 'gray';
                            console.log("eventText: " + eventText)
                            console.log("timeLeftInSeconds: " + timeLeftInSeconds)
                            console.log("color: " + color)
                            if (timeLeftInSeconds === 0 || timeLeftInSeconds < 0) { //TODO remove || timeLeftInSeconds < 0

                              return (
                                  <ul className="item-list">
                                    <li key={index} className={`item`} style={{height: '100%'}}>
                                      <div style={{backgroundColor: 'lightgrey', height: '100%', width: '20%'}}>
                                        <img src="ReadyTimerIcon.png" alt="Ready Timer"
                                             style={{maxWidth: '130%', height: 'auto'}}/>
                                      </div>
                                      <div style={{backgroundColor: 'lightgrey', width: '80%', height: 'auto'}}>
{/*
                                        <div className="circle" style={{backgroundColor: color}}></div>
*/}
                                        <h5>{event.proteinType} - Time
                                          Left: {formatTime(Math.max(0, timeLeftInSeconds))}</h5>
                                      </div>
                                    </li>
                                  </ul>
                              );
                            } else if (timeLeftInSeconds >= 30 && timeLeftInSeconds < 60) {
                              return (
                                  <ul className="item-list">
                                    <li key={index} className={`item`} style={{height: '100%'}}>
                                      <div style={{backgroundColor: 'lightgrey', height: '100%', width: '20%'}}>
                                        <img src="1minTimerIcon.png" alt="Ready Timer"
                                             style={{maxWidth: '130%', height: 'auto'}}/>
                                      </div>
                                      <div style={{backgroundColor: 'lightgrey', width: '80%', height: 'auto'}}>
{/*
                                        <div className="circle" style={{backgroundColor: color}}></div>
*/}
                                        <h5>{event.proteinType} - Time
                                          Left: {formatTime(Math.max(0, timeLeftInSeconds))}</h5>
                                      </div>
                                    </li>
                                  </ul>
                              );
                            } else if (timeLeftInSeconds > 60) {
                              return (
                                  <ul className="item-list">
                                    <li key={index} className={`item`} style={{height: '100%'}}>
                                      <div style={{backgroundColor: 'lightgrey', height: '100%', width: '20%'}}>
                                        <img src="2minTimerIcon.png" alt="Ready Timer"
                                             style={{maxWidth: '130%', height: 'auto'}}/>
                                      </div>
                                      <div style={{backgroundColor: 'lightgrey', width: '80%', height: 'auto'}}>
{/*
                                        <div className="circle" style={{backgroundColor: color}}></div>
*/}
                                        <h5>{event.proteinType} - Time
                                          Left: {formatTime(Math.max(0, timeLeftInSeconds))}</h5>
                                      </div>
                                    </li>
                                  </ul>
                              );
                            } else {
                              return null; // Hide the element if time left is not greater than 0
                            }
                          })}
                        </ul>

                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={6} style={{borderLeft: '2px solid red'}}>
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
