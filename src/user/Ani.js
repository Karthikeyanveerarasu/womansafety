import Lottie from "react-lottie";
import animation from "../lottie/help.json";
import "./ottie.css";
export default function Ani() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>
      <div>
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-md-8 mt-5">
              <div class="text-center mt-3">
                <p
                  class="hover-underline-animation text-uppercase"
                  style={{ fontSize: "1.2rem", fontWeight: "900" }}
                >
                  Be fearless with us!{" "}
                </p>
              </div>
              <div class="text-justify mt-3">
                <p>
                  This App is designed to communicate with others that you may
                  need help. These apps can provide peace of mind, immediate
                  communication, and access to help in an emergency.
                </p>
              </div>
              <div class="text-justify mt-3">
                <p>
                  It is a Safety app for women that lets you sound an emergency
                  alarm, alerting emergency contacts of your location if you're
                  in a dangerous situation.
                </p>
              </div>
            </div>
            <div class="col-xl-4 col-md-4 mb-5">
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
