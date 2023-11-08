import React from 'react';
import "./style.css";

function messageButtons(props) {
  return (
    <button className='group-2 text-wrapper-3'>{props.text}</button>
  );
}

export default messageButtons;
