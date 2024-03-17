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
      // Set canvas dimensions to match the image dimensions
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0);

      // Draw the rectangle on the canvas
      const x = 47.53790283203125;
      const y = 21.66241986338841;
      const width = 13.400000000000006;
      const height = 10.666666666666664;
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    };

    image.src = human;
  }, []);

  return (
    <div className='w-auto h-auto' style={{ display: 'inline-block' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PreviousProjects;
