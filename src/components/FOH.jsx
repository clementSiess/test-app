import React from "react";
import "./style.css";
import MessageButton from './MessageButton';

function FohView  ()  {
  return (
    <div className="FOH-view">
      <div className="div">
        <img className="line" alt="Line" src="/img/line-1.png" />
        <img className="img" alt="Line" src="/img/line-2.svg" />
        <div className="group">
          <div className="overlap-group">
            <div className="text-wrapper">Current Holds</div>
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="rectangle" />
            <div className="text-wrapper-2">Communication</div>
          </div>
        </div>
        <div className="overlap-2">
         
          <div className="text-wrapper-3">
          <MessageButton  text="Bus"/>
          </div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-3">
            <div className="rectangle-2" />
            <div className="text-wrapper-4">Waiting on...</div>
          </div>
        </div>
        <div className="timers">
          <div className="overlap-4">
            <div className="rectangle-3" />
            <img className="element-timer-icon" alt="Element timer icon" src="1minTimerIcon.png" />
            <img className="element-min-timer-icon" alt="Element timer icon" src="2minTimerIcon.svg.png" />
            <img className="element-timer-icon-2" alt="Element timer icon" src="5minTimerIcon.svg.png" />
            <img className="longer-timer-icon" alt="Longer timer icon" src="LongerTimerIcon.svg.png" />
            <img className="ready-timer-icon" alt="Ready timer icon" src="ReadyTimerIcon.png" />
            <div className="text-wrapper-5">8 min</div>
            <div className="text-wrapper-6">5 min</div>
            <div className="text-wrapper-7">2 min</div>
            <div className="text-wrapper-8">1 min</div>
          </div>
        </div>
        <img className="chat-icon" alt="Chat icon" src="ChatIcon.png" />
        <div className="overlap-5">
          <div className="group-3">
            <img className="chat-icon-2" alt="Chat icon" src="ChatIcon.png" />
            <div className="text-wrapper-9">Sent to BOH</div>
          </div>
          <div className="div-wrapper">
            <div className="overlap-6">
              <div className="text-wrapper-10">Waiting on Strips</div>
            </div>
          </div>
        </div>
        <p className="p">Send A MESSAGE TO BOH</p>
        <div className="group-4">
          
            <div className="text-wrapper-11">
            <MessageButton text='Full Lobby'/>
            </div>
        
        </div>
        <div className="group-5">
          
            
            <div className="text-wrapper-12">
            <MessageButton text='Full DT' />
            </div>
        
        </div>
        <div className="group-6">
          <div className="overlap-9">
            <div className="text-wrapper-13">TYPE YOUR MESSAGE HERE...</div>
          </div>
        </div>
        <div className="overlap-10">
          <div className="ellipse" />
          <div className="group-7">
            <div className="text-wrapper-14">Spicy Fillet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FohView;
