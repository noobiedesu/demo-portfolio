import * as React from "react"
import { cn } from "@/lib/utils"

export interface GravityProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  gravity?: number
  friction?: number
  bounce?: number
}

export const Gravity = React.forwardRef<HTMLDivElement, GravityProps>(
  ({ className, children, gravity = 0.5, friction = 0.99, bounce = 0.8, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [items, setItems] = React.useState<Array<{
      id: string
      element: HTMLElement
      x: number
      y: number
      vx: number
      vy: number
      isDragging: boolean
    }>>([])

    React.useEffect(() => {
      const container = containerRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const itemElements = Array.from(container.querySelectorAll('[data-gravity-item]')) as HTMLElement[]
      
      const initialItems = itemElements.map((element, index) => ({
        id: element.dataset.gravityItem || `item-${index}`,
        element,
        x: Math.random() * (containerRect.width - element.offsetWidth),
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: 0,
        isDragging: false
      }))

      setItems(initialItems)

      let animationId: number
      
      const animate = () => {
        setItems(prevItems => {
          const newItems = prevItems.map(item => {
            if (item.isDragging) return item

            const containerRect = container.getBoundingClientRect()
            const itemRect = item.element.getBoundingClientRect()
            
            // Apply gravity
            item.vy += gravity
            
            // Apply friction
            item.vx *= friction
            item.vy *= friction
            
            // Update position
            item.x += item.vx
            item.y += item.vy
            
            // Boundary collision
            if (item.x < 0) {
              item.x = 0
              item.vx *= -bounce
            }
            if (item.x + itemRect.width > containerRect.width) {
              item.x = containerRect.width - itemRect.width
              item.vx *= -bounce
            }
            if (item.y < 0) {
              item.y = 0
              item.vy *= -bounce
            }
            if (item.y + itemRect.height > containerRect.height) {
              item.y = containerRect.height - itemRect.height
              item.vy *= -bounce
            }
            
            // Apply transform
            item.element.style.transform = `translate(${item.x}px, ${item.y}px)`
            
            return item
          })
          
          // Item collision detection
          for (let i = 0; i < newItems.length; i++) {
            for (let j = i + 1; j < newItems.length; j++) {
              const item1 = newItems[i]
              const item2 = newItems[j]
              
              if (item1.isDragging || item2.isDragging) continue
              
              const dx = item1.x - item2.x
              const dy = item1.y - item2.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const minDistance = 60 // Approximate chip size
              
              if (distance < minDistance) {
                const angle = Math.atan2(dy, dx)
                const targetX = item1.x + Math.cos(angle) * minDistance
                const targetY = item1.y + Math.sin(angle) * minDistance
                
                const ax = (targetX - item2.x) * 0.1
                const ay = (targetY - item2.y) * 0.1
                
                item1.vx -= ax
                item1.vy -= ay
                item2.vx += ax
                item2.vy += ay
              }
            }
          }
          
          return newItems
        })
        
        animationId = requestAnimationFrame(animate)
      }
      
      animate()
      
      return () => {
        if (animationId) cancelAnimationFrame(animationId)
      }
    }, [gravity, friction, bounce])

    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Gravity.displayName = "Gravity"

export interface GravityItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  id?: string
}

export const GravityItem = React.forwardRef<HTMLDivElement, GravityItemProps>(
  ({ className, children, id, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-gravity-item={id}
        className={cn("absolute cursor-grab active:cursor-grabbing", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GravityItem.displayName = "GravityItem"