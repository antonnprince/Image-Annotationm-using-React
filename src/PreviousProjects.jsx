import React from 'react'
import Annotation from 'react-image-annotation';

const PreviousProjects = () => {
  const [annotations, setAnnotations] = useState([]); //array containing all annotations
  const [annotation, setAnnotation] = useState({});//single annotaion object
  const[labell,setLabel] = useState("")

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
    //Update X, Y, Height, and Width
    setX(geometry.x);
    setY(geometry.y);
    setH(geometry.height);
    setW(geometry.width);

    // Add new annotation to the array
    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
    setLabel(data.text)
  };

  return (
    <div>
      
    </div>
  )
}

export default PreviousProjects
