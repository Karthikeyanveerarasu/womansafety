import Navbar from "../Navbar";
import { Accordion } from "react-bootstrap";
import Ani from "./Ani";
export default function About() {
  return (
    <>
      <Navbar />
      <div class="container"> 
       <Ani />
        <div>
          <hr />
          <div class="text-center mt-2">
            <p class="text-uppercase" style={{fontSize:"1.2rem",fontWeight:"900"}}>Frequently Asked Questions</p>
          </div>
          <div class="mt-4">
            <Accordion>
              <Accordion.Item eventKey="0" class="mt-2">
                <Accordion.Header>Is this App free at cost ?</Accordion.Header>
                <Accordion.Body>
                  Yes, This App is fully free at cost
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" class="mt-3">
                <Accordion.Header>Is this App is Secure ?</Accordion.Header>
                <Accordion.Body>
                  Yes, this app is Highly secure. It doesn't share your
                  information to others and the passwords are hashed, so it is
                  fully secured one to use.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" class="mt-3">
                <Accordion.Header>
                  Is this App for both android and ios ?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, this app is developed for both andriod and ios users.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" class="mt-3">
                <Accordion.Header>How it Works ?</Accordion.Header>
                <Accordion.Body>
                  when you click the emergency button , it starts sending
                  messages and calls to your registerd guardian numbers and it
                  produces a emergency alarm too.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4" class="mt-3">
                <Accordion.Header>How to change the numbers ?</Accordion.Header>
                <Accordion.Body>
                  once open your profile click edit, then change the number and
                  click save to change the numbers.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
