import React, { useEffect, useState, useRef } from 'react';
import human from "./human7.jpg";

const PreviousProjects = () => {
  const canvasRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      const imageAspectRatio = image.width / image.height;
      const canvasAspectRatio = canvas.width / canvas.height;

      let scale;
      if (imageAspectRatio > canvasAspectRatio) {
        scale = canvas.width / image.width;
      } else {
        scale = canvas.height / image.height;
      }

      setImageDimensions({ width: image.width , height: image.height  });
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Scale based on height to maintain aspect ratio

      // Adjust coordinates based on scale
      const scaledX = 47.5 * scale;
      const scaledY = 21.6 * scale;

      ctx.beginPath();
      ctx.rect(scaledX, scaledY, 13.400000000000006, 10.666666666666664);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    };

    image.src = human;

    const handleClick = (event) => {
      const x = event.clientX; // X-coordinate of the mouse click relative to the viewport
      const y = event.clientY; // Y-coordinate of the mouse click relative to the viewport
      console.log('Mouse clicked at:', x, y);
    };

    document.addEventListener('mousedown', handleClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  
  return (
    <div className='w-auto h-auto' style={{ display: 'inline-block' }}>
      <canvas ref={canvasRef} width={300} height={200} />
    </div>
  );
};

export default PreviousProjects;
