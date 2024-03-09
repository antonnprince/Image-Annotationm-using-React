import { useState } from 'react';
import Annotation from 'react-image-annotation';
import IMAGE_URL from './h2.png'
import './App.css';

const ImageAnnotations = () => {
  const [image, setImage] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const [annotation, setAnnotation] = useState({});
    const [X,setX] = useState(0)
    const [Y, setY] = useState(0)
    const[H,setH] = useState(0)
    const[W,setW] = useState(0)

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImage(reader.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };

  const onChange = (annotation) => {
    setAnnotation(annotation);
  }

  const onSubmit = (annotation) => {
    const { geometry, data } = annotation;
  
    // Store current annotation values
    const newAnnotation = {
      geometry: { ...geometry },
      data: { ...data, id: Math.random() }
    };
  console.log(newAnnotation)
    // Update X, Y, Height, and Width
    setX(geometry.x);
    setY(geometry.y);
    setH(geometry.height);
    setW(geometry.width);
  
    // Add new annotation to the array
    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
  };

  const onSend=()=>{
    const newObj = {...annotations}
    console.log(newObj)
  }
  return (
    <div className="App">
      <header className="App-header">
      <h1>Image Annotation</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && (
          <>
              <Annotation
                src={image}
                alt='Uploaded Image'
                annotations={annotations}
                value={annotation}
                onChange={onChange}
                onSubmit={onSubmit}
                allowTouch
              />

              <p>
                x: {X}
                <br/>
                y: {Y}
                <br/>
                height: {H}
                <br/>
                width: {W}
              </p>

              <button onClick={onSend}>

              </button>
          </>
        )}
        
       
      </header>
    </div>
  );
}
 

export default ImageAnnotations;
