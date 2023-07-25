import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function EditForm() {
  const [profileData, setProfileData] = useState(null);
  const { token } = useToken();
  const[accountData, setAccountData] = useState("");
  const { fetchWithCookie } = useToken();
  const [avatar, setAvatar] = useState("");
  const [banner_url, setBannerImage] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
	const navigate = useNavigate();


  const getAccountData = async () => {
    const data = await fetchWithCookie(
      `${process.env.REACT_APP_API_HOST}/token`);
    setAccountData(data.account);
    if (data.account) {
      setAvatar(data.account.avatar || "");
      setBannerImage(data.account.banner_url || "");
      setDescription(data.account.description || "");
      setGoals(data.account.goals || "");
      setStatus(data.account.status || "");
      setLocation(data.account.location || "");
    }
  }


  useEffect(() => {
    getAccountData();
    }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      description: description,
      goals: goals,
      status: status,
      location: location,
      avatar: avatar,
      banner_url: banner_url,
      account_id: accountData?.id,
    };
    console.log(profileData)


    const CreateProfileURL = "http://localhost:8000/api/profile";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(profileData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
      const response = await fetch(CreateProfileURL, fetchConfig);
      console.log(response)
      if (response.ok) {
        console.log("Profile created successfully!");
        setAvatar("");
        setBannerImage("");
        setDescription("");
        setGoals("");
        setStatus("");
        setLocation("");
        navigate("/");
      }
    }


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
              value={banner_url}
              type="text"
              className="form-control input-field"
              placeholder={`${banner_url}`}
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
