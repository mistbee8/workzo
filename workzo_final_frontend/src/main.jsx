
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./utils/UserContext"; // Import UserProvider

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(

    <GoogleOAuthProvider clientId={googleClientId}>

        <App />
  
    </GoogleOAuthProvider>

);
