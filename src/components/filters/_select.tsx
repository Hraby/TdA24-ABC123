"use client"
 
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
export default function Component({name,data}: {name: any, data: any}) {
  const [position, setPosition] = React.useState("all")
 
  return (
    <DropdownMenu>
        <input type="hidden" name={name} value={position}/>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="all" onSelect={event => event.preventDefault()}>Nerozhoduje</DropdownMenuRadioItem>
            {data.map((items: any, index: number) =>(
                <DropdownMenuRadioItem key={index} onSelect={event => event.preventDefault()} value={items}>{items}</DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}