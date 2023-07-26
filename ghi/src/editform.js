import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function EditForm() {
  const { token } = useToken();
  const[accountData, setAccountData] = useState(null);
  const { fetchWithCookie } = useToken();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [banner_url, setBannerImage] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
	const navigate = useNavigate();


  const getAccountData = async () => {
    try {
      const data = await fetchWithCookie(`${process.env.REACT_APP_API_HOST}/token`);
      if (data && data.account) {
        setAccountData(data.account);
        setFirstName(data.account.first_name || "");
        setLastName(data.account.last_name || "");
        setAvatar(data.account.avatar || "");
        setBannerImage(data.account.banner_url || "");
        setDescription(data.account.description || "");
        setGoals(data.account.goals || "");
        setStatus(data.account.status || "");
        setLocation(data.account.location || "");
    }
  } catch (error) {
    console.error("Error fetching account data:", error);}
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: first_name,
      last_name: last_name,
      description: description,
      goals: goals,
      status: status,
      location: location,
      avatar: avatar,
      banner_url: banner_url,
      account_id: accountData.id,
    };
    console.log(data)

    if (accountData != null ) {
      const updateProfileURL = `http://localhost:8000/api/profile/${accountData.id}`;
      const fetchConfig = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(updateProfileURL, fetchConfig);
      console.log(response);
      if (response.ok) {
        console.log("Profile updated successfully!");
        console.log(data);
        console.log(response);
      }
    } else {
      const CreateProfileURL = "http://localhost:8000/api/profile";
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
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
    }
    useEffect(() => {
      getAccountData();
      }, []);

  return (
    <div className="row">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>
              {`${first_name}`} {`${last_name}`}'s Profile
            </h1>

            <label className="form-label">Location:</label>
            <input
              value={location}
              type="text"
              className="form-control input-field"
              onChange={(e) => setLocation(e.target.value)}
            />

            <label className="form-label">Profile Picture:</label>
            <input
              value={avatar}
              type="text"
              className="form-control input-field"
              onChange={(e) => setAvatar(e.target.value)}
            />

            <label className="form-label">Banner Image:</label>
            <input
              value={banner_url}
              type="text"
              className="form-control input-field"
              onChange={(e) => setBannerImage(e.target.value)}
            />

            <label className="form-label">description:</label>
            <textarea
              value={description}
              type="text-box"
              className="form-control input-field"
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="form-label">Goals:</label>
            <input
              value={goals}
              type="text"
              className="form-control input-field"
              onChange={(e) => setGoals(e.target.value)}
            />
            <label className="form-label">Status:</label>
            <input
              value={status}
              type="text"
              className="form-control input-field"
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
