import React from 'react';
import logo from '../assets/logo.webp'
import { Youtube, Linkedin, Instagram } from 'lucide-react'


const Footer = () => {
    return (
        <footer className="bg-blue-100 py-8">
            <div className="container mx-auto max-w-[1150px] flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <img src={logo} alt="IONOTS Logo" className="h-[100px] w-[200px]" />
                    <div className="flex mt-4">
                        <a href="#" className="p-2 rounded-full bg-blue-500 text-white mr-2">
                            <Linkedin className='text-white'/>
                        </a>
                        <a href="#" className="p-2 rounded-full bg-red-500 text-white mr-2">
                            <Youtube className='text-white'/>
                        </a>
                        <a href="#" className="p-2 rounded-full bg-pink-500 text-white">
                            <Instagram className='text-white'/>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                    <div className="flex flex-col">
                        <h3 className="text-gray-800 font-bold mb-2">Courses</h3>
                        <ul className="list-none">
                            <li className="text-gray-600">
                                <a href="#">Data Science</a>
                            </li>
                            <li className="text-gray-600">
                                <a href="#">Ai & ML</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-gray-800 font-bold mb-2">Legal</h3>
                        <ul className="list-none">
                            <li className="text-gray-600">
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li className="text-gray-600">
                                <a href="#">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className='w-[80%] ml-[150px] mt-[50px] border-zinc-500' />
            <div className='text-center'>
                <p>© 2024 IONOTS All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;