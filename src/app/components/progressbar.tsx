"use client"
import React, { useEffect, useState } from 'react'
import { FaTrophy } from 'react-icons/fa'

const ProgressBar = () => {
  const MAX_WEEKLY_XP = 10000;
  const progressPercentage = 69;
  
  // Új state a megjelenített XP értékhez
  const [displayedXP, setDisplayedXP] = useState(0);
  const targetXP = Math.round((progressPercentage / 100) * MAX_WEEKLY_XP);

  // Számláló animáció
  useEffect(() => {
    const animationDuration = 500; // 500ms, ugyanannyi mint a progress bar animációja
    const steps = 100; // Hány lépésben történjen az animáció
    const stepDuration = animationDuration / steps;
    const increment = (targetXP - displayedXP) / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep === steps) {
        setDisplayedXP(targetXP); // Biztosítjuk a pontos végértéket
        clearInterval(timer);
      } else {
        setDisplayedXP(prev => Math.round(prev + increment));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetXP]); // Ha változik a targetXP, újra lefut az animáció

  return (
    <div className="fixed top-[84px] left-[10px] right-[10px] bg-gradient-to-r from-[#FFA6F9] to-[#FFA600] rounded-md px-6 py-4 mt-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),inset_0px_4px_4px_0px_rgba(255,255,255,.5)] h-[10rem]">
      <div className="flex justify-between items-center mb-[2rem]">
        <div className="flex items-center gap-3 translate-y-6">
          <FaTrophy className="text-white text-4xl" />
          <h3 className="text-4xl font-medium text-white">Heti teljesítményed</h3>
        </div>
        <span className="text-2xl text-white translate-y-6">
          {displayedXP}/{MAX_WEEKLY_XP}<span className='text-lg'> EXP</span>
        </span>
      </div>
      <div className="w-full bg-gray-200/80 rounded-md h-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25),inset_0px_4px_4px_0px_rgba(255,255,255,.6)] overflow-hidden">
        <div 
          className="h-4 shadow-inner rounded-tr-md rounded-br-md shadow-white/50"
          style={{
            width: `${progressPercentage}%`,
            background: 'linear-gradient(to right, #8498FF, #AFFFB5)',
            backgroundSize: '100vw 100%',
            backgroundPosition: 'left',
            transition: 'width 0.5s ease-in-out'
          }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar