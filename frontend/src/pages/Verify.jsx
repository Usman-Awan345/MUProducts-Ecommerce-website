import React, { useContext, useEffect } from "react";
import { shopContext } from "../context/shopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
    const {navigate, token, setCartItems, backendUrl } = useContext(shopContext);
    const [searchParams , setSearchParams] = useSearchParams();
    

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifyPayment = async () => {
        try {
            if (!token){
                return null
            };

            const response = await axios.post(
                `${backendUrl}/api/order/verifystripe`,
                { success, orderId },
                { headers: {token}}
            );

            if (response.data.success) {
                setCartItems({});
                navigate("/orders"); // Redirect to orders page
            } else {
                console.log("Payment verification failed.");
                navigate("/"); // Redirect back to cart
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error(error.message)
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]); // Runs once when the component loads

    return (
        <div>
            <h2>Verifying Payment...</h2>
        </div>
    );
};

export default Verify;

