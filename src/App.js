import React, { useState } from 'react';
import Layout from './components/Layout';
import MUIGallery from './components/MUIGallery';
import Sequencer from './components/Sequencer';
import Viewer from './components/Viewer';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [imagesPerRow, setImagesPerRow] = useState(4);
  const [leftWidth, setLeftWidth] = useState(70); // Adjust for layout

  const handleSelectFolder = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const imageFiles = [];

      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(entry.name)) {
          const file = await entry.getFile();
          const fileUrl = URL.createObjectURL(file);
          imageFiles.push({ url: fileUrl });
        }
      }
      setImages(imageFiles);
      if (imageFiles.length > 0) {
        setSelectedImage(imageFiles[0].url);
      }
    } catch (error) {
      console.error("Error accessing the directory:", error);
    }
  };

  return (
    <Layout>
      <Viewer 
        selectedImage={selectedImage} 
        handleSelectFolder={handleSelectFolder} 
      />
      <Sequencer 
        favorites={favorites} 
        setFavorites={setFavorites} 
        leftWidth={leftWidth} 
        setSelectedImage={setSelectedImage} 
      />
      <MUIGallery 
        images={images} 
        setSelectedImage={setSelectedImage} 
        imagesPerRow={imagesPerRow} 
        setImagesPerRow={setImagesPerRow} 
        leftWidth={leftWidth}
      />
    </Layout>
  );
};

export default App;
