import React, { useState } from 'react';
import FOH from './FOH';

function FOHView() {
  // State hook example
  const [count, setCount] = useState(0);

  // JSX to render
  return (
    <div>
   <FOH />
    </div>
  );
}

export default FOHView;
