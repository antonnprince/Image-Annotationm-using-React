import React, { useRef, useEffect, useState } from 'react';
import human from './human7.jpg';

const PreviousProjects = () => {
  const canvasRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      canvas.width = width;
      canvas.height = height;
      setImageDimensions({ width, height });

      ctx.drawImage(image, 0, 0, width, height);
      ctx.beginPath();
      ctx.rect( 47.018229961395264 * 12, 22.152776188320583 * 7,15.234375 * 22,  9.375* 5);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    };

    image.src = human;
  }, []);

  // 47.018229961395264 * 12, 22.152776188320583 * 10,15.234375 * 12, 9.375 * 5

  return (
    <div className="App">
      <header className='mx-auto w-56 h-42' style={{ display: 'inline-block', maxWidth: '50%', maxHeight: '25%' }}>
        <canvas ref={canvasRef} className=' w-64 h-56' />
      </header>
    </div>
  );
}

export default PreviousProjects;
