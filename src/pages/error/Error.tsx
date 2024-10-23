import { useRouteError } from "react-router-dom"

const Error = ({ type }: { type: "notFound" | "error" }) => {
  const error = useRouteError()

  return (
    <main className="flex h-screen flex-col items-center justify-center px-4 py-8 text-center">
      {type === "notFound" ? (
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-3xl font-bold text-primary-first sm:text-4xl lg:text-5xl">Page Not Found</h1>
          <p className="mt-2 text-base text-gray-600 sm:text-lg lg:text-xl">We can't find the page you're looking for.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-3xl font-bold text-primary-first sm:text-4xl lg:text-5xl">Something Went Wrong</h1>
          <p className="mt-2 text-base text-gray-600 sm:text-lg lg:text-xl">We encountered an unexpected error.</p>
          <pre className="mt-4 max-w-full overflow-x-auto rounded-md bg-red-100 p-4 text-left text-sm text-red-700 shadow-md sm:max-w-lg sm:text-base lg:max-w-xl">{String(error)}</pre>
        </div>
      )}
    </main>
  )
}

export default Error
