import { Link } from "react-router-dom";

import EmailComponent from "./components/EmailComponent";
import OtpComponent from "./components/OtpComponent";
import ResetPassword from "./components/ResetPassword";

import { useAppSelector } from "../../../../store/hooks";

const ForgetPassword = () => {
	const reset = useAppSelector((state) => state.auth.reset);

	return (
		<>
			<div>
				<Link to={"/"}>Home logo</Link>
			</div>
			{reset?.email === null && reset?.newPassword === null && reset?.otp === null ? (
				<EmailComponent />
			) : reset?.email !== null && reset?.newPassword === null && reset?.otp === null ? (
				<OtpComponent />
			) : (
				<ResetPassword />
			)}
			<footer>Created by scrow team</footer>
		</>
	);
};

export default ForgetPassword;
