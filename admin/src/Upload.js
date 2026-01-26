import { useState } from "react";
import axios from "axios";

function Upload({ refresh }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    if (!image) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      await axios.post("https://image,gallery-backend-nr08.onrender.com/api/image/upload", formData);
      alert("Image Uploaded Successfully");

      setTitle("");
      setImage(null);
      refresh();   // list refresh
    } catch (err) {
      console.log(err)
      alert("Upload Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin - Upload Image</h2>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <br /><br />

      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}

export default Upload;
