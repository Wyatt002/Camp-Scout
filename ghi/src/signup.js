import React, { useState } from "react";

function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);

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
    const handlePasswordChange = (event) => {
        const value =  event.target.value;
        setPassword(value);
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
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            setSuccess(true);
        } else {
            setSuccess(false);
        }

        }
    }

    return (
		<div className="Signup-Container">
			<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
				<h1>Sign Up! </h1>
				{success && <p>Account created successfully!</p>}
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
						onChange={handlePasswordChange}
						placeholder="Password"
						required
						value={password}
						type="password"
						name="password"
						id="password"
						className="form-control"
					/>
					<label htmlFor="password">Password</label>
					</div>
					<div className="form-floating mb-3">
					<input
						onChange={handleConfirmPassword}
						placeholder="Confirm Password"
						required
						value={confirmPassword}
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						className="form-control"
					/>
					<label htmlFor="confirmPassword">Confirm Password</label>
					</div>
					<button className="btn btn-primary">Create</button>
				</form>
				</div>
			</div>
			</div>
		</div>
    );
}

export default SignupForm;
