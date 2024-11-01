import React, { useState } from 'react';
import { Box, Button, Grid, Card, CardMedia, Slider } from '@mui/material';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [leftWidth, setLeftWidth] = useState(70); // Initial width for the left section as a percentage
  const [imagesPerRow, setImagesPerRow] = useState(4); // Number of images per row in the right section

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
        setSelectedImage(imageFiles[0].url); // Set the first image as the selected image initially
      }
    } catch (error) {
      console.error("Error accessing the directory:", error);
    }
  };

  // Update selected image on click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Handle drag to resize left and right sections
  const handleDrag = (e) => {
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 20 && newLeftWidth < 80) { // Restrict resizing limits
      setLeftWidth(newLeftWidth);
    }
  };

  // Handle slider change for the number of images per row
  const handleSliderChange = (event, value) => {
    setImagesPerRow(value);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Side: Selected Image */}
      <Box
        sx={{
          width: `${leftWidth}%`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: '#333',
          padding: '20px 0 0', // Top padding only
          boxSizing: 'border-box',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSelectFolder}
          style={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          Select Folder
        </Button>

        {selectedImage && (
          <CardMedia
            component="img"
            image={selectedImage}
            alt="Selected Image"
            sx={{
              marginTop: '60px', // 10px below the select button
              width: '100%',
              height: 'calc(100% - 60px)', // Adjust to take full height with no gaps
              objectFit: 'contain',
            }}
          />
        )}
      </Box>

      {/* Divider for resizing */}
      <div
        style={{
          width: '5px',
          cursor: 'col-resize',
          backgroundColor: '#ddd',
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          document.addEventListener('mousemove', handleDrag);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleDrag);
          });
        }}
      />

      {/* Right Side: Image List and Slider */}
      <Box
        sx={{
          width: `${100 - leftWidth}%`,
          height: '100vh',
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f0f0f0',
          boxSizing: 'border-box',
        }}
      >
        {/* Image List */}
        <Grid container spacing={2} columns={imagesPerRow}>
          {images.map((image, index) => (
            <Grid item xs={12 / imagesPerRow} key={index}>
              <Card sx={{ boxShadow: 'none' }}>
                <CardMedia
                  component="img"
                  image={image.url}
                  alt={`Gallery Image ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
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

        {/* Slider for adjusting images per row */}
        <Box sx={{ marginTop: '20px' }}>
          <Slider
            value={imagesPerRow}
            min={1}
            max={8}
            step={1}
            onChange={handleSliderChange}
            aria-labelledby="images-per-row-slider"
          />
        </Box>
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
