import { Dialog, DialogBody } from "@material-tailwind/react"
import axios from "axios";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

export const ModalSignOut = ({ isModalOpen, setIsModalOpen }) => {
    const token = localStorage.getItem('token');

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/customer/user-logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            localStorage.removeItem("token")
            window.location.reload()
            toast.success('Sign out Success!', {
                position: "top-center",
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog size="sm" open={isModalOpen} className="px-3 pb-3 pt-5 flex flex-col items-center">
            <DialogBody className="flex flex-col gap-1 items-center">
                <div className="mb-3 flex items-center justify-center p-7 rounded-full bg-[#FEF9C3]">
                    <svg width="50" height="50" viewBox="0 0 66 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64.9214 53.9152L37.6259 3.2257C35.6913 -0.368203 30.5374 -0.368203 28.6011 3.2257L1.30731 53.9152C0.88724 54.6954 0.676636 55.5712 0.696055 56.457C0.715474 57.3429 0.964253 58.2087 1.41811 58.9697C1.87196 59.7308 2.51539 60.3611 3.28558 60.7993C4.05576 61.2375 4.9264 61.4685 5.81251 61.4697H60.4082C61.295 61.4698 62.1666 61.2399 62.9379 60.8023C63.7092 60.3647 64.3537 59.7344 64.8085 58.9731C65.2633 58.2119 65.5128 57.3456 65.5326 56.459C65.5524 55.5725 65.3418 54.696 64.9214 53.9152ZM33.1143 53.6221C32.4808 53.6221 31.8615 53.4342 31.3348 53.0822C30.808 52.7303 30.3975 52.23 30.155 51.6447C29.9126 51.0594 29.8492 50.4154 29.9728 49.794C30.0964 49.1727 30.4014 48.602 30.8494 48.154C31.2974 47.706 31.8681 47.401 32.4894 47.2774C33.1108 47.1538 33.7548 47.2172 34.3401 47.4596C34.9254 47.7021 35.4257 48.1126 35.7776 48.6394C36.1296 49.1661 36.3175 49.7854 36.3175 50.4189C36.3175 51.2685 35.98 52.0832 35.3793 52.6839C34.7786 53.2846 33.9639 53.6221 33.1143 53.6221ZM36.5929 21.4066L35.6736 40.9457C35.6736 41.6253 35.4037 42.2771 34.9231 42.7577C34.4425 43.2382 33.7908 43.5082 33.1111 43.5082C32.4315 43.5082 31.7797 43.2382 31.2992 42.7577C30.8186 42.2771 30.5486 41.6253 30.5486 40.9457L29.6293 21.4146C29.6087 20.9479 29.6822 20.4818 29.8455 20.0441C30.0088 19.6065 30.2586 19.2061 30.5799 18.867C30.9012 18.5279 31.2875 18.2569 31.7158 18.0703C32.1441 17.8837 32.6056 17.7852 33.0727 17.7807H33.1063C33.5767 17.7805 34.0422 17.8755 34.4748 18.0601C34.9073 18.2447 35.298 18.5151 35.6233 18.8548C35.9485 19.1946 36.2015 19.5967 36.3671 20.0369C36.5327 20.4772 36.6073 20.9464 36.5865 21.4163L36.5929 21.4066Z" fill="#EAB308" />
                    </svg>

                </div>
                <h3 className="mb-1 text-[24px] text-[#28302A] font-bold text-center">Sign out</h3>
                <span className="text-[15px] text-gray-6s00 w-[90%] text-center font-normal">
                    Are you sure you would like to sign out of your account?
                </span>
                <div className="flex justify-end gap-3 mt-5">
                    <button onClick={handleLogout} className="shadow-sm rounded-full px-5 py-2 border border-[#E5E7EB] text-[15px] font-medium text-gray-600 transition delay-100 ease-in-out hover:bg-gray-100">
                        Sign out
                    </button>
                    <button onClick={() => setIsModalOpen(false)} className="rounded-full bg-[#00a67c] px-5 py-2.5 text-[15px] font-semibold text-white transition delay-100 ease-in-out hover:bg-[#00916D] ">
                        Cancel
                    </button>
                </div>
            </DialogBody>
        </Dialog>

    )
}

ModalSignOut.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired
}
