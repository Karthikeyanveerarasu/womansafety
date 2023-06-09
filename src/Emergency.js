import "./Woman.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import Load from './Load'

import mySound from "./audio/1.mp3";
import Navbar from "./Navbar";
import Tester from "./Tester";
export default function Emergency() {
  const [location, setLocation] = useState(null);
  const[email,Setemail]=useState(localStorage.getItem("email") || "");
  const[firstnumber,SetFirst]=useState("");
  const[Secondnumber,SetSecond]=useState("");
  const[thirdnumber,SetThird]=useState("");
  const [error, setError] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    Setemail(localStorage.getItem('email') || '');
    console.log(email)
    axios.post("http://localhost:3002/getnumber").then(res=>{
      if(res){
         SetFirst(res.data[0].firstnumber);
      SetSecond(res.data[0].secondnumber);
      SetThird(res.data[0].thirdnumber);
      }
      console.log(firstnumber);  
    }).catch((error)=>console.log(error))
    if ("permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            // Location is enabled
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
              },
              (error) => {
                console.error(error);
              }
            );
          } else if (result.state === "prompt") {
            enableLocation();
          } else {
            setError("User has denied access to location");
          }
          result.onchange = function () {
            console.log(`Permission is now ${this.state}`);
          };
        });
    } else {
      setError(
        "The navigator.permissions API is not supported on this browser."
      );
    }
    setIsPageLoading(false);
  }, []);

  function enableLocation() {
    navigator.geolocation.watchPosition(
      (popositionsition) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
        setError("Please enable location to track your movements.");
        alert("your location cannot be accessable by us !")
      }
    );
  }
  function makecall(){
    console.log("calling...");
    axios.post('http://localhost:3002/call',{
      firstnumber:firstnumber,
        Secondnumber:Secondnumber,
        thirdnumber:thirdnumber
    }).then((res)=>{
      console.log(res);
    })
  }
  function sendLocation() {
    console.log(location);
    makecall();
    if (location == null) {
      axios.post("https://localhost:3002/help").then(res=>{
        console.log(res);
      })
      console.log("location cannot tracked !");
      //history.go(0);
      return;
    }
    axios
      .post("http://localhost:3002/location", {
        latitude: location.latitude,
        longitude: location.longitude,
        firstnumber:firstnumber,
        Secondnumber:Secondnumber,
        thirdnumber:thirdnumber
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(error));
  }
  const [buttonname, Setbutton] = useState("Start!");
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleChange = (event) => {
    if (buttonname == "Start!") {
      Setbutton("Stop !");
      console.log(firstnumber);
      console.log(Secondnumber);
      console.log(thirdnumber);
      sendLocation();
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      Setbutton("Start!");
    }
  };
  const handleEnded = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };
  return (
    <div>
     { isPageLoading ? (
  <div class="load_component">
  <Load />
</div>
    ) : <>
     <audio ref={audioRef} src={mySound} onEnded={handleEnded}/>
      <Navbar />
      <div class="siren text-center mt-2">
        <div>
          <Tester Setbutton={Setbutton} onButtonClick={handleChange} />
        </div>
        <div class="text-center mt-2">
          <h3 class="display-6 text-danger">Emergency Button</h3>
        </div>
        <div class="text-center container mt-1">
          <button
            type="button"
            class="btn btn-default p-5 rounded-circle btn-lg Help_btn"
            value={isPlaying}
            onClick={handleChange}
          >
            {buttonname}
          </button>
        </div>
      </div>
    </>
     }
     
    </div>
  );
}
