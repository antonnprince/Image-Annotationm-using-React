import React, { useEffect, useState, useRef } from 'react';
import human from "./mustang.jpg";

const PreviousProjects = () => {
  const canvasRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  // const [annotations, setAnnotations] = useState([]); //array containing all annotations
  // const [annotation, setAnnotation] = useState({});//single annotaion object
  // const [X, setX] = useState(0); //sets x coordinate
  // const [Y, setY] = useState(0); //sets y coordinate
  // const [H, setH] = useState(0); //sets H
  // const [W, setW] = useState(0); //sets W


   useEffect(() => {
     const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const image = new Image();

      image.onload = () => { 
         image.width=canvas.width;
         image.height=canvas.height;
        //setImageDimensions({ width: image.width , height: image.height  });
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        const x =62.19444274902344 * 3;
        const y = 47.77777099609375 * 1.5;
        const width =  27* 3 ;
        const height = 9.199999999999996* 1.5  ;
        ctx.rect(x, y, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        console.log(image.height, image.width)
      };

      image.src = human;
    //let rectangle = interactive.rectangle(44.388885498046875,19.96296183268229,20,19.333333333333336)
   }, []);


  // const onChange = (annotation) => {
  //   if (labell === "") {
  //     setAnnotation(annotation);
  //   } else {
  //     const newAnn = {
  //       ...annotation,
  //       data: {
  //         text: labell,
  //       }
  //     };
  //     setAnnotation(newAnn);
  //   }
  // };
  
  


  // const onSubmit = (annotation) => {
  //   const { geometry, data } = annotation;

  //   // Store current annotation values
  //   const newAnnotation = {
  //     image: images[selectedImageIndex],
  //     geometry: { ...geometry },
  //     data: { ...data }
  //   };
  //   // Update X, Y, Height, and Width
  //   setX(geometry.x);
  //   setY(geometry.y);
  //   setH(geometry.height);
  //   setW(geometry.width);
  //   // 
    
  //   const onSend = () => {
  //     //send all label values of a single image to model
  //     const newObj = { ...annotations };
  //     console.log(newObj);
  //     setAnnotations([]);
  //     setAnnotation({})
  
  //   };//new annotation to the array
  //   setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
  //   setLabel(data.text)
  // };
  return (
    <div className='' style={{ display: 'inline-block' }} id="my-interactive">

    <canvas ref={canvasRef}  />    
            
            {/* <button onClick={onSend} className="bg-blue-300 px-4 py-2 rounded-xl">Save Label</button> */}
          </div>
    // </div>
  );
};

export default PreviousProjects;

