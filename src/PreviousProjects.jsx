import React, { useEffect, useState, useRef } from 'react';
import human from "./human6.jfif";
import Annotation from 'react-image-annotation';

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
       const scale = canvas.width / image.width;

      //  image.width=canvas.width;
      //  image.height=canvas.height;
       //setImageDimensions({ width: image.width , height: image.height  });
       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
       ctx.beginPath();
        //Adjust the coordinates based on the scaling factor
        image.width = canvas.width;
        image.height = canvas.height;
       const x = 32.81391480515884   ;
       const y = 15.112376963693178  ;
       const width =  11.374325288425673 ;
       const height = 18.90481820958808  ;
       ctx.rect(x, y, width, height);
       ctx.lineWidth = 2;
       ctx.strokeStyle = 'red';
       ctx.stroke();
       console.log(image.height, image.width)

       canvas.addEventListener('click', function(event) {
        // Get the coordinates relative to the canvas
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
      
        // Log the coordinates
        console.log("Clicked at: (" + x + ", " + y + ")");
    });
     };

     image.src = human;
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
    <div className='' style={{ display: 'inline-block' }}>
     
    <canvas ref={canvasRef}  />    
            
            {/* <button onClick={onSend} className="bg-blue-300 px-4 py-2 rounded-xl">Save Label</button> */}
          </div>
    // </div>
  );
};

export default PreviousProjects;

