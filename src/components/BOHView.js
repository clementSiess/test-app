import React, { useState, useEffect } from 'react';
import BOH from './BOH';

function BOHView() {
  // State hook example
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update the window width state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // JSX to render
  return (
      <div>
        <BOH />
      </div>
  );
}

export default BOHView;
