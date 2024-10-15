import { useCheckUsernameMutation } from "@/features/auth/api/authAPI";
import { useState, useEffect } from "react";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { username as usernameRegex } from "@/schema/regex";
import { z } from "zod";

function useCheckUsername<T extends FieldValues>(
  username: string,
  setError: UseFormSetError<T>,
  clearErrors: (name?: Path<T> | Path<T>[] | undefined) => void,
) {
  const [status, setStatus] = useState<
    "valid" | "unValid" | "loading" | "empty"
  >("valid");
  const [ui, setUi] = useState<JSX.Element>(<></>);

  const [checkUsername, { data, isLoading, isError }] =
    useCheckUsernameMutation();

  useEffect(() => {
    if (username) {
      const zValidation = z.object({
        username: z
          .string()
          .min(6, { message: "Username is required" })
          .regex(usernameRegex, { message: "Please enter a valid username" }),
      });

      const { success } = zValidation.safeParse({ username });

      if (success) {
        try {
          checkUsername({ username });
        } catch (error) {
          setError("username" as Path<T>, {
            type: "custom",
            message: "username already used",
          });
          setStatus("unValid");
        }
      } else {
        if (username.length < 6) {
          setError("username" as Path<T>, {
            type: "custom",
            message: "less",
          });
          setStatus("empty");
          setUi(
            <>
              <p
                dir="ltr"
                className="absolute right-4 top-[39px] font-medium text-red-400"
              >
                6-16 characters
              </p>
            </>,
          );
        } else {
          setError("username" as Path<T>, {
            type: "custom",
            message: "unValid",
          });
          setStatus("unValid");
          setUi(
            <>
              <p
                dir="ltr"
                className="absolute right-4 top-[39px] font-medium text-red-400"
              >
                not available
              </p>
            </>,
          );
        }
      }
    } else {
      setUi(<></>);
      clearErrors("username" as Path<T>);
      setStatus("empty");
    }
  }, [username, checkUsername, setError, clearErrors]);

  useEffect(() => {
    if (isError) {
      setStatus("unValid");
      setUi(
        <>
          <p className="absolute right-12 top-[39px] font-medium text-red-600">
            username already used
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute right-5 top-[40px] size-6 fill-red-600 font-bold"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </>,
      );
    } else if (isLoading) {
      setStatus("loading");
      setUi(
        <p
          className="text-surface absolute right-5 top-[44px] inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary-first border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        ></p>,
      );
    } else if (data === "creative") {
      setStatus("valid");
      clearErrors("username" as Path<T>);
      setUi(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="green-500"
          className="absolute right-5 top-[40px] size-6 fill-green-600 font-bold"
        >
          <path
            fillRule="evenodd"
            d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
            clipRule="evenodd"
          />
        </svg>,
      );
    }
  }, [data, isLoading, isError, clearErrors]);

  return { status, ui };
}

export default useCheckUsername;
