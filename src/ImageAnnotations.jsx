import React, { useState, useEffect } from 'react';
import Annotation from 'react-image-annotation';
import './App.css';
import { Route,Routes,Link } from 'react-router-dom';


const ImageAnnotations = () => {
  const [images, setImages] = useState([]); //array of images
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); //to set the index of image from images array for viewing
  const [annotations, setAnnotations] = useState([]); //array containing all annotations
  const [annotation, setAnnotation] = useState({});//single annotaion object
  const[nextPage,setNextPage]= useState(false); //to change screen from name to file choosing
  const[labell,setLabel] = useState("") //to autofill label field
  const[name,setName] = useState("") //sets project name
  const [X, setX] = useState(0); //sets x coordinate
  const [Y, setY] = useState(0); //sets y coordinate
  const [H, setH] = useState(0); //sets H
  const [W, setW] = useState(0); //sets W

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagePreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        imagePreviews.push(reader.result);
        if (imagePreviews.length === files.length) {
          setImages(imagePreviews);
            // send images array to backend
       
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const onChange = (annotation) => {
    if (labell === "") {
      setAnnotation(annotation);
    } else {
      const newAnn = {
        ...annotation,
        data: {
          text: labell,
        }
      };
      setAnnotation(newAnn);
    }
  };
  
  


  const onSubmit = (annotation) => {
    const { geometry, data } = annotation;
  
    // Store current annotation values
    const newAnnotation = {
      image: images[selectedImageIndex],
      geometry: { ...geometry },
      data: { ...data }
    };
    
    // Calculate scaled coordinates
    const image = new Image();
    image.src = images[selectedImageIndex];
    image.onload = () => {
      const scaledX = geometry.x * image.naturalWidth;
      const scaledY = geometry.y * image.naturalHeight;
  
      // Update X, Y, Height, and Width
      setX( geometry.x);
      setY( geometry.y);
      setH(geometry.height);
      setW(geometry.width);
      console.log(image.naturalWidth, image.naturalHeight)
    };
  
    // Add new annotation to the array
    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
    setLabel(data.text);
  };
  

  const removeImage=(index)=>{
    const newImages = [...images]
    newImages.splice(index,1)
    setImages(newImages)
  }

  // sends updated image array value
    const saveImages=()=>[
      console.log(images)
    ]

  const onSend = () => {
    //send all label values of a single image to model
    const newObj = { ...annotations };
    console.log(newObj);
    setAnnotations([]);
    setAnnotation({})

  };

  return (
    <div className="App">
      <header className="App-header"> 

         {  
            nextPage===false && (
              <>
                <input
                className='bg-transparent focus-none mt-8 p-2  focus:outline-none font-semibold'
                type='text'
                onChange={(e)=>(setName(e.target.value))}
                placeholder='Enter Project Name'
                />

                <button onClick={()=>setNextPage(true)} className='bg-blue-300 px-4 py-2 rounded-xl'>
                  Next
                </button>
              </>
          )
        }

        {
       nextPage === true && (
      <div className={`flex flex-col space-y-4 items-center ${images.length > 0 ? "hidden" : ""}`}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        multiple 
        className='px-4 py-2 my-4 rounded-xl'
      />
    </div>
    ) 
      }

    {
        images.length>0 && (
          <h1 className='font-semibold text-3xl'>{name}</h1>
        )
      }
        

      <div className="w-3/4 flex flex-wrap mb-[40px] mx-auto space-x-8 space-y-8"> 
  {
    images.map((image, index) => (
    <div key={index} className='flex flex-col space-y-1'>
      <button className='text-xl font-bold border-2 border-black w-6 ' onClick={() => removeImage(index)}>X</button>
        <img
          src={image}
          alt={`Preview of ${index}th test image`}
          className={index===selectedImageIndex? "w-42 h-40 ml-8 my-8 z-20": "w-42 h-40 ml-8 my-8"}
          onClick={() => handleImageClick(index)}
        />
      </div>  
   ))}
   
      </div>

      {
          images.length>0 && (
            <button className='bg-blue-300 px-4 py-2 rounded-x' onClick={saveImages}>Save Changes</button>
            )
            }
     
        {
          selectedImageIndex !== null && (
          <div style={{display:'inline-block',width: '400px', height: '300px'}}>
           
            <Annotation
              src={images[selectedImageIndex]}
              alt='Uploaded Image'
              className="w-[400px] h-[300px] mt-0 pt-0 mx-auto z-20"
              annotations={annotations}
              value={annotation}
              onChange={onChange}
              onSubmit={onSubmit}
              allowTouch
            />

            <p>
              x: {X}
              <br />
              y: {Y}
              <br />
              height: {H}
              <br />
              width: {W}
            </p>

            
            <button onClick={onSend} className="bg-blue-300 px-4 py-2 rounded-xl">Save Label</button>
          </div>
        )}
      </header>
    </div>
  );
};

export default ImageAnnotations;
