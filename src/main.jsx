import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SkeletonTheme } from "react-loading-skeleton";

createRoot(document.getElementById("root")).render(
  <SkeletonTheme baseColor="#ffff" highlightColor="#0b0a0a">
    <App />
  </SkeletonTheme>
);
