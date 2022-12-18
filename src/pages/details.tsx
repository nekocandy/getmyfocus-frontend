import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DataDashboard(props: any) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.trackmyfocus.co/data/sessions/${id}`
    );
    const data = await response.json();
    console.log(data);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    console.log(searchParams.get("id"));
  }, [searchParams]);

  if (loading) {
    return <span className="text-light-700">Loading...</span>;
  } else {
    return (
      <div className="text-light-700">
        <h1 className="text-xl">Dashboard</h1>

        <div className="w-full pt-8 grid grid-cols-1 lg:grid-cols-5 place-items-center gap-8">
          <div className="col-span-4 lg:h-[70vh]">
            <Line
              className="bg-stone-800"
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  x: {
                      type: 'timeseries',
                  }
              }
              }}
              data={{
                datasets: [
                  {
                    label: "My First Dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
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
              <p className="text-sm">Session Name: Hello</p>
              <p className="text-sm">Session Date: 18/12/2002</p>
              <p className="text-sm">Session Time: 12:00-14:00</p>
            </div>

            <div className="w-full bg-stone-800 rounded-md p-4">
              <h1 className="text-lg">Session Analytics</h1>
              <p className="text-sm">Session ID: {id}</p>
              <p className="text-sm">Distractions: 12</p>
              <p className="text-sm">Session Duration: 2H</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
