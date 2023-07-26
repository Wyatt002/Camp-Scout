import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import styles from "./ReviewForm.css";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ReviewForm = () => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const { parkCode, facilityId } = useParams();
    const { token } = useAuthContext();
    const { fetchWithCookie } = useToken();

    const handleReviewChange = (e) => {
        const value = e.target.value;
        setReview(value);
    }

    const handleRatingChange = (e) => {
        const value = e.target.value;
        setRating(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_HOST}/api/reviews`;
        const data = {
            review: review,
            rating: rating,
            facility_id: facilityId,
            first_name: accountData.first_name,
            last_name: accountData.last_name,
            account_id: accountData.id,
        }

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            console.log(response);
            setReview('');
            setRating('');
            navigate(`/facility/${parkCode}/${facilityId}`);
        }
    };

    const getAccountData = async () => {
        const data = await fetchWithCookie(
            `${process.env.REACT_APP_API_HOST}/token`
        );
        setAccountData(data.account);
    }

    useEffect(() => {
        getAccountData();
      }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <div className="card text-bg-light mb-3">
                <h5 className="card-header">Enter Your Review</h5>
                <div className="card-body">
                <form onSubmit={handleSubmit} id="create-review-form" >
                    <div className="mb-3">
                    <label htmlFor="review">Review:</label>
                    <textarea onChange={handleReviewChange}
                        id="review"
                        placeholder="Review"
                        name="review"
                        type="text"
                        className="form-control"
                        value={review}
                        rows={4}
                        cols={50}
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="rating">Rating</label>
                    <select onChange={handleRatingChange}
                        id="rating"
                        placeholder="Rating"
                        name="rating"
                        value={rating}
                        type="text"
                        className="form-control">
                        <option value={0}>Select Rating</option>
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                    </select>
                    </div>
                    <div>
                    <input
                        className="btn btn-primary"
                        type="submit"
                        value="Submit Review"
                    />
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ReviewForm;
