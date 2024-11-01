import React from 'react';
import { Box, Button, CardMedia } from '@mui/material';

const Viewer = ({ selectedImage, handleSelectFolder }) => {
  return (
    <Box
      sx={{
        width: '70%', // Fixed width for the viewer
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#333',
        padding: '20px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleSelectFolder}
        sx={{ marginBottom: '20px' }}
      >
        Select Folder
      </Button>

      {selectedImage && (
        <CardMedia
          component="img"
          image={selectedImage}
          alt="Selected Image"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            maxHeight: '80vh',
          }}
        />
      )}
    </Box>
  );
};

export default Viewer;
