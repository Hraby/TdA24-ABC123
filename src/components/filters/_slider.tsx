"use client"
 
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

type SliderProps = React.ComponentProps<typeof Slider>

export default function Component({name, data}: {name: string, data:  any}) {
    const [sliderValue, setSliderValue] = React.useState([100]);
    const [value, setValue] = React.useState(Math.floor(Math.max(...data)));

    const handleValue = (value: any) => {
        const priceValue = Math.floor(Math.max(...data)/100*value);
        setSliderValue(value);
        setValue(priceValue);
    };

    return (
    <DropdownMenu>
        <input type="hidden" name={name} value={value === Math.floor(Math.max(...data)) ? "max" : value}/>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">{name}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="flex items-center justify-between">
                <span>{name}</span>
                <span>{value} CZK</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Slider
            onValueChange={handleValue}
            defaultValue={sliderValue}
            max={100}
            step={1}
            className={cn("w-[100%]")}
            />
            <DropdownMenuSeparator />
        </DropdownMenuContent>
    </DropdownMenu>
    )
}
