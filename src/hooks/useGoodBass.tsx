import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const useGoodPass = () => {
  const hasLetters = (str: string): boolean => /[a-z]/.test(str);
  const hasUppercase = (str: string): boolean => /[A-Z]/.test(str);
  const hasNumbers = (str: string): boolean => /[0-9]/.test(str);
  const hasSpecialChars = (str: string): boolean => /[!@#$%^&*]/.test(str);

  const [score, setScore] = useState<number>(0);
  const [color, setColor] = useState<"red" | "yellow" | "green">("red");

  const checkPassword = (password: string): void => {
    let tempScore = 0;

    if (password.length >= 8 && password.length < 12) tempScore += 10;
    else if (password.length >= 12 && password.length < 16) tempScore += 20;
    else if (password.length >= 16) tempScore += 30;

    if (hasLetters(password)) tempScore += 10;
    if (hasUppercase(password)) tempScore += 15;
    if (hasNumbers(password)) tempScore += 20;
    if (hasSpecialChars(password)) tempScore += 25;

    let tempColor: "red" | "yellow" | "green" = "red";
    if (tempScore >= 60) tempColor = "green";
    else if (tempScore >= 30) tempColor = "yellow";
    else tempColor = "red";

    setScore(tempScore);
    setColor(tempColor);
  };

  const ProgressBar = (
    <Progress
      value={score}
      max={100}
      className={`absolute right-10 top-[70%] h-[10px] w-[35%] translate-y-[-75%] cursor-text rounded-[1px] bg-transparent ${color}`}
    />
  );

  return { ProgressBar, checkPassword };
};

export default useGoodPass;
