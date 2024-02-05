import React, { useRef, useEffect } from "react";
import placeholderImg from "@/public/teste.png";

const PixelateCanvas = () => {
  const canvasRef = useRef(null);

  const pixelate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new window.Image(); // Use the HTMLImageElement constructor

    // turn off image smoothing - this will give the pixelated effect
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    const sizes = [1, 2, 4, 5, 6, 7, 100]; // Array of size values

    // Index to keep track of the current size
    let currentIndex = 0;

    // wait until the image is actually available
    img.onload = function () {
      // Use the current size value
      const size = sizes[currentIndex] * 0.01;

      // cache scaled width and height
      const w = canvas.width * size;
      const h = canvas.height * size;

      console.log(size);
      // draw the original image to the scaled size
      ctx.drawImage(img, 0, 0, w, h);

      // then draw that scaled image thumb back to fill the canvas
      // as smoothing is off, the result will be pixelated
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

      // Increment the index for the next size value
      currentIndex++;

      // If there are more sizes, load the image again
      if (currentIndex < sizes.length) {
        img.src = placeholderImg.src; // Access the source from the Image component
      }
    };

    // Initial load
    img.src = placeholderImg.src; // Access the source from the Image component
  };

  useEffect(() => {
    pixelate();
  }, []); // Run the pixelate function once when the component mounts

  return (
    <div>
      <canvas ref={canvasRef} width="500" height="500"></canvas>
    </div>
  );
};

export default PixelateCanvas;
