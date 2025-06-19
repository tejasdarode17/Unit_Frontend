import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/Slices/userSlice";
import toast from "react-hot-toast";
import googleAuth from "../utils/firebase";

export const useGoogleSignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const googleData = await googleAuth();

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/google-auth/`, {
                accessToken: googleData?.user?.accessToken,
            });

            const data = response.data;

            dispatch(addUser(data?.user));
            localStorage.setItem("token", data?.token);
            navigate("/");
        } catch (error) {
            if (error.response) {
                toast.error(error.data?.message || "Something went wrong on the server.");
            } else if (error.request) {
                toast.error("No response from the server. Please try again later.");
            } else {
                toast.error("An error occurred: " + error.message);
            }
        }
    };

    return handleGoogleSignIn;
};
