import { useNavigate } from "react-router";
import "./SessionCard.component.css";

interface SessionCardProps {
  index: number;
  id: string;
  sessionName: string;
}

export default function SessionCard(props: SessionCardProps) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <div className="box">
          <div className="content">
            <h2>{props.index}</h2>
            <h3>{props.sessionName}</h3>
            <p>
              <ul>
                <li>Duration</li>
                <li>Date</li>
              </ul>
            </p>
            <button onClick={() => navigate(`/details/${props.id}`)}>See More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
