import { FloatingLabel, Form, Button, Modal } from "react-bootstrap";
import { AiOutlineWoman } from "react-icons/ai";
import "./Woman.css";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Load from './Load';
export default function Woman() {
  const[email,Setemail]=useState(localStorage.getItem("email") || "");
  const [issave, SetIsSave] = useState("Save");
  const[firstnumber,SetFirst]=useState("");
  const[Secondnumber,SetSecond]=useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const[thirdnumber,SetThird]=useState("");
  const navigate = useNavigate();
  useEffect(() => {
   
    const handleStorageChange = () => {
      Setemail(localStorage.getItem('email') || '');
    };

    window.addEventListener('storage', handleStorageChange);
    axios.post('http://localhost:3002/data',{
      email : email
    }).then((response)=>{
     if(response.data.already){
      navigate('/home');
     }
  })
setIsPageLoading(false);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
   
  
  }, []);
  function handlechange(e) {
e.preventDefault();
    SetIsSave("Saving...");
    console.log(email);
    if(firstnumber==Secondnumber || firstnumber == thirdnumber || Secondnumber==thirdnumber){
      toast.error("Numbers should be different", {
        position: "top-right",
        theme: "dark"
      });
      SetIsSave("Save");
       
      return
    }
    if(firstnumber.length<10 || Secondnumber<10 || thirdnumber<10){
      toast.error("Invalid numbers", {
        position: "top-right",
        theme: "dark"
      });
      SetIsSave("Save");      
      return
    }

    setTimeout(() => {
       axios.post("http://localhost:3002/details",{
        email : email,
       firstnumber : firstnumber,
       Secondnumber : Secondnumber,
       thirdnumber : thirdnumber
    }).then(response=>{
      if(response.data.success){
        navigate("/home");
      }
    })
      SetIsSave("Save");
       
    }, [2000]);
  }

  return (
    <div>
      <ToastContainer />
    { isPageLoading ? (
  <div class="load_component">
  <Load />
</div>
    ) : <>
        <nav class="navbar " style={{ background: "grey" }}>
        <a class="navbar-brand mx-3" href="#">
          <span style={{ color: "white" }}>
            <strong>
              Woman<span style={{ color: "red" }}> Safety</span>{" "}
              <AiOutlineWoman />{" "}
            </strong>
          </span>{" "}
        </a>
      </nav>
      <div class="mt-5">
        <div
          class="card"
          style={{ width: "50%", margin: "auto", height: "auto" }}
        >
          <div
            class="card-body"
            style={{ justifyContent: "center", width: "100%", margin: "auto" }}
          >
            <div class="text-start">
              <strong>
                <p class="muted text-primary">
                  Number's For Emergency Message:{" "}
                </p>
              </strong>
            </div>
            <FloatingLabel
              controlId="floatingInput"
              label="First Number"
              className="mb-3"
            >
              <Form.Control type="number" placeholder="987654321" onChange={(e)=>SetFirst(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Second Number"
              className="mb-3"
            >
              <Form.Control type="number" placeholder="+91888" onChange={(e)=>SetSecond(e.target.value)}/>
            </FloatingLabel>
            <div class="text-start">
              <strong>
                <p class="muted text-primary">Number For Emergency Call: </p>
              </strong>
            </div>
            <FloatingLabel
              controlId="floatingInput"
              label="Third Number"
              className="mb-3"
            >
              <Form.Control type="number" placeholder="name@example.com" onChange={(e)=>SetThird(e.target.value)}/>
            </FloatingLabel>
            <div class=" text-center">
              <span
                class="btn btn-warning mt-2"
                style={{ fontSize: "1.2em" }}
                onClick={handlechange}
              >
                {issave}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
          }  
    </div>
  );
}
