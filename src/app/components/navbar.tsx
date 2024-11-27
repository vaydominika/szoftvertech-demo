"use client"
import React, { useState, useRef } from 'react'
import { FaSearch, FaUser, FaBars } from 'react-icons/fa'
import { CiSquarePlus } from "react-icons/ci";
import Link from 'next/link'
import { useModal } from '../components/context/ModalContext';
import CreatePostModal from './modals/CreatePostModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { setIsModalOpen } = useModal();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Add click outside listener
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 h-[94px] bg-[#F4F4F4] z-40'>
      <div className="fixed top-[10px] left-[10px] right-[10px] flex items-center px-6 py-4 bg-gradient-to-r from-[#8498FF] to-[#AFFFB5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),inset_0px_4px_4px_0px_rgba(255,255,255,.5)] rounded-md z-50">
        <div className="flex-none w-[200px]">
          <h1 className="text-4xl font-bold text-white">Learnify</h1>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 w-[400px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Böngéssz kurzusokat!"
              className="bg-[#F4F4F4] w-full px-4 py-2 rounded-md border focus:outline-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),inset_0px_4px_4px_0px_rgba(255,255,255,1)]"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="flex-none w-[160px] ml-auto flex items-center space-x-4 justify-end">
          <CiSquarePlus 
            className="w-7 h-7 text-white cursor-pointer hover:text-gray-200"
            onClick={() => setIsPostModalOpen(true)}
          />
          <Link href="/profile">
            <FaUser className="w-6 h-6 text-white cursor-pointer hover:text-gray-200" />
          </Link>
          <div className="relative" ref={menuRef}>
            <FaBars 
              className="w-6 h-6 text-white cursor-pointer hover:text-gray-200" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={() => {
                    // Add your logout logic here
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <CreatePostModal 
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  )
}

export default Navbar