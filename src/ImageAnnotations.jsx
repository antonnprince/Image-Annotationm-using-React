import React, { useState } from 'react';
import Annotation from 'react-image-annotation';
import './App.css';

const ImageAnnotations = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});
  const[nextPage,setNextPage]= useState(false);
  const[labell,setLabel] = useState("")
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

  
    // Update X, Y, Height, and Width
    setX(geometry.x);
    setY(geometry.y);
    setH(geometry.height);
    setW(geometry.width);

    // Add new annotation to the array
    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
    setLabel(data.text)
  };
  const removeImage=(index)=>{
      
    const newImages = [...images]

    newImages.splice(index,1)
    setImages(newImages)
  }


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
          {images.map((image, index) => (
            <div className='flex flex-col space-y-1'>
            <button className='text-xl font-bold border-2 border-black w-6 ' onClick={()=>removeImage(index)}>X</button>
            <img
              key={index}
              src={image}
              alt={`Preview of ${index}th test image`}
              className="w-42 h-40 ml-8 my-8"
              onClick={() => handleImageClick(index)}
            />
             </div>
          ))}
      
      </div>
      <button>Save Changes</button>
        {
          selectedImageIndex !== null && (
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

            <button onClick={onSend} className="bg-blue-300 px-4 py-2 rounded-xl">Train Model</button>
          </>
        )}
      </header>
    </div>
  );
};

export default ImageAnnotations;
