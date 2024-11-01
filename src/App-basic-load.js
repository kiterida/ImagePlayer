import React, { useState } from 'react';
import { Button, Grid, Card, CardMedia, Slider, Typography, Box } from '@mui/material';

const App = () => {
  const [images, setImages] = useState([]);
  const [imagesPerRow, setImagesPerRow] = useState(4); // Default 4 images per row

  // Function to open the directory picker and load images
  const handleSelectFolder = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const imageFiles = [];

      // Loop through files in the selected directory
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(entry.name)) {
          const file = await entry.getFile();
          const fileUrl = URL.createObjectURL(file);
          imageFiles.push({ url: fileUrl });
        }
      }
      setImages(imageFiles); // Update state with images
    } catch (error) {
      console.error("Error accessing the directory:", error);
    }
  };

  // Handle slider change to set images per row
  const handleSliderChange = (event, value) => {
    setImagesPerRow(value);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Button variant="contained" color="primary" onClick={handleSelectFolder}>
        Select Folder
      </Button>

      <Grid container spacing={0} style={{ marginTop: '20px' }}>
        {images.map((image, index) => (
          <Grid item xs={12 / imagesPerRow} key={index}>
            <Card style={{ boxShadow: 'none' }}>
              <CardMedia
                component="img"
                image={image.url}
                alt="Gallery Image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease, filter 0.3s ease',
                }}
                className="gallery-image"
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating toolbar with slider */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#333',
          color: '#fff',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <Typography variant="body1">Images per Row</Typography>
        <Slider
          value={imagesPerRow}
          onChange={handleSliderChange}
          min={1}
          max={8}
          step={1}
          sx={{
            width: '200px',
            color: '#fff',
          }}
        />
      </Box>

      <style>
        {`
          .gallery-image:hover {
            transform: scale(1.1);
            filter: brightness(0.8);
          }
        `}
      </style>
    </div>
  );
};

export default App;
