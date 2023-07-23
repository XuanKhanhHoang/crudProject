import "../styles/Home.scss";

import homeBackground from "../assets/logo512.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div style={{}}>
      <div className="HomeInfo">
        <div className="notLoginNotify col-12 col-md-6">
          <div className="notLoginNotifyContanier ">
            <span className="textNotLoginNotify">
              You not login yet. Please login to manage it !
            </span>
            <Link className="loginBtn col-4" to="login">
              Login
            </Link>
          </div>
        </div>
        <img
          className="reactBgrdImg col-12 col-md-5"
          alt="background"
          src={homeBackground}
        />
      </div>
    </div>
  );
}

export default Home;
