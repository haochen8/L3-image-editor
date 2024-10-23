/**
 * Utility functions
 *
 * @file utilities.js
 * @author Hao Chen
 * @version 1.0.0
 */

/**
 * Set the angle to be between 0 and 360 degrees, rounded to the nearest 90 degrees.
 * 
 * @param {number} angle - The original angle
 * @returns {number} - The normalized angle
 */
function roundAngle (angle) {
  angle = angle % 360
  if (angle < 0) {
    angle += 360
  }
  return Math.round(angle / 90) * 90
}

/**
 * Calculate the new dimensions for the rotated image.
 *
 * @param {ImageData} imageData - The image data to rotate
 * @param {number} angle - The angle to rotate the image by
 * @returns {Object} - The new width and height
 */
function calculateDimensions (imageData, angle) {
  if (angle === 90 || angle === 270) {
    return { newWidth: imageData.height, newHeight: imageData.width }
  }
  return { newWidth: imageData.width, newHeight: imageData.height }
}

/**
 * Apply the correct rotation transformation based on the angle.
 *
 * @param {CanvasRenderingContext2D} context - The canvas context
 * @param {number} angle - The angle to rotate the image by
 * @param {number} newWidth - The new width of the rotated image
 * @param {number} newHeight - The new height of the rotated image
 */
function applyRotation (context, angle, newWidth, newHeight) {
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
}

/**
 * Create the rotated image data based on the given angle.
 *
 * @param {ImageData} imageData - The image data to rotate
 * @param {number} angle - The angle to rotate the image by
 * @param {number} newWidth - The new width of the rotated image
 * @param {number} newHeight - The new height of the rotated image
 * @returns {ImageData} - The rotated image data
 */
function createRotatedImageData (imageData, newWidth, newHeight, angle) {
  // Create a canvas and context to draw the rotated image
  const canvas = document.createElement('canvas')
  canvas.width = newWidth
  canvas.height = newHeight
  const context = canvas.getContext('2d')

  context.save()
  applyRotation(context, angle, newWidth, newHeight)


  // Draw original image on the transformed context
  const temporaryCanvas = createTemporaryCanvas(imageData)
  context.drawImage(temporaryCanvas, 0, 0)
  context.restore()

  return context.getImageData(0, 0, newWidth, newHeight)
}

/**
 * Create a temporary canvas to draw the image data.
 * 
 * @param {ImageData} imageData - The image data to rotate
 * @returns 
 */
function createTemporaryCanvas (imageData) {
  const temporaryCanvas = document.createElement('canvas')
  temporaryCanvas.width = imageData.width
  temporaryCanvas.height = imageData.height
  const temporaryContext = temporaryCanvas.getContext('2d')
  temporaryContext.putImageData(imageData, 0, 0)
  return temporaryCanvas
}

/**
 * Rotate an image by a given angle.
 *
 * @param {ImageData} imageData - The image data to rotate
 * @param {number} angle - The angle to rotate the image by
 * @returns {ImageData} - The rotated image data
 */
export function rotateImage (imageData, angle) {
  // Round the angle to the nearest 90 degrees
  const roundedAngle = roundAngle(angle)
  if (roundedAngle === 0 || roundedAngle === 360) {
    return imageData
  }

  // Calculate the new dimensions for the rotated image
  const { newWidth, newHeight } = calculateDimensions(imageData, roundedAngle)

  // Get the rotated image data
  const rotatedImageData = createRotatedImageData(imageData, newWidth, newHeight, roundedAngle)
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
 * Create an image element from a data URL and resolve the image data.
 *
 * @param {string} dataUrl - The data URL of the image
 * @param {Function} resolve - The resolve function for the promise
 * @param {Function} reject - The reject function for the promise
 */
function createImageFromDataURL(dataUrl, resolve, reject) {
  const image = new Image()
  image.onload = () => resolveImageDataFromImage(image, resolve)
  image.onerror = () => reject(new Error('Error loading image'))
  image.src = dataUrl
}

/**
 * Resolve the image data from an image element.
 *
 * @param {HTMLImageElement} image - The image element
 * @param {Function} resolve - The resolve function for the promise
 */
function resolveImageDataFromImage (image, resolve) {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)
  const imageData = context.getImageData(0, 0, image.width, image.height)
  resolve(imageData)
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

    // Create a file reader to read the image file
    const reader = new FileReader()
    reader.onload = () => createImageFromDataURL(reader.result, resolve, reject)
    reader.onerror = () => reject(new Error('Error reading image file'))
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
