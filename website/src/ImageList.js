import React, { useEffect, useState } from "react";
import axios from "axios";

function ImageList() {
  const [images, setImages] = useState([]);

  // 🔴 BACKEND LIVE URL YA LOCAL
const API = "https://image-gallery-backend.onrender.com/api/image";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get(`${API}/all`);
    setImages(res.data);
  };

  const likeImage = async (id) => {
    await axios.post(`${API}/like/${id}`);
    fetchImages();   // refresh list
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {images.map((img) => (
        <div
          key={img._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            width: "220px",
          }}
        >
          <img
            src={img.imageUrl}
            alt={img.title}
            width="200"
            height="200"
          />
          <h3>{img.title}</h3>
          <p>Likes: {img.likes}</p>
          <button onClick={() => likeImage(img._id)}>❤️ Like</button>
        </div>
      ))}
    </div>
  );
}

export default ImageList;
