import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  function Logout(){
    axios.post('http://localhost:3002/logout')
      .then((response) => {
        // Redirect to the login page
       if(response.data.Loggedin == false){
        navigate('/')
       }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div class="dropdown" style={{ float: "right" }}>
      <button class="dropbtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="25"
          fill="currentColor"
          class="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      </button>
      <div class="dropdown-content" style={{ cursor: "pointer" }}>
        <a onClick={() => navigate("/profile")}>Profile</a>
        <a onClick={() => navigate("/about")}>About</a>
        <a onClick={() => navigate("/contactus")}>Contact us</a>

        <hr />
        <a onClick={Logout}>Logout</a>
      </div>
    </div>
  );
}
