import { useState } from "react";
import Login from "./Login";
import Upload from "./Upload";
import ImageList from "./ImageList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div>
      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>
        Logout
      </button>

      <Upload refresh={() => {}} />
      <ImageList refreshFlag={false} />
    </div>
  );
}

export default App;
