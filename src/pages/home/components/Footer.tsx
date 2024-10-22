import { Link } from "react-router-dom"
import whiteLogo from "@/assets/home/whiteLogo.svg"

const Footer = () => {
  return (
    <footer className="mt-52 flex flex-col items-center justify-center bg-primary-first p-20 pt-10 font-bold text-[#95A3D5] md:items-start lg:mt-[25rem] xl:mt-28">
      <div className="flex flex-col items-start justify-center gap-10 md:flex-row md:gap-20">
        <img src={whiteLogo} alt="" className="" />
        <div className="flex flex-col gap-1 lg:ml-28">
          <p className="mb-4 text-primary-fourth"> الصفحات</p>
          <Link to={"/"} className="hover:text-primary-third">
            الرئيسية
          </Link>
          <Link to={"/about"} className="hover:text-primary-third">
            عن سكرو
          </Link>
          <Link to={"/FindTeam"} className="hover:text-primary-third">
            التيمات
          </Link>
          <Link to={"/FindPartner"} className="hover:text-primary-third">
            ابحث عن شريك
          </Link>
        </div>
        <div className="flex flex-col lg:ml-28">
          <p className="mb-4 text-primary-fourth"> LEGAL</p>
          <Link to={"/"} className="hover:text-primary-third">
            General Info
          </Link>
          <Link to={"/"} className="hover:text-primary-third">
            Privacy Policy
          </Link>
          <Link to={"/"} className="hover:text-primary-third">
            Terms of Service
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="mb-4 text-primary-fourth"> Talk To US</p>
          <Link to={"mailto:Scrow_code@gmail.com"}> Scrow_code@gmail.com</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
