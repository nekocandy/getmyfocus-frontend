import dayjs from "dayjs";
import { useNavigate } from "react-router";
import "./SessionCard.component.css";

interface Data {
  id: string;
  session: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  completedAt: any;
}

interface SessionCardProps {
  index: number;
  id: string;
  sessionName: string;
  data: Data;
}

export default function SessionCard(props: SessionCardProps) {
  const navigate = useNavigate();

  const onDetailsButtonClicked = () => {
    const params = new URLSearchParams();
    params.append("id", props.id);
    navigate(`/details?${params.toString()}`);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="box">
          <div className="content">
            <h2>{props.index}</h2>
            <h3>{props.sessionName}</h3>
            <p>
              <ul>
                <li>Duration: {props.data.completedAt ?? "ongoing"}</li>
                <li>Date: {dayjs(props.data.createdAt).format("DD/MM/YYYY")}</li>
              </ul>
            </p>
            <button onClick={onDetailsButtonClicked}>See More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
