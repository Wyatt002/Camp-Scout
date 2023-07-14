import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useToken();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        e.target.reset();
        navigate("/");
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Login! </h1>
                    <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            name="email"
                            required type="text"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            name="password"
                            required type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <div>
                        <input
                            className="btn btn-primary"
                            required type="submit"
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
