import "./SignIn.component.css";

import { RiGoogleFill } from "react-icons/ri";
import { useAuth0 } from "@auth0/auth0-react";

export default function SignIn() {
  const { loginWithRedirect } = useAuth0();

  const onLoginClicked = () => {
    loginWithRedirect();
  };

  return (
    <div className="flex justify-center">
      <div className="login">
        <div className="w-md form space-y-8">
          <p>
            <span className="accent"> {">"} </span> welcome
          </p>
          <form className="login-form">
            <button
              onClick={onLoginClicked}
              className="font-bold flex items-center justify-center gap-1"
            >
              <RiGoogleFill className="text-lg" />
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
