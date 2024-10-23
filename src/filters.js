/**
 * Add filters to the image
 *
 * @file filters.js
 * @author Hao Chen
 * @version 1.0.0
 */

import { imageDataCopy } from './utilities.js'

/**
 * Apply a filter to the image. 
 *
 * @param {*} imageData - The image data to apply the filter
 * @param {*} pixel - The pixel value to apply the filter
 * @returns 
 */
function applyFilter (imageData, pixel) {
  const newImageData = imageDataCopy(imageData)
  const data = newImageData.data

  for (let i = 0; i < data.length; i += 4) {
    const [red, green, blue] = pixel(data[i], data[i + 1], data[i + 2])
    data[i] = red
    data[i + 1] = green
    data[i + 2] = blue
  }
  return newImageData
}

/**
 * Clamp a value to be between 0 and 255. 
 * 
 * @param {*} value - The value to clamp
 * @returns - The clamped value
 */
function clamp (value) {
  return Math.min(255, Math.max(0, value))
}

/**
 * Apply a gray scale filter to the image.
 *
 * @param {ImageData} imageData - The image data to apply the gray scale filter
 * @returns {ImageData} - The image data of the canvas
 */
export function applyGrayscale (imageData) {
  // NFSC formula for gray scale
  const formula = (red, green, blue ) => {
    const gray = 0.299 * red + 0.587 * green + 0.114 * blue
    return [gray, gray, gray]
  }
  return applyFilter(imageData, formula)
}

/**
 * Adjust the brightness of the image.
 *
 * @param {ImageData} imageData - The image data to adjust the brightness
 * @param {number} value - The value to adjust the brightness by
 * @returns {ImageData} - The image data of the canvas
 */
export function adjustBrightness (imageData, value) {

  const brightness = value / 100 * 255

  // Add the brightness value to each pixel
  const pixel = (red, green, blue) => [
    clamp(red + brightness),
    clamp(green + brightness),
    clamp(blue + brightness)
  ]
  return applyFilter(imageData, pixel)
}

/**
 * Apply a contrast filter to the image.
 *
 * @param {ImageData} imageData - The image data to apply the contrast filter
 * @param {number} value - The value to adjust the contrast by
 * @returns {ImageData} - The image data of the canvas
 */
export function adjustContrast (imageData, value) {
  
  const contrastFactor = (259 * (value + 255)) / (255 * (259 - value))

  // Apply the contrast adjustment to each pixel using the formula
  const pixel = (red, green, blue) => [
    clamp(contrastFactor * (red - 128) + 128),
    clamp(contrastFactor * (green - 128) + 128),
    clamp(contrastFactor * (blue - 128) + 128)
  ]
  return applyFilter(imageData, pixel)
}

/**
 * Apply a noise filter to the image.
 *
 * @param {ImageData} imageData - The image data to apply the noise filter
 * @returns {ImageData} - The image data of the canvas
 */
export function applyNoise (imageData) {
  // Create a copy of the image data
  const newImageData = imageDataCopy(imageData)
  const data = newImageData.data

  /**
   * Clamp a value to be between 0 and 255.
   *
   * @param {number} value - The value to clamp
   * @returns {number} - The clamped value
   */
  const clamp = (value) => Math.min(255, Math.max(0, value))

  const amount = 50

  // Apply the noise adjustment to each pixel using the noise formula
  for (let i = 0; i < data.length; i += 4) {
    // Calculation of the noise formula
    const noiseFormula = (Math.random() * 2 - 1) * amount
    data[i] = clamp(data[i] + noiseFormula) // Red
    data[i + 1] = clamp(data[i + 1] + noiseFormula) // Green
    data[i + 2] = clamp(data[i + 2] + noiseFormula) // Blue
  }
  return newImageData
}

/**
 * Apply a invert filter to the image.
 *
 * @param {ImageData} imageData - The image data to apply the noise filter
 * @returns {ImageData} - The image data of the canvas
 */
export function applyInvert (imageData) {
  // Create a copy of the image data
  const newImageData = imageDataCopy(imageData)
  const data = newImageData.data

  // Subtracting 255 with image data to create invert filter
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i] // Red
    data[i + 1] = 255 - data[i + 1] // Green
    data[i + 2] = 255 - data[i + 2] // Blue
  }
  return newImageData
}
