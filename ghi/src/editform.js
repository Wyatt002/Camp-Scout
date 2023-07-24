import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function EditForm() {
  const [profileData, setProfileData] = useState(null);
  const { token } = useToken();
  const { account_id } = useParams();
  const [avatar, setAvatar] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.description = description;
    data.goals = goals;
    data.status = status;
    data.location = location;
    data.avatar = avatar;
    data.bannerImage = bannerImage;
    data.account_id = account_id;

    };


  return (
    <div className="row">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Your Profile</h1>

            <label className="form-label">Location:</label>
            <input
              type="text"
              className="form-control input-field"
              placeholder={`${location}`}
              onChange={(e) => setLocation(e.target.value)}
            />

            <label className="form-label">Profile Picture:</label>
            <input
              value={avatar}
              type="text"
              className="form-control input-field"
              placeholder={`${avatar}`}
              onChange={(e) => setAvatar(e.target.value)}
            />

            <label className="form-label">Banner Image:</label>
            <input
              value={bannerImage}
              type="text"
              className="form-control input-field"
              placeholder={`${bannerImage}`}
              onChange={(e) => setBannerImage(e.target.value)}
            />

            <label className="form-label">description:</label>
            <textarea
              value={description}
              type="text-box"
              className="form-control input-field"
              placeholder={`${description}`}
              onChange={(e) => setDescription(e.target.value)}
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
                required
                type="submit"
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
}

export default EditForm;
