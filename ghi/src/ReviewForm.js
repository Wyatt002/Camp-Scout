import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useState, useRef, } from "react";


const ReviewForm = () => {
    // const formRef = useRef(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const { token } = useAuthContext();
    //const [data, setData] = useState({ review: '', rating: '', facility_id: 'Gibberish', account_id: 1 });

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
            facility_id: "Gibberish",
            account_id: 5,
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
        }
    };

    /*const handleReviewChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setData({
        ...data,
        [inputName]: value,
        });

    }*/
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
                    <input onChange={handleReviewChange}
                        id="review"
                        placeholder="Review"
                        name="review"
                        type="text"
                        className="form-control"
                        value={review}
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="rating">Rating</label>
                    <input onChange={handleRatingChange}
                        id="rating"
                        placeholder="Rating"
                        name="rating"
                        type="text"
                        className="form-control"
                        value={rating}
                    />
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
