import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const LoadingDialog = () => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="border-none bg-transparent shadow-transparent outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="mt-32 flex items-center justify-center">
            <AlertDialogDescription className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent" role="status"></AlertDialogDescription>
          </AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LoadingDialog
