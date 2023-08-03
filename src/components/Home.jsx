import { useContext } from "react";
import homeBackground from "../assets/logo512.png";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function Home() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="HomeInfo d-md-flex d-block mt-2">
        <div className="HomeNotify col-12 col-md-6 p">
          <span style={{ fontWeight: "500" }}>
            {user.auth ? (
              <>Click the button to start manage</>
            ) : (
              <>You not login yet. Please login to manage it !</>
            )}
          </span>
          <Link
            className=" col-4 btn loginBtn btn-primary d-block mx-auto mt-2"
            to={user.auth ? "/manage" : "login"}
          >
            {user.auth ? <>Manage</> : <>Login</>}
          </Link>
        </div>
        <img
          className="col-12 col-md-5 "
          alt="background"
          style={{
            backgroundrRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "calc(100% - 66px)",
          }}
          src={homeBackground}
        />
      </div>
    </>
  );
}

export default Home;
