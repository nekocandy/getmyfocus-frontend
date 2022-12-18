import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard/SessionCard";
import SignIn from "../components/SignIn/SignIn";

export interface Data {
  id: string;
  session: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  completedAt: any;
}

export default function HomePage() {
  const [data, setData] = useState<Data[]>([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const fetchData = async () => {
    const response = await fetch(
      `https://api.trackmyfocus.co/data/sessions/${user?.email!!}`
    );

    const localData = await response.json();
    setData(localData);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return;

    fetchData();
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isAuthenticated && user) {
    if (!data || !data.length) {
      return <p>There are no registered sessions</p>;
    } else {
      return (
        <div className="text-light-700">
          <div className="pt-1 pb-2">
            <span className="text-lg">Hi {user.name},</span>
          </div>

          <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((data, index) => (
              <div>
                <SessionCard
                  key={data.id}
                  index={index + 1}
                  id={data.id}
                  sessionName={data.session}
                  data={data}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  } else {
    return <SignIn />;
  }
}
