import { useState } from 'react';
import Annotation from 'react-image-annotation';
import IMAGE_URL from './h2.png'
import './App.css';

const ImageAnnotations = () => {
    
    const [annotations, setAnnotations] = useState([]);
    const [annotation, setAnnotation] = useState({});

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
       
        <Annotation
          src={IMAGE_URL}
          alt='Two pebbles anthropomorphized holding hands'
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
