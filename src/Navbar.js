import { AiOutlineWoman } from "react-icons/ai";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";

export navigatordefault function Navbar() {
  const navigate = useNavigate();


  return (
    <nav class="navbar " style={{ background: "black" }}>
      <a
        class="navbar-brand mx-3"
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      >
        <span style={{ color: "white" }}>
          <strong>
            Woman<span style={{ color: "red" }}> Safety</span>{" "}
            <AiOutlineWoman />{" "}
          </strong>
        </span>{" "}
      </a>
      <div>
        <div class="container">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
