/**
 * Image Processor.
 *
 * @file ImageProccessor.js
 * @author Hao Chen
 * @version 1.0.0
 */

import * as filters from './filters.js'
import { rotateImage, imageDataCopy } from './utilities.js'

/**
 * Class for processing images.
 * Provides methods to apply various image manipulations such as rotating, adjusting brightness,
 * contrast, grayscale, noise filters, and inverting colors. It also supports resetting the image to its original state.
 */
export class ImageProcessor {
  /**
   * Create an ImageProcessor object.
   *
   * @param {ImageData} imageData - The image data to process.
   */
  constructor (imageData) {
    this.imageData = imageData
    this.originalImageData = imageDataCopy(imageData)
  }

  /**
   * Rotate the image by a given angle (in degrees).
   *
   * @param {number} angle - The angle to rotate the image by (must be 90, 180, or 270).
   */
  rotate (angle) {
    this.imageData = rotateImage(this.imageData, angle)
  }

  /**
   * Reset the image to its original state (before any filters were applied).
   */
  reset () {
    this.imageData = imageDataCopy(this.originalImageData)
  }

  /**
   * Apply a grayscale filter to the image.
   * Converts the image to shades of gray.
   */
  grayScale () {
    this.imageData = filters.applyGrayscale(this.imageData)
  }

  /**
   * Adjust the brightness of the image.
   *
   * @param {number} value - The value to adjust the brightness by. Positive values increase brightness, negative values decrease it.
   */
  brightness (value) {
    this.imageData = filters.adjustBrightness(this.originalImageData, value)
  }

  /**
   * Adjust the contrast of the image.
   *
   * @param {number} value - The value to adjust the contrast by. Positive values increase contrast, negative values decrease it.
   */
  contrast (value) {
    this.imageData = filters.adjustContrast(this.originalImageData, value)
  }

  /**
   * Apply a noise filter to the image.
   *
   * @param {number} value - The intensity of the noise to apply. Higher values result in more noise.
   */
  noise (value) {
    this.imageData = filters.applyNoise(this.imageData, value)
  }

  /**
   * Apply an invert filter to the image.
   * Inverts the colors of the image (turns light areas dark and dark areas light).
   */
  invert () {
    this.imageData = filters.applyInvert(this.imageData)
  }

  /**
   * Get the processed image data and
   * Return the image data of the canvas.
   *
   * @returns {ImageData} - The image data after filters have been applied.
   */
  getImageData () {
    return this.imageData
  }
}
