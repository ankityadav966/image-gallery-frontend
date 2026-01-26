import React, { useEffect, useState } from "react";
import axios from "axios";

function ImageList() {
  const [images, setImages] = useState([]);

  // ✅ SAME LIVE BACKEND URL FOR ALL APIS
  const API = "https://image-gallery-backend-nro8.onrender.com/api/image";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setImages(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  const likeImage = async (id) => {
    try {
      await axios.post(`${API}/like/${id}`);
      fetchImages(); // refresh list after like
    } catch (err) {
      console.log("Like error:", err);
    }
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
            textAlign: "center"
          }}
        >
          <img
            src={img.imageUrl}
            alt={img.title}
            width="200"
            height="200"
            style={{ objectFit: "cover" }}
          />
          <h3>{img.title}</h3>
          <p>❤️ Likes: {img.likes}</p>

          <button onClick={() => likeImage(img._id)}>
            ❤️ Like
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImageList;
