import "./App.css";

import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <Home/> */}
      <RouterProvider router={Router}/>
    </>
  );
}

export default App;
