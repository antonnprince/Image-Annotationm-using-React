import React, { useState } from 'react';
import Annotation from 'react-image-annotation';
import human from "./human7.jpg"


function App() {
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});
  const[editImage, setEditImage] = useState(false);

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
    console.log(annotation)
  }

  const onEdit = () => {
    if (!editImage) {
      const prevAnnotation = {
        data: { text: 'aaaa' },
        geometry: {
          height: 23.6,
          width: 30,
          x: 43.5454,
          y: 19.01901901901902,
        }
      };
      setAnnotation(prevAnnotation);
    } else {
      setAnnotation({});
      setAnnotations([]);
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
  
        <div className='w-1/2 h-1/4 mx-auto my-24'>
        {onEdit}
        <Annotation
          src={human}
          alt='Two pebbles anthropomorphized holding hands'
          annotations={annotations}
          value={annotation}
          onChange={onChange}
          onSubmit={onSubmit}
          allowTouch
        />
        </div>
        <button className='bg-sky-300 px-8 py-2 rounded-xl'
        onClick={()=>setEditImage(true)}
        >
          Edit Image
        </button>
      </header>
    </div>
  );
}

export default App;
