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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
 
export default function Component({name,data,params}: {name: any, data: any, params?: any}) {
  const [position, setPosition] = React.useState(params ? params : "all")
 
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  )
  return (
    <DropdownMenu modal={false}>
        <input type="hidden" name={name} value={position}/>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 w-56">
        <ScrollArea className="h-56 w-full p-0 rounded-md">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem key={0} value="all" onSelect={event => event.preventDefault()}>Nerozhoduje</DropdownMenuRadioItem>
              {data.map((items: any, index: number) =>(
                  <DropdownMenuRadioItem key={index} onSelect={event => event.preventDefault()} value={items}>{items}</DropdownMenuRadioItem>
              ))}
          </DropdownMenuRadioGroup>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}