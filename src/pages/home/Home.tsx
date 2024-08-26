import backgroundleft from "/src/assets//home/background1.png";
import backgroundright from "/src/assets//home/background2.png";
import backgroundlines from "/src/assets//home/AbstractLine.png";

import dots from "/src/assets//home/dots.png";
import officeWorker from "/src/assets//home/officeWorker.png";
import Vector from "/src/assets//home/Vector.png";

import background3 from "/src/assets/home//background3.png";
import grayshadow1 from "/src/assets/home/grayshadow1.png";
import grayshadow2 from "/src/assets/home/grayshadow2.png";
import grayshadow3 from "/src/assets/home/grayshadow3.png";
import teams from "/src/assets/home/teams.png";
import create from "/src/assets/home/create.png";
import partners from "/src/assets/home/partners.png";
import mobile1 from "/src//assets//home//mobile1.png";
import mobile2 from "/src//assets//home//mobile2.png";
import star1 from "/src/assets/home//star1.svg";
import star2 from "/src/assets/home//star2.svg";

import whiteLogo from "/src/assets/home/whiteLogo.svg";
import {Link} from "react-router-dom";

const Home = () => {
	return (
		<>
			<main className='flex flex-col'>
				<section className='h-screen flex justify-center items-center relative overflow-hidden'>
					<img src={backgroundleft} alt='background image' className='absolute left-0 top-[-50px] max-h-[91vh] z-0 ' />
					<img src={backgroundright} alt='background image' className='absolute right-0 top-[-50px] max-h-[91vh] selection:' />
					<div className='relative flex flex-col gap-14 items-center'>
						<img src={backgroundlines} alt='background image' className='absolute -top-10 -left-10 ' />
						<h1 className='text-5xl text-primary-first font-bold flex flex-col items-center '>
							<span>The best Way</span> to get your team
						</h1>
						<p className='text-3xl font-bold text-primary-second'>Easily , Friendly , and Collaborative.</p>
						<div className='flex gap-5'>
							<button className='text-primary-fourth bg-primary-first rounded-lg px-14 py-3 font-bold'>Get started</button>
							<button className='text-primary-first rounded-lg px-14 py-3 font-bold border-solid border-primary-first border-2'>know More</button>
						</div>
					</div>
				</section>

				<section className='flex gap-28 justify-center items-center relative -top-20'>
					<img src={officeWorker} alt='' />
					<div className='relative flex flex-col justify-center items-center gap-4 '>
						<img src={dots} alt='' className='absolute -top-16 -left-20' />
						<p className='text-5xl text-primary-first font-bold'>Who We Are</p>
						<p className='flex flex-col items-center text-lg font-bold text-Grey-first'>
							<span>We’re Scrow Team </span>
							<span>We are here to help you complete your projects quickly</span>
							<span>without wasting time on finding the right people</span>
						</p>
					</div>
					<img src={Vector} alt='' className='absolute bottom-0 ' />
				</section>
				{/* ******************************************************************************************* */}
				<section className='relative flex flex-col items-center justify-center gap-20 '>
					<img src={grayshadow1} alt='' className='absolute -left-14  top-0 -z-10 ' />
					<img src={background3} alt='' className='absolute top-0 right-0' />
					<div className='flex flex-col items-center gap-10'>
						<h2 className='text-5xl text-primary-first font-bold'>Our Services</h2>
						<p className='flex flex-col items-center text-lg font-bold text-Grey-first'>
							Lorem ipsum dolor sit amet consectetur
							<span>Posuere turpis nunc Lorem ipsum dolor sit amet consectetur Posuere turpis nunc proin .proin .</span>
						</p>
					</div>
					<section className='flex items-center justify-end relative w-full '>
						<img src={teams} alt='' className='z-20 absolute left-0 top-0' />
						<img src={star1} alt='' className='absolute top-0 left-1/2 z-30' />
						<div className='flex flex-col gap-7 mr-48 mt-64 items-center'>
							<h3 className='text-3xl text-primary-first font-bold flex flex-col items-center'>
								Join <span>Team Work</span>
							</h3>
							<p className='flex flex-col items-center text-lg font-bold text-Grey-first'>
								<span>Lorem ipsum dolor sit amet</span>
								<span> consectetur Posuere</span>
								<span>turpis nunc proin .</span>
							</p>
							<button className='text-primary-fourth bg-primary-first rounded-lg px-14 py-3 font-bold'>Join Team</button>
						</div>
					</section>

					<section className=' flex items-center justify-start relative mt-72 w-full'>
						<img src={partners} alt='' className='z-20 absolute right-0 top-0 w-[60%]' />
						<div className='flex flex-col gap-7 ml-48 mt-64 items-center'>
							<h3 className="className= text-3xl text-primary-first font-bold flex flex-col items-center '">
								Find Your <span>Study Partner</span>
							</h3>
							<p className='flex flex-col items-center text-lg font-bold text-Grey-first'>
								<span>Lorem ipsum dolor sit amet</span>
								<span> consectetur Posuere</span>
								<span>turpis nunc proin .</span>
							</p>
							<button className='text-primary-fourth bg-primary-first rounded-lg px-14 py-3 font-bold'>Find Partner</button>
						</div>
					</section>

					<section className='flex items-center justify-end relative  mt-64 w-full '>
						<img src={background3} alt='' className='absolute' />
						<img src={create} alt='' className='z-20 absolute -left-10 top-0' />
						<img src={star1} alt='' className='absolute -top-10 left-[60%]  z-30' />
						<div className='flex flex-col gap-7 mr-48 mt-64 items-center'>
							<h3 className='text-3xl text-primary-first font-bold flex flex-col items-center'>
								Create Your <span> Own Team Work</span>
							</h3>
							<p className='flex flex-col items-center text-lg font-bold text-Grey-first'>
								<span>Lorem ipsum dolor sit amet</span>
								<span> consectetur Posuere</span>
								<span>turpis nunc proin .</span>
							</p>
							<button className='text-primary-fourth bg-primary-first rounded-lg px-14 py-3 font-bold'>Create team work</button>
						</div>
					</section>

					<section className='relative w-full flex items-center justify-evenly  w-ful mt-72 gap-20'>
						<img src={star2} alt='' className='absolute top-0 right-32 z-30' />
						<img src={grayshadow2} alt='' className='absolute left-0   -z-10 ' />
						<div className='flex items-end relative '>
							<img src={mobile1} alt='' className='' />
							<img src={mobile2} alt='' className='absolute left-[55%] bottom-2' />
						</div>

						<div className='flex flex-col gap-7 items-center'>
							<h3 className='text-5xl text-primary-first font-bold flex flex-col items-center'>Download Our App</h3>
							<p className='flex flex-col items-center text-lg font-bold text-Grey-first'>
								<span>get our app now and Lorem ipsum dolor sit amet </span>
								<span> consectetur Posuere </span>
								<span>turpis nunc proin .</span>
							</p>
							<button className='text-primary-fourth bg-primary-first rounded-lg px-36 py-3 font-bold'>Downlaod Now</button>
						</div>
					</section>

					<section className='relative w-full flex justify-start items-start gap-20 mt-44 pl-32'>
						<img src={grayshadow3} alt='' className='absolute left-0 -top-[570px] -z-10   ' />

						<div className='flex flex-col gap-10 p-20 pr-24 rounded-[100px] justify-start text-primary-fourth bg-primary-second '>
							<p className='text-3xl flex flex-col items-center mr-20'>
								Get in Touch <span>with us</span>
							</p>
							<p className='text-2xl flex flex-col items-center mr-3 '>
								Mail us <span>Scrow_code@gmail.com</span>
							</p>
						</div>

						<form className='flex flex-col justify-center items-center gap-10'>
							<input
								type='text'
								placeholder='Your Name'
								className='bg-transparent placeholder:text-primary-first border-solid border-primary-first border-b-2 w-96 pb-3 font-bold outline-none'
							/>
							<input
								type='text'
								placeholder='Your Email'
								className='bg-transparent placeholder:text-primary-first border-solid border-primary-first border-b-2 w-96 pb-3 font-bold outline-none'
							/>
							<button className='text-primary-fourth bg-primary-first rounded-lg px-14 py-3 w-fit font-bold mt-32'>Contact US</button>
						</form>
					</section>
				</section>
			</main>
			<footer className='bg-primary-first mt-64 flex gap-16  text-[#95A3D5] font-bold pt-10 pl-10 pb-24 items-start'>
				<img src={whiteLogo} alt='' className="mt-5" />
				<div className='flex flex-col gap-1 ml-20'>
					<p className='mb-5 text-primary-fourth'> Navigation</p>
					<Link to={""} className="hover:text-primary-third">home</Link>
					<Link to={""} className="hover:text-primary-third">About us</Link>
					<Link to={""} className="hover:text-primary-third">Teams</Link>
					<Link to={""} className="hover:text-primary-third">find partner</Link>
				</div>
				<div className='flex flex-col gap-1 ml-48' >
					<p className='mb-5 text-primary-fourth'> LEGAL</p>
					<Link to={""} className="hover:text-primary-third">General Info</Link>
					<Link to={""} className="hover:text-primary-third">Privacy Policy</Link>
					<Link to={""} className="hover:text-primary-third">Terms of Service</Link>
				</div>
				<div className='flex flex-col gap-1'>
					<p className='mb-5 text-primary-fourth'> Talk To US</p>
					<Link to={""}> Scrow_code@gmail.com</Link>
				</div>
			</footer>
		</>
	);
};

export default Home;
