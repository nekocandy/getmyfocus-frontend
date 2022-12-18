import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSearchParams } from "react-router-dom";

Chart.register(...registerables);

export interface ApiData {
  id: string;
  session: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  completedAt: any;
  Focus: Focus[];
}

export interface Focus {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  sessionId: string;
}

export default function DataDashboard(props: any) {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`https://api.trackmyfocus.co/data/data/${id}`);
    const data = await response.json();
    console.log(data);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!data) return;

    console.log(
      data.Focus.map((focus, index) => {
        console.log(focus.createdAt);
        return dayjs(focus.createdAt).format("DD/MM/YYYY HH:mm");
      })
    );
  }, [data]);

  useEffect(() => {
    console.log(searchParams.get("id"));

    fetchData();
  }, [searchParams]);

  if (loading) {
    return <span className="text-light-700">Loading...</span>;
  } else if (!data) {
    return <span className="text-light-700">Data not found...</span>;
  } else {
    return (
      <div className="text-light-700">
        <h1 className="text-xl">Dashboard</h1>

        <div className="w-full pt-8 grid grid-cols-1 lg:grid-cols-5 place-items-center gap-8">
          <div className="w-full col-span-4 h-[70vh]">
            <Line
              className="h-full w-full bg-stone-800"
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    display: true,
                  },
                  x: {
                    type: "timeseries",
                    display: true,
                    time: {
                      parser: "dd/MM/yyyy HH:mm",
                      displayFormats: {
                        hour: "dd/MM/yyyy HH:mm",
                      },
                    },
                  },
                },
              }}
              data={{
                labels: data.Focus.reverse().map((focus, index) =>
                  dayjs(focus.createdAt).format("DD/MM/YYYY HH:mm")
                ),
                datasets: [
                  {
                    label: "Values",
                    data: data.Focus.reverse().map((focus, index) => index + 1),
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                  },
                ],
              }}
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-5">
            <div className="w-full bg-stone-800 rounded-md p-4">
              <h1 className="text-lg">Session Info</h1>
              <p className="text-sm">Session ID: {id}</p>
              <p className="text-sm">Session Name: {data.session}</p>
              <p className="text-sm">
                Session Date: {dayjs(data.createdAt).format("DD/MM/YYYY")}
              </p>
              <p className="text-sm">
                Session Time: {dayjs(data.createdAt).format("HH:MM")}
              </p>
            </div>

            <div className="w-full bg-stone-800 rounded-md p-4">
              <h1 className="text-lg">Session Analytics</h1>
              <p className="text-sm">Session ID: {id}</p>
              <p className="text-sm">Distractions: {data.Focus.length}</p>
              <p className="text-sm">
                Session Duration: {data.completedAt ? "2H" : "ongoing"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
