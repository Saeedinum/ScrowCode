import { useState } from "react"
import { Progress } from "@/components/ui/progress"

const useGoodPass = () => {
  const hasLetters = (str: string): boolean => /[a-z]/.test(str)
  const hasUppercase = (str: string): boolean => /[A-Z]/.test(str)
  const hasNumbers = (str: string): boolean => /[0-9]/.test(str)
  const hasSpecialChars = (str: string): boolean => /[!@#$%^&*]/.test(str)

  // Set Password guide messages for clarity
  const passwordGuide = {
    length: "Password must be at least 8 characters",
    uppercase: "Password must contain uppercase letters",
    numbers: "Password must contain numbers",
    specialChars: "Password must contain special characters e.g. @$!%*?&"
  }

  const [score, setScore] = useState<number>(0)
  const [color, setColor] = useState<"red" | "yellow" | "green">("red")
  const [guides, setGuides] = useState<Partial<typeof passwordGuide>>(passwordGuide)

  const checkPassword = (password: string): void => {
    let tempScore = 0
    const tempGuides = { ...guides }

    if (password.length >= 8 && password.length < 12) {
      tempScore += 10
      tempGuides.length = ""
    } else if (password.length >= 12 && password.length < 16) tempScore += 20
    else if (password.length >= 16) tempScore += 30
    else if (password.length < 8) tempGuides.length = "Password must be at least 8 characters"

    if (hasLetters(password)) {
      tempScore += 10
    }

    if (hasUppercase(password)) {
      tempScore += 15
      tempGuides.uppercase = ""
    } else {
      tempGuides.uppercase = "Password must contain uppercase letters"
    }

    if (hasNumbers(password)) {
      tempScore += 20
      tempGuides.numbers = ""
    } else {
      tempGuides.numbers = "Password must contain numbers"
    }

    if (hasSpecialChars(password)) {
      tempScore += 25
      tempGuides.specialChars = ""
    } else {
      tempGuides.specialChars = "Password must contain special characters e.g. @$!%*?&"
    }

    let tempColor: "red" | "yellow" | "green" = "red"
    if (tempScore >= 60) tempColor = "green"
    else if (tempScore >= 30) tempColor = "yellow"
    else tempColor = "red"

    setScore(tempScore)
    setColor(tempColor)
    setGuides(tempGuides)
  }

  const ProgressBar = <Progress value={score} max={100} className={`absolute right-10 top-1/2 h-[10px] w-[35%] -translate-y-1/2 transform cursor-text rounded-[1px] bg-transparent ${color}`} />

  return { ProgressBar, checkPassword, guides }
}

export default useGoodPass
