import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);
	const [showProfileButton, setShowProfileButton] = useState(false);
	const { login } = useToken();
	const navigate = useNavigate();


    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const handleConfirmPassword = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);
    }


    const handleSubmit = async (event) =>{
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setPassword('');
            setConfirmPassword('');
        } else {
			const data = {
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
			}

			const accountsURL = 'http://localhost:8000/api/accounts/';
			const fetchConfig = {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await fetch(accountsURL, fetchConfig);
			if(response.ok) {
				const newAccount = await response.json();
				console.log(newAccount);
				await login(email, password);
				setFirstName('');
				setLastName('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');

				setSuccess(true);
				setShowProfileButton(true);
			} else {
				setSuccess(false);
			}
        }
    }
	const togglePasswordVisiblity = () => {
    	setPasswordShown(passwordShown ? false : true);
    };

    return (
		<div className="Signup-Container">
			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4"style={{ background: "#ffffff" }}>
						<h1>Sign Up! </h1>
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							{showProfileButton && (
								<button className="btn btn-primary mt-3" onClick={() => navigate("/profile")}>
									Go to Profile
								</button>
							)}
							{success && <p className="text-success">Account created successfully!</p>}
						</div>
						<form onSubmit={handleSubmit} id="sign-up-form">
							<div className="form-floating mb-3">
								<input
									onChange={handleFirstNameChange}
									placeholder="First Name"
									required
									type="text"
									value={firstName}
									name="firstName"
									id="firstName"
									className="form-control"
								/>
								<label htmlFor="first_name">First Name</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleLastNameChange}
									placeholder="Last Name"
									required
									value={lastName}
									type="text"
									name="lastName"
									id="lastName"
									className="form-control"
								/>
								<label htmlFor="last_name">Last Name</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleEmailChange}
									placeholder="Email"
									required
									value={email}
									type="text"
									name="email"
									id="email"
									className="form-control"
								/>
								<label htmlFor="email">Email</label>
							</div>
							<div className="form-floating mb-3">
								<input
									name="password"
									type={passwordShown ? "text" : "password"}
									required value={password}
									className="form-control input-field"
									onChange={(e) => setPassword(e.target.value)}
									/>
								<label htmlFor="password">Password</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleConfirmPassword}
									placeholder="Confirm Password"
									required value={confirmPassword}
									type={passwordShown ? "text" : "password"}
									name="confirmPassword"
									id="confirmPassword"
									className="form-control"
								/>
								<i onClick={togglePasswordVisiblity} className="password-icon">
									{passwordShown ? <FiEyeOff /> : <FiEye />} Show password
								</i>
								<label htmlFor="confirmPassword">Confirm Password</label>
							</div>
							<button className="btn btn-primary">Create</button>
						</form>
						<p className="text-center mt-3">
                        Already have an Account?
                        <Link to="/login" className="join-now-link">
                        Login!
                        </Link>
                    </p>
					</div>
				</div>
			</div>
		</div>
    );
}

export default SignupForm;
