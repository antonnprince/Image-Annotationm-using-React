import { useState } from 'react';
import Annotation from 'react-image-annotation';
import IMAGE_URL from './h2.png'
import './App.css';

const ImageAnnotations = () => {
  const [image, setImage] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const [annotation, setAnnotation] = useState({});

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

    setAnnotation({});
    setAnnotations([...annotations, {
      geometry,
      data: {
        ...data,
        id: Math.random()
      }
    }]);
  }


  return (
    <div className="App">
      <header className="App-header">
      <h1>Image Annotation</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <Annotation
          src={image}
          // alt='Two pebbles anthropomorphized holding hands'
          annotations={annotations}
          value={annotation}
          onChange={onChange}
          onSubmit={onSubmit}
          allowTouch
        />
       
      </header>
    </div>
  );
}
 

export default ImageAnnotations;
