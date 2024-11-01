// src/components/Sequencer.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Slider } from '@mui/material';

const Sequencer = ({ favorites, setFavorites, leftWidth, setSelectedImage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interval, setIntervalValue] = useState(1); // Adjusted name to avoid conflicts
  const [draggingIndex, setDraggingIndex] = useState(null); // Track index being dragged

  const playImages = () => {
    if (favorites.length === 0) return;
    setIsPlaying(true); // Set play state to true
  };

  const stopImages = () => {
    setIsPlaying(false); // Set play state to false
    setCurrentIndex(0); // Optionally reset to the first image
  };

  const clearFavorites = () => {
    setFavorites([]); // Clear all images
    setIsPlaying(false); // Stop playing if it was playing
    setCurrentIndex(0); // Reset to the first image
  };

  const removeImage = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    if (currentIndex >= updatedFavorites.length) {
      setCurrentIndex(0);
    }
  };

  // Effect to handle image transition
  useEffect(() => {
    if (!isPlaying) return; // Only proceed if isPlaying is true

    // Update viewer with the current image
    setSelectedImage(favorites[currentIndex]);

    // Move to the next image based on interval
    const id = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % favorites.length); // Loop to start
    }, interval * 1000);

    return () => clearTimeout(id); // Cleanup timeout on unmount or when dependencies change
  }, [isPlaying, currentIndex, interval, favorites, setSelectedImage]);

  // Handle drag-and-drop
  const handleDrop = (event) => {
    event.preventDefault();
    const imageUrl = event.dataTransfer.getData('imageUrl');
    if (imageUrl && !favorites.includes(imageUrl)) {
      setFavorites([...favorites, imageUrl]);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  // Track the start of dragging for an image
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index); // Set the index being dragged
    setDraggingIndex(index);
  };

  // Check if the dragged image was dropped outside to remove it
  const handleDragEnd = () => {
    if (draggingIndex !== null) {
      removeImage(draggingIndex); // Remove the dragged image if it left the area
      setDraggingIndex(null);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: `${leftWidth}%`,
        height: '150px',
        backgroundColor: '#222',
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        boxSizing: 'border-box',
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Image List */}
      <Box sx={{ display: 'flex', overflowX: 'auto', marginBottom: '10px' }}>
        {favorites.map((image, index) => (
          <Box
            key={index}
            sx={{
              marginRight: '10px',
              width: '100px',
              height: '100px',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              cursor: 'pointer',
              border: currentIndex === index ? '2px solid blue' : 'none',
            }}
            onClick={() => setSelectedImage(image)}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Box>

      {/* Toolbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button variant="contained" onClick={isPlaying ? stopImages : playImages}>
          {isPlaying ? 'Stop' : 'Play'}
        </Button>
        <Button variant="contained" color="secondary" onClick={clearFavorites}>
          Clear
        </Button>
        <Slider
          value={interval}
          min={1}
          max={3}
          step={1}
          onChange={(event, value) => setIntervalValue(value)}
          aria-labelledby="interval-slider"
          sx={{ width: '150px' }}
        />
      </Box>
    </Box>
  );
};

export default Sequencer;
