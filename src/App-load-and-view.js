import React, { useState } from 'react';
import { Box, Button, Grid, Card, CardMedia } from '@mui/material';

const App = () => {
  const [images, setImages] = useState([]);
  const [topImage, setTopImage] = useState(null);
  const [topHeight, setTopHeight] = useState(60); // Percentage height for top section
  const [isResizing, setIsResizing] = useState(false);

  // Function to open the directory picker and load images
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
        setTopImage(imageFiles[0].url); // Set the first image as the top image initially
      }
    } catch (error) {
      console.error("Error accessing the directory:", error);
    }
  };

  // Handle resizing
  const handleMouseDown = () => setIsResizing(true);
  const handleMouseMove = (e) => {
    if (isResizing) {
      const newTopHeight = (e.clientY / window.innerHeight) * 100;
      if (newTopHeight > 20 && newTopHeight < 80) { // Limit resizing range
        setTopHeight(newTopHeight);
      }
    }
  };
  const handleMouseUp = () => setIsResizing(false);

  // Update top image on click
  const handleImageClick = (imageUrl) => {
    setTopImage(imageUrl);
  };

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Select Folder Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSelectFolder}>
          Select Folder
        </Button>
      </Box>

      {/* Top Section */}
      <Box
        sx={{
          height: `${topHeight}vh`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#333',
          color: '#fff',
          position: 'relative',
        }}
      >
        {topImage ? (
          <CardMedia
            component="img"
            image={topImage}
            alt="Selected Image"
            sx={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        ) : (
          <div>Select an image to display</div>
        )}
      </Box>

      {/* Divider */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          height: '5px',
          cursor: 'row-resize',
          backgroundColor: '#999',
        }}
      ></div>

      {/* Bottom Section */}
      <Box sx={{ height: `${100 - topHeight}vh`, overflowY: 'auto', padding: '0 20px' }}>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          {images.map((image, index) => (
            <Grid item xs={12 / 4} key={index}>
              <Card sx={{ boxShadow: 'none' }}>
                <CardMedia
                  component="img"
                  image={image.url}
                  alt={`Gallery Image ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                  }}
                  onClick={() => handleImageClick(image.url)}
                  className="gallery-image"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <style>
        {`
          .gallery-image:hover {
            transform: scale(1.05);
            filter: brightness(0.8);
          }
        `}
      </style>
    </div>
  );
};

export default App;
