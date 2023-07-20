import React from "react";
import { useState} from "react";

const EditForm = () => {
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [bannerImage, setbannerImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [about, setAbout] = useState("");
    const [goals, setGoals] = useState("");
    const [status, setStatus] = useState("")
    const [location, setLocation] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    return (
        <div className="row">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Edit Your Profile</h1>
                            <label className="form-label">Email:</label>
                            <input
                            value={email}
                            className="form-control input-field"
                            placeholder={`${email}`}
                            onChange={(e) => setEmail(e.target.value)}
                            />

                            <label className="form-label">First Name:</label>
                            <input
                            value={firstName}
                            type="text"
                            className="form-control input-field"
                            placeholder={`${firstName}`}
                            onChange={(e) => setFirstName(e.target.value)}
                            />

                            <label className="form-label">Last Name:</label>
                            <input
                            value={lastName}
                            type="text"
                            className="form-control input-field"
                            placeholder={`${lastName}`}
                            onChange={(e) => setLastName(e.target.value)}
                            />

                            <label className="form-label">Profile Picture:</label>
                            <input
                            value={profilePicture}
                            type="text"
                            className="form-control input-field"
                            placeholder={`${profilePicture}`}
                            onChange={(e) => setProfilePicture(e.target.value)}
                            />

                            <label className="form-label">Banner Image:</label>
                            <input
                            value={bannerImage}
                            type="text"
                            className="form-control input-field"
                            placeholder={`${bannerImage}`}
                            onChange={(e) => setbannerImage(e.target.value)}
                            />

                            <label className="form-label">Location:</label>
                            <input
                            type="text"
                            className="form-control input-field"
                            placeholder={`${location}`}
                            onChange={(e) => setLocation(e.target.value)}
                            />

                            <label className="form-label">About:</label>
                            <input
                            value={about}
                            type="text"
                            className="form-control input-field"
                            placeholder={`${about}`}
                            onChange={(e) => setAbout(e.target.value)}
                            />

                            <label className="form-label">Goals:</label>
                            <input
                            type="text"
                            className="form-control input-field"
                            placeholder={`${goals}`}
                            onChange={(e) => setGoals(e.target.value)}
                            />

                            <label className="form-label">Status:</label>
                            <input
                            type="text"
                            className="form-control input-field"
                            placeholder={`${status}`}
                            onChange={(e) => setStatus(e.target.value)}
                            />

                            <div>
                                <input
                                    className="btn btn-primary"
                                    required type="submit"
                                    value="Finish"
                                />
                            </div>
                        <p className="text-center mt-3">
                        Delete Account?
                        <button className="btn btn-danger"> Delete </button>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditForm;
