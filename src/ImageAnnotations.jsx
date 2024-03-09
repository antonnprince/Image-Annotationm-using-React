import React, { useState } from 'react';
import Annotation from 'react-image-annotation';
import './App.css';

const ImageAnnotations = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});
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
      geometry: { ...geometry },
      data: { ...data, id: Math.random() }
    };

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
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Annotation</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} multiple />
        <div className="image-previews">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className={selectedImageIndex === index ? 'selected' : ''}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        {selectedImageIndex !== null && (
          <>
            <Annotation
              src={images[selectedImageIndex]}
              alt='Uploaded Image'
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
