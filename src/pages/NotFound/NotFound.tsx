import mainLogo from "@/assets/global/MainLogo.svg"

const NotFound = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <img src={mainLogo} alt="" className="absolute top-0 w-24 place-self-start p-4" />
      <h1 className="text-[40px] font-bold text-primary-first">Not Found</h1>
    </main>
  )
}

export default NotFound
