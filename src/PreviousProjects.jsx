import React, { useRef, useEffect } from 'react';
import human from './human7.jpg';
import './App.css';

const PreviousProjects = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      canvas.width = image.width; // Set canvas width to match image width
      canvas.height = image.height; // Set canvas height to match image height

      ctx.drawImage(image, 0, 0);
      ctx.beginPath();
      ctx.rect(48.046875, 21.63333336512248, 70, 30); // Define the rectangle position and dimensions
      ctx.lineWidth = 2; // Set the line width
      ctx.strokeStyle = 'red'; // Set the stroke color
      ctx.stroke(); // Draw the rectangle
    };
    image.src = human;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <canvas ref={canvasRef} className='mx-auto my-12' style={{width:"300px", height: "200px" }}/>
      </header>
    </div>
  );
}

export default PreviousProjects;
