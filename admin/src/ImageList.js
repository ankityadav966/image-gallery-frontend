import { useEffect, useState } from "react";
import axios from "axios";

function ImageList({ refreshFlag }) {
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const getImages = async () => {
    const res = await axios.get("http://localhost:5000/api/image/all");
    setImages(res.data);
  };

  const deleteImage = async (id) => {
    await axios.delete(`http://localhost:5000/api/image/delete/${id}`);
    alert("Image Deleted");
    getImages();
  };

  const updateTitle = async (id) => {
    await axios.put(`http://localhost:5000/api/image/update/${id}`, {
      title: newTitle
    });

    alert("Title Updated");
    setEditId(null);
    getImages();
  };

  useEffect(() => {
    getImages();
  }, [refreshFlag]);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Uploaded Images</h2>

      {images.map((img) => (
        <div key={img._id} style={{ marginBottom: "30px" }}>
         <img src={img.imageUrl} width="200" alt={img.title} />

          <br />

          {editId === img._id ? (
            <>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button onClick={() => updateTitle(img._id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{img.title}</p>
              <p>Likes: {img.likes}</p>

              <button onClick={() => {
                setEditId(img._id);
                setNewTitle(img.title);
              }}>
                Edit
              </button>

              <button onClick={() => deleteImage(img._id)}>
                Delete
              </button>
            </>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default ImageList;
