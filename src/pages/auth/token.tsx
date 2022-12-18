import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function GetToken() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const fetchToken = async () => {
    const res = await fetch("https://api.trackmyfocus.co/createToken", {
      method: "POST",
      body: JSON.stringify({
        email: user?.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json());

    const newLocation = `trackmyfocus://auth?token=${res}`;
    (window.location as any) = newLocation;
    navigate("/");
  };

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      return navigate("/");
    }

    fetchToken();
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading Authentication State....</div>;
  } else {
    <div>fetching token</div>;
  }
}
