import React from 'react';
import { Container, Grid, CardMedia, Paper, Slider } from '@mui/material';

const MUIGallery = ({ images = [], setSelectedImage, imagesPerRow, setImagesPerRow }) => {
  // Provide a default value to imagesPerRow if it's undefined
  const safeImagesPerRow = imagesPerRow || 1;

  return (
    <Container
      sx={{
        width: 'calc(100% - 70%)', // Adjust based on leftWidth
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
        padding: '0 !important',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {/* Image List */}
      <Grid container spacing={0} sx={{ flexGrow: 1 }}>
        {images.map((image, index) => (
          <Grid
            item
            key={index}
            xs={12 / safeImagesPerRow} // Use the safe value
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image={image.url}
              alt={`Gallery Image ${index + 1}`}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, filter 0.3s ease',
              }}
              onClick={() => setSelectedImage(image.url)}
              onDragStart={(e) => {
                e.dataTransfer.setData('imageUrl', image.url);
              }}
              draggable
              className="gallery-image"
            />
          </Grid>
        ))}
      </Grid>

      {/* Floating Slider at Bottom */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          width: 'calc(100% - 70%)', // Adjust based on leftWidth
          padding: '10px',
          backgroundColor: '#fff',
          boxSizing: 'border-box',
        }}
      >
        <Slider
          value={safeImagesPerRow} // Controlled value, using a safe value
          min={1}
          max={8}
          step={1}
          onChange={(event, value) => setImagesPerRow(value)}
          aria-labelledby="images-per-row-slider"
        />
      </Paper>
    </Container>
  );
};

export default MUIGallery;
