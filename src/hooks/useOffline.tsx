import { useEffect } from "react"
import { useToast } from "./use-toast"

const useOffline = () => {
  const { toast } = useToast()

  useEffect(() => {
    const handleOffline = () => {
      toast({
        title: "You are offline",
        description: "Please check your internet connection.",
        variant: "destructive"
      })
    }
    const handleOnline = () => {
      toast({
        title: "Back online",
        description: "Your internet connection is restored.",
      })
    }
    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)
    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [toast])
}

export default useOffline
