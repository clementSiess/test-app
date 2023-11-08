import React, { useState } from 'react';
import BOH from './BOH';

function BOHView() {
  // State hook example
  const [count, setCount] = useState(0);

  // JSX to render
  return (
    <div>
    <BOH/>
    </div>
  );
}

export default BOHView;
