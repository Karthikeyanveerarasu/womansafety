import { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import "./Profile.css";
import Navbar from "../Navbar";
export default function Profile() {
  const [firstname, SetFirstName] = useState("");
  const [lastname, SetLastName] = useState("");
  const [address, SetAddress] = useState("");
  const [city, SetCity] = useState("");
  const [pincode, SetPincode] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const fileSize = file.size;
    if (fileType.includes("image/") && fileSize <= 5 * 1024 * 1024) {
      setProfilePic(file);
      setError(null);
    } else {
      setProfilePic(null);
      setError("Please select a valid image file (less than 5MB).");
    }
  };
  return (
    <>
      <Navbar />

      <div>
        <div class="container-xl px-4 mt-4">
          <div class="row">
            <div class="col-xl-4">
              <div class="card mb-4 mb-xl-0">
                <div class="card-header">Profile Picture</div>
                <div class="card-body text-center">
                  {profilePic && (
                    <img
                      class="img-account-profile rounded-circle mb-2"
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile Picture"
                      width="170"
                      height="200"
                    />
                  )}
                  <div class="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>
                  <Form.Group>
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleProfilePicChange}
                    />
                    <div class="mt-2">
                      {error && <Alert variant="danger">{error}</Alert>}
                    </div>
                  </Form.Group>
                </div>
              </div>
            </div>
            <div class="col-xl-8">
              <div class="card mb-4">
                <div class="card-header">Account Details</div>
                <div class="card-body">
                  <form>
                    <div class="mb-3">
                      <label class="small mb-1" for="inputUsername">
                        Username
                      </label>
                      <input
                        class="form-control"
                        id="inputUsername"
                        type="text"
                        placeholder="Enter your username"
                      />
                    </div>

                    <div class="row gx-3 mb-3">
                      <div class="col-md-6">
                        <label class="small mb-1" for="inputOrgName">
                          Address
                        </label>
                        <input
                          class="form-control"
                          id="inputOrgName"
                          type="text"
                          placeholder="Enter your organization name"
                        />
                      </div>

                      <div class="col-md-6">
                        <label class="small mb-1" for="inputLocation">
                          City
                        </label>
                        <input
                          class="form-control"
                          id="inputLocation"
                          type="text"
                          placeholder="Enter your location"
                        />
                      </div>
                    </div>

                    <div class="mb-3">
                      <label class="small mb-1" for="inputEmailAddress">
                        Email address
                      </label>
                      <input
                        class="form-control"
                        id="inputEmailAddress"
                        type="email"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div class="row gx-3 mb-3">
                      <div class="col-md-6">
                        <label class="small mb-1" for="inputPhone">
                          Phone number
                        </label>
                        <input
                          class="form-control"
                          id="inputPhone"
                          type="tel"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div class="col-md-6">
                        <label class="small mb-1" for="inputBirthday">
                          Picode
                        </label>
                        <input
                          class="form-control"
                          id="inputBirthday"
                          type="number"
                          name="birthday"
                          placeholder="Enter Pincode"
                        />
                      </div>
                    </div>

                    <button class="btn btn-warning" type="button">
                      Save changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
