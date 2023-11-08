import React from "react";
import { Group } from "./Group";
import "./style.css";
import TimerButtons from "./TimerButtons";

function BOH  () {
  return (
        <div className="FOH-view">
          <div className="div">
            <img className="line" alt="Line" src="/img/line-1.png" />
            <img className="img" alt="Line" src="/img/line-2.svg" />
            <div className="group">
              <div className="overlap-group">
                <div className="text-wrapper">Create a Hold</div>
              </div>
            </div>
            <div className="overlap-wrapper">
              <div className="overlap">
                <div className="rectangle" />
                <div className="text-wrapper-2">Communication</div>
              </div>
            </div>



            <img className="chat-icon" alt="Chat icon" src="ReadyTimerIcon.png" />
            <div className="overlap-5">
              <div className="group-3">
                <img className="chat-icon-2" alt="Chat icon" src="ChatIcon.png" />
                <div className="text-wrapper-9">Messages from FOH</div>
              </div>

            </div>
            <div>
    
            <p className="p">Current Holds</p>
            </div>
   
           
           

            <div className="overlap-10">
              <div>
              <img className="ellipses" alt="Element timer icon" src="ReadyTimerIcon.png" />
              </div>
              <div className="group-7">
             
                <div className="text-wrapper-14">Protein</div>
              </div>
              <div className="overlap-10">
              <div className="ellipse" />
              <div className="group-7">
                <div className="text-wrapper-14">Spicy Fillet</div>
              </div>
            </div>

            <div className="TimeToReady" style={{width: 544, height: 84, textAlign: 'center', color: 'black', fontSize: 48, fontFamily: 'Istok Web', fontWeight: '400', wordWrap: 'break-word'}}>TIME TO READY</div>
           
            <div className="TimeToReady1minBTN">
            <TimerButtons text='1 Minute' />
            </div>
           
            </div>
          </div>
        </div>
      );
};

export default BOH;
