## Manual Test Cases

| Test Case ID | Test Case Description                   | Input Data                     | Expected Result                           |
|--------------|-----------------------------------------|--------------------------------|-------------------------------------------|
| TC-01        | Upload an image using drag-and-drop.    | JPEG/PNG/GIF image file        | Image is displayed on canvas.             |
| TC-02       | Upload an image using file selector.    | JPEG/PNG/GIF image file        | Image is displayed on canvas.             |
| TC-03       | Display the uploaded image on canvas.   | JPEG/PNG/GIF image file        | Image is displayed in full view.          |
| TC-04       | Save the edited image.                  | Edited image                   | Image is saved in PNG format.             |
| TC-05       | Apply a grayscale filter to the image.  | Image data                     | Image is converted to grayscale.          |
| TC-06       | Invert the colors of the image.         | Image data                     | Image colors are inverted.                |
| TC-07       | Add noise to the image.                 | Image data                     | Image with noise effect applied.          |
| TC-08       | Adjust brightness using slider.         | Brightness value (-100 to +100)| Image brightness is adjusted accordingly. |
| TC-09       | Adjust contrast using slider.           | Contrast value (-100 to +100)  | Image contrast is adjusted accordingly.   |
| TC-10       | Rotate image by 90 degrees.             | Rotate button click            | Image is rotated by 90 degrees.           |
| TC-11       | Reset the image to its original state.  | Reset button click             | Image is restored to its original version.|
| TC-12        | Drag-and-drop image onto canvas.        | JPEG/PNG/GIF image file        | Image is displayed on canvas.             |
| TC-13        | Verify that buttons and sliders are visually labeled | N/A                | Controls are visually labeled and grouped logically. |
| TC-14       | Attempt to upload an invalid file type. | Non-image file                 | Error message is displayed.              |
| TC-15        | Simulate an upload failure.             | Corrupt image file             | Error message is displayed and retry instructions are shown. |
| TC-16        | Verify compatibility with different browsers. | Chrome, Firefox, Edge, Safari | Application works correctly in each browser. |
| TC-17        | Test usability for a novice user.       | N/A                            | User is able to perform basic edits without instructions. |
| TC-18        | Navigate controls using keyboard only.  | Keyboard navigation            | All controls are accessible and functional. |
| TC-19        | Verify that uploaded images are not stored on server. | Upload image       | Image data is processed locally.         |
