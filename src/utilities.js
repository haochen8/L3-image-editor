/**
 * Utility functions
 *
 * @file utilities.js
 * @author Hao Chen
 * @version 1.0.0
 */

/**
 * Rotate an image by a given angle.
 *
 * @param {ImageData} imageData - The image data to rotate
 * @param {number} angle - The angle to rotate the image by
 * @returns {ImageData} - The rotated image data
 */
export function rotateImage (imageData, angle) {
  // Set angle to a value between 0 and 360
  angle = angle % 360
  if (angle < 0) {
    angle += 360
  }

  // Round angle to the nearest 90 degrees
  angle = Math.round(angle / 90) * 90

  // If angle is 0 or 360, return the original image
  if (angle === 0 || angle === 360) {
    return imageData
  }

  // Set new dimensions for the rotated image
  let newWidth, newHeight
  if (angle === 90 || angle === 270) {
    newWidth = imageData.height
    newHeight = imageData.width
  } else {
    // If angle is 180 degrees
    newWidth = imageData.width
    newHeight = imageData.height
  }

  // Create a new canvas and context for the rotated image
  const canvas = document.createElement('canvas')
  canvas.width = newWidth
  canvas.height = newHeight
  const context = canvas.getContext('2d')

  // Apply transformation based on angle
  context.save()
  if (angle === 90) {
    context.translate(newWidth, 0)
    context.rotate(Math.PI / 2)
  } else if (angle === 180) {
    context.translate(newWidth, newHeight)
    context.rotate(Math.PI)
  } else if (angle === 270) {
    context.translate(0, newHeight)
    context.rotate((3 * Math.PI) / 2)
  }

  // Create temporary canvas and context for the original image
  const temporaryCanvas = document.createElement('canvas')
  temporaryCanvas.width = imageData.width
  temporaryCanvas.height = imageData.height
  const temporaryContext = temporaryCanvas.getContext('2d')
  temporaryContext.putImageData(imageData, 0, 0)

  // Draw original image on the transformed context
  context.drawImage(temporaryCanvas, 0, 0)
  context.restore()

  // Get the rotated image data and return it
  const rotatedImageData = context.getImageData(0, 0, newWidth, newHeight)

  return rotatedImageData
}

/**
 * Check if a file is a valid image file.
 *
 * @param {File} file - The file to validate.
 * @returns {boolean} - Whether the file is a valid image file.
 */
export function isValidImageType (file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif']
  return validTypes.includes(file.type)
}

/**
 * Load an image from a given source.
 *
 * @param {string|File} file - The source of the image to load.
 * @returns {Promise<ImageData>} - A promise that resolves with the image data.
 */
export function loadImage (file) {
  return new Promise((resolve, reject) => {
    // If the file is not a valid image file
    if (!isValidImageType(file)) {
      reject(new Error('Invalid image file'))
    }

    // Create a new FileReader
    const reader = new FileReader()
    /**
     * When the file is loaded as a data URL, create a new image and set the source to the data.
     */
    reader.onload = () => {
      const image = new Image()
      /**
       * When the image is loaded, create a canvas and context to draw the image.
       */
      image.onload = () => {
        // Create a canvas and context to draw the image
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0)
        const imageData = context.getImageData(0, 0, image.width, image.height)
        resolve(imageData)
      }
      // Set the image source to the data
      image.src = reader.result

      /**
       * When the image fails to load, reject the promise.
       */
      image.onerror = () => {
        reject(new Error('Error loading image'))
      }

      /**
       * When there is an error loading the image, reject the promise.
       */
      reader.onerror = () => {
        reject(new Error('Error loading image'))
      }
    }
    // Read the file as a data URL
    reader.readAsDataURL(file)
  })
}

/**
 * Create a copy of an image data object with 8-bit clamped array data.
 *
 * @param {ImageData} imageData - The image data to copy.
 * @returns {ImageData} - The copied image data.
 */
export function imageDataCopy (imageData) {
  return new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height)
}
