import React, { useState, useEffect } from "react";
import { Group } from "./Group";
import "./style.css";
import Button from 'react-bootstrap/Button';
import TimerButtons from "./TimerButtons";
import {Col, Container, Row, Stack} from "react-bootstrap";

function BOH  () {
  const holdEventsEndpoint = 'http://localhost:8080/hold-events?locationNumber=01437';
  const saveHoldEventEndpoint = 'http://localhost:8080/hold-event/save';


  const items = [
    { text: 'Spicy Fillet', color: 'red' },
    { text: 'Grilled Fillet', color: 'blue' },
    { text: 'Nuggets', color: 'green' },
    { text: 'Strips', color: 'purple' },
  ];

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

  const getCurrentTime = () => new Date();


  const [messages, setMessages] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  //const [proteinSelected, setProteinSelected] = useState(false);
  const [selectedProtein, setSelectedProtein] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [lastButtonSelectionTime, setLastButtonSelectionTime] = useState(null);
  const getCurrentTimeInSeconds = () => Math.floor(new Date().getTime() / 1000);

  const fetchMessages = () => {
    fetch('http://localhost:8080/messages')
        .then((response) => response.json())
        .then((data) => setMessages(data.map((message) => message.messageTxt)))
        .catch((error) => console.error('Error fetching messages:', error));
  };

  useEffect(() => {
    fetchMessagesPeriodically(); // Initial fetch and setup interval
  }, []);

  const fetchMessagesPeriodically = () => {
    fetchMessages();
    setInterval(fetchMessages, 5000); // 5,000 milliseconds = 5 seconds
  };

  const buttonLabels = [
    { label: '1 minute', seconds: 60 },
    { label: '2 minutes', seconds: 120 },
    { label: '3 minutes', seconds: 180 },
    { label: '4 minutes', seconds: 240 },
    { label: '5 minutes', seconds: 300 },
    { label: 'More than 5 minutes', seconds: null },
  ];

  const handleItemClick = (index, protein) => {
    setSelectedItem(index);
    setSelectedProtein(protein);
  };

  const handleButtonClick = (seconds) => {
    if (seconds != null && setSelectedProtein != null) {
      const requestBody = {
        locationNumber: '01437',
        proteinType: selectedProtein,
        createdTime: getCurrentTime().toISOString(),
        secToBeReady: seconds,
        epochCreatedTime: Math.floor(getCurrentTime().getTime() / 1000),
      };
      console.log(requestBody)
      fetch(saveHoldEventEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
          .then((response) => {
            if (response.ok) {
              console.log('Data saved successfully.');
            } else {
              console.error('Failed to save data.');
            }
          })
          .catch((error) => {
            console.error('Error saving data:', error);
          });
    }

    setSelectedButton(seconds);
    setLastButtonSelectionTime(getCurrentTime());
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
      <div className="BOH-view centered-container" style={{ width: '100%', height: '100vh' }}>
          <Container className="custom-container" style={{ width: '100%', height: '100%' }}>
            <Row className="center-row" style={{ width: '100%', height: '100%' }}>
              <Col md={6}>
                {/* Left Column */}
                <div className="column" style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                  <div className="center-row" style={{ backgroundColor: 'gainsboro', height: '10%', width: '100%' }}>
                    <h2>Create A Hold</h2>
                  </div>
                  <Row className="center-row" style={{ width: '100%', height: '45%', borderBottom: '2px solid red', marginBottom: '10px' }}>
                    <Col md={2}>
                      <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '100%' }}>
                          <img src="ReadyTimerIcon.png" alt="Ready Timer" style={{ maxWidth: '130%', height: 'auto' }}  />
                      </div>
                    </Col>
                    <Col md={10}>
                      <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '90%' }}>
                        <h5>PROTEIN</h5>
                        <ul className="item-list">
                          {items.map((item, index) => (
                              <li
                                  key={index}
                                  className={`item ${selectedItem === index ? 'selected' : ''}`}
                                  onClick={() => handleItemClick(index, item.text)} // Pass the protein item's text
                              >
                                <div className="circle" style={{ backgroundColor: item.color }}></div>
                                {item.text}
                              </li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                  <Row className="center-row" style={{ width: '100%', height: '45%' }}>
                    <Col>
                      <h5>TIME TO READY</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="btn-group-vertical">
                            {buttonLabels.slice(0, 3).map((button, index) => (
                                <button
                                    key={index}
                                    className={`btn btn-secondary mb-2 ${selectedButton === button.seconds ? 'active' : ''}`}
                                    onClick={() => handleButtonClick(button.seconds)}
                                >
                                  {button.label}
                                </button>
                            ))}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="btn-group-vertical">
                            {buttonLabels.slice(3).map((button, index) => (
                                <button
                                    key={index}
                                    className={`btn btn-secondary mb-2 ${selectedButton === button.seconds ? 'active' : ''}`}
                                    onClick={() => handleButtonClick(button.seconds)}
                                >
                                  {button.label}
                                </button>
                            ))}
                          </div>
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
                    <h5>MESSAGES FROM FOH</h5>
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
                      <h5>CURRENT HOLDS</h5>
                      <div style={{ backgroundColor: 'lightgrey', height: '100%', width: '90%' }}>
                        <div>
                          <ul>
                            {events.map((event, index) => {
                              const eventTime = new Date(event.createdTime); // Convert ISO string to Date
                              const currentTime = new Date();
                              const timeLeftInSeconds = (eventTime - currentTime) / 1000 + event.secToBeReady;

                              return (
                                  <li
                                      key={index}
                                      className="btn btn-secondary mb-2"
                                      style={{ backgroundColor: 'lightcoral' }}
                                  >
                                    {event.proteinType} - Time Left: {formatTime(Math.max(0, timeLeftInSeconds))}
                                  </li>
                              );
                            })}
                          </ul>
                        </div>
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

export default BOH;
