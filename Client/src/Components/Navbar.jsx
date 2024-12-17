import React from 'react'
import logo from '../assets/logo.webp'
import { Phone, Mail } from 'lucide-react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const navItems = [
        { name: "Project", to: "/" },
        { name: "Progress", to: "/Progress-Tracker" },
        { name: "Blogs", to: "/" },
        { name: "Contact us", to: "/" },
    ];

    return (
        <div>
            <div className="top flex bg-blue-100">
                <p>AI/ Data science Training</p>
                <div className='flex right'>
                    <Phone size={17} style={{ marginTop: "3px" }} />
                    <p>90003 02102</p>
                    <Mail size={17} style={{ marginTop: "3px" }} />
                    <p>info@ionots.com</p>
                </div>
            </div>
            <div className="flex rightnav h-[100px] items-center">
                <img src={logo} alt="Logo" className="w-[10%] h-[60%]" />
                <ul className="flex space-x-5 mr-[10px] gap-[20px]">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.to}
                                className={`text-xl`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <select name="" id="" className='text-center text-[20px] outline-none'>
                        <option value="" className='bg-white-200 hover:bg-zinc-800'>Our Courses</option>
                        <option value="" className='bg-white-200 hover:bg-zinc-800'>AIML</option>
                        <option value="" className='bg-white-200 hover:bg-zinc-800'>Data Science</option>
                    </select>
                </ul>
                <button className='bg-blue-500 w-[160px] h-[40px] hover:bg-blue-400 text-white rounded-[5px]'>Register Yourself</button>
            </div>

        </div>
    )
}

export default Navbar


