import React, { useEffect, useState } from "react";

function ImageList() {
  const [images, setImages] = useState([]);

  const BUCKET_URL =
    "https://ankit-image-gallery-2026.s3.eu-north-1.amazonaws.com";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch(`${BUCKET_URL}/?list-type=2`);
      const text = await res.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");

      const contents = Array.from(xml.getElementsByTagName("Contents"));

      const urls = contents.map((item) => {
        const key = item.getElementsByTagName("Key")[0].textContent;
        return `${BUCKET_URL}/${key}`;
      });

      setImages(urls);
    } catch (err) {
      console.error("S3 ERROR 👉", err);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {images.map((url, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <img
            src={url}
            alt="img"
            width="200"
            height="200"
            style={{ border: "1px solid black" }}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageList;
