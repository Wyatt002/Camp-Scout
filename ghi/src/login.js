import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import "./signup.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useToken();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        e.target.reset();
    };


    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">

                <h1>Login</h1>
                <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        name="email"
                        type="text"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div>
                    <input
                        className="btn btn-primary"
                        type="submit"
                        value="Login"
                    />
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    );
};

export default LoginForm;
