import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useAppDispatch } from "@/store/hooks";
import { decrypt } from "@/utils/crypto";
import { login } from "@/features/auth/authSlice";

const useRetrieveUser = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const encryptedToken = localStorage.getItem("API_KEY");
      const encryptedUsername = localStorage.getItem("SECRET_KEY");
      const encryptedId = localStorage.getItem("DB_PASSWORD");
      const encryptedFullName = localStorage.getItem("AWS_ACCESS_KEY_ID");
      if (
        !encryptedToken ||
        !encryptedUsername ||
        !encryptedId ||
        !encryptedFullName
      ) {
        throw new Error("Missing encrypted user data");
      }
      const token = decrypt(encryptedToken);
      const username = decrypt(encryptedUsername);
      const id = decrypt(encryptedId);
      const fullName = decrypt(encryptedFullName);
      if (!token || !username || !id || !fullName) {
        throw new Error("Decryption failed or missing user data");
      }
      if (jwtDecode(token))
        dispatch(
          login({
            username: username,
            id: id,
            fullName: fullName,
            token: token,
          }),
        );
    } catch (error) {
      console.error("Failed to retrieve or decrypt user data:", error);
      localStorage.clear();
    }
  }, [dispatch]);

  return {};
};

export default useRetrieveUser;
