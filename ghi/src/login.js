import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const { login, token } = useToken();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login( email, password );
        const ourToken = token
        if (ourToken === null) {
            setIsError(true);
            setErrorMessage("email/password was entered incorrectly");
            setPassword("");
            }
    };

    useEffect(() => {
        if (token !== null) {
            navigate("/");
        }
        }, [token, navigate]);


    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4" style={{ background: "#ffffff" }}>
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
                                    type={passwordShown ? "text" : "password"}
                                    value={password}
                                    className="form-control input-field"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i onClick={togglePasswordVisiblity} className="password-icon">
                                    {passwordShown ? <FiEyeOff /> : <FiEye />} Show password
                                </i>
                            </div>
                            <div>
                                <input
                                    className="btn btn-primary"
                                    required type="submit"
                                    value="Login"
                                    style={{backgroundColor: "#464F2E"}}
                                />
                            </div>
                        </form>
                    </div>
                    <p className="text-center mt-3">
                        New to CampScout?{" "}
                        <Link to="/signup" className="join-now-link">
                        Join now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
