import React, { useState } from 'react';
import Annotation from 'react-image-annotation';
import './App.css';

const ImageAnnotations = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});
  const[name,setName] = useState("")
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const [H, setH] = useState(0);
  const [W, setW] = useState(0);

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
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const onChange = (annotation) => {
    setAnnotation(annotation);
  };

  const onSubmit = (annotation) => {
    const { geometry, data } = annotation;

    // Store current annotation values
    const newAnnotation = {
      image: images[selectedImageIndex],
      geometry: { ...geometry },
      data: { ...data }
    };

      console.log(images)
    // Update X, Y, Height, and Width
    setX(geometry.x);
    setY(geometry.y);
    setH(geometry.height);
    setW(geometry.width);

    // Add new annotation to the array
    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
  };

  const onSend = () => {
    const newObj = { ...annotations };
    console.log(newObj);
    setAnnotations([]);
    setAnnotation({})

  };

  return (
    <div className="App">
      <header className="App-header">        
        {
          images.length===0 && (
              <div className='flex flex-col space-y-4 items-center'>

                  <input
                  className='bg-transparent focus-none mt-8'
                  type='text'
                  onChange={(e)=>(setName(e.target.value))}
                  placeholder='Enter Project Name'
                  />

                  <input type="file" accept="image/*" onChange={handleImageUpload} multiple 
                  className='px-4 py-2 my-4 rounded-xl'
                  />
            
            </div>
          )
          
        }
        
        <div className="w-[1200px] flex flex-wrap mb-[40px] mx-auto">
        
           { 
              images.length>0 &&(
              <h1 className='font-bold text-xl text-center my-12 mx-auto'>
              {name}
              </h1>
                )
            }
          <>
            {
              images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview of ${index}th test image`}
                className="w-42 h-40 ml-8 my-8"
                onClick={() => handleImageClick(index)}
              />
              
            ))
            }
          </>
        </div>
        {selectedImageIndex !== null && (
          <>
            <Annotation
              src={images[selectedImageIndex]}
              alt='Uploaded Image'
              className="w-[800px] h-[600px] mx-auto mt-[40px]"
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

            <button onClick={onSend}>Send Annotations</button>
          </>
        )}
      </header>
    </div>
  );
};

export default ImageAnnotations;
