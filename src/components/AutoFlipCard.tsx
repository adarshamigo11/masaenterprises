import { useState, useEffect } from "react"

interface AutoFlipCardProps {
  children: React.ReactNode
}

export default function AutoFlipCard({ children }: AutoFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    // Only auto-flip on mobile (screen width < 768px)
    const checkMobile = () => window.innerWidth < 768
    
    if (!checkMobile()) return

    const flipInterval = setInterval(() => {
      setIsFlipped((prev: boolean) => !prev)
    }, 6000) // Flip every 3 seconds slowly

    return () => clearInterval(flipInterval)
  }, [])

  return (
    <div className="perspective">
      <div 
        className="relative h-48 preserve-3d transition-transform duration-2000 cursor-pointer"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {children}
      </div>
    </div>
  )
}
