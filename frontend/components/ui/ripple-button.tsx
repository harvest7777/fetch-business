"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RippleButtonProps extends React.ComponentProps<"button"> {
  rippleColor?: string
}

function RippleButton({
  className,
  rippleColor = "#a855f7",
  children,
  onClick,
  ...props
}: RippleButtonProps) {
  const [isClicked, setIsClicked] = React.useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)
    onClick?.(e)
  }

  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
        "h-9 px-4 py-2",
        "border bg-background shadow-xs dark:bg-input/30 dark:border-input",
        "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "transition-transform duration-150",
        "disabled:pointer-events-none disabled:opacity-50",
        isClicked && "scale-95",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}

      {/* Spinning gradient border - only the outline */}
      <span
        className="pointer-events-none absolute inset-[-2px] rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-border-spin"
        style={{
          background: `conic-gradient(from 0deg, ${rippleColor}, ${rippleColor}66 90deg, transparent 180deg, ${rippleColor}66 270deg, ${rippleColor})`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "2px",
        }}
      />
    </button>
  )
}

export { RippleButton }
