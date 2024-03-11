import React from 'react'
import ImageAnnotations from './ImageAnnotations';
import { Route,BrowserRouter, Routes } from 'react-router-dom';
import Nav from './Nav';
import PreviousProjects from './PreviousProjects';
import TrainModel from './TrainModel';

const App = () => {
  return (
    <div className='bg-slate-300 h-screen w-screen'>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Nav/>}>
              <Route index element={<PreviousProjects/>}/>
              <Route path='create' element={<ImageAnnotations />}/>
              <Route path='train' element={<TrainModel/>}/>
          </Route>
      </Routes>
      </BrowserRouter> 
    </div>
  )
}




export default App;
