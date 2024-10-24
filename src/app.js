/**
 * Test application for the image processor module.
 *
 * @file test.js
 * @author Hao Chen
 * @version 1.0.0
 */

import { ImageProcessor, loadImage } from './index.js'

// Get elements from the DOM
const fileInput = document.getElementById('fileInput')
const rotateButton = document.getElementById('rotateButton')
const resetButton = document.getElementById('resetButton')
const grayScaleButton = document.getElementById('grayScaleButton')
const contrastInput = document.getElementById('contrastInput')
const brightnessInput = document.getElementById('brightnessInput')
const noiseButton = document.getElementById('noiseButton')
const invertButton = document.getElementById('invertButton')
const errorMessage = document.getElementById('errorMessage')
const saveButton = document.getElementById('saveButton')

// Get the canvas and context
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d', { willREADFrequently: true })

let processor

// Event listeners for the drop zone
['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
  canvas.addEventListener(eventName, (event) => {
    event.preventDefault()
    event.stopPropagation()
  })
})

canvas.addEventListener('drop', async (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    try {
      const imageData = await loadImage(file)
      // Save the original image data
      processor = new ImageProcessor(imageData)
      displayImage(processor.getImageData())
    } catch (error) {
      console.error(error)
      errorMessage.textContent = 'Invalid image file, try png or jpg'
    }
  }
})

canvas.addEventListener('click', () => fileInput.click())

// Event listener for the file input
fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0]
  try {
    const imageData = await loadImage(file)
    // Save the original image data
    processor = new ImageProcessor(imageData)
    displayImage(processor.getImageData())
  } catch (error) {
    console.error(error)
    errorMessage.textContent = 'Invalid image file, try png or jpg'
  }
})

// Event listener for the rotate button
rotateButton.addEventListener('click', () => {
  if (processor) {
    errorMessage.textContent = ''
    processor.rotate(90)
    displayImage(processor.getImageData())
  } else {
    errorMessage.textContent = 'There is none image to rotate'
  }
})

// Event listener for the grayscale button
grayScaleButton.addEventListener('click', () => {
  if (processor) {
    errorMessage.textContent = ''
    processor.grayScale()
    displayImage(processor.getImageData())
  } else {
    errorMessage.textContent = 'There is none image to apply grayscale'
  }
})

// Event listener for the noise button
noiseButton.addEventListener('click', () => {
  if (processor) {
    errorMessage.textContent = ''
    processor.noise()
    displayImage(processor.getImageData())
  } else {
    errorMessage.textContent = 'There is none image to apply noise'
  }
})

// Event listener for the invert button
invertButton.addEventListener('click', () => {
  if (processor) {
    errorMessage.textContent = ''
    processor.invert()
    displayImage(processor.getImageData())
  } else {
    errorMessage.textContent = 'There is none image to invert'
  }
})

// Event listener for the brightness input
brightnessInput.addEventListener('input', (event) => {
  if (processor) {
    const value = parseInt(event.target.value, 10)
    processor.brightness(value)
    displayImage(processor.getImageData())
  } else {
    errorMessage.textContent = 'There is none image to adjust brightness'
  }
})

// Event listener for the blur button
contrastInput.addEventListener('input', (event) => {
  if (processor) {
    errorMessage.textContent = ''
    const value = parseFloat(event.target.value)
    processor.contrast(value)
    displayImage(processor.getImageData())
  } else {
    errorMessage.textContent = 'There is none image to adjust contrast'
  }
})

// Event listener for the reset button
resetButton.addEventListener('click', () => {
  if (processor) {
    errorMessage.textContent = ''
    processor.reset()
    displayImage(processor.getImageData())
  } else {
    errorMessage.textContent = 'There is none image to reset'
  }
})

// Event listener for the save button
saveButton.addEventListener('click', () => {
  if (processor) {
    errorMessage.textContent = ''
    const link = document.createElement('a')
    link.download = 'edited_image.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } else {
    errorMessage.textContent = 'There is none image to save'
  }
})

// Draw the canvas text
function drawCanvasText() {
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#888';
  context.font = '20px Arial';
  context.textAlign = 'center';
  context.fillText('Drop and drop an image or click to upload', canvas.width / 2, canvas.height / 2);
}

/**
 * Display the image on the canvas.
 *
 * @param {ImageData} imageData - The image data to display.
 */
function displayImage (imageData) {
  canvas.width = imageData.width
  canvas.height = imageData.height
  errorMessage.textContent = ''
  context.putImageData(imageData, 0, 0)
}

canvas.width = 800;
canvas.height = 600;
drawCanvasText();