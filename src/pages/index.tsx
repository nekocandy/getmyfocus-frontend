import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import SignIn from "../components/SignIn/SignIn";

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isAuthenticated && user) {
    return <p>Hi {user.name}</p>;
  } else {
    return <SignIn />;
  }
}
