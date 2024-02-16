"use client"
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function Component({name, data} : {name:any,data: any}){
    const [checked, setChecked] = React.useState<Checked[]>(new Array(data.length).fill(false));
    const [filters, setFilters] = React.useState<string[]>([]);

    const handleCheckedChange = (index: number, items: any) => {
        const newCheckedItems = [...checked];
        newCheckedItems[index] = !newCheckedItems[index];
        const updatedFilters = new Set(filters);
        if (newCheckedItems[index]) {
            updatedFilters.add(items);
        } else {
            updatedFilters.delete(items);
        }
        const updatedTagsArray = Array.from(updatedFilters);
        setFilters(updatedTagsArray);
        setChecked(newCheckedItems);
    };

    return(
        <DropdownMenu>
            <input type="hidden" name={name} value={filters.filter(item => item).join(', ')}/>
            <DropdownMenuTrigger asChild>
                <Button type="submit" variant="outline">{name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {data.map((items: any, index: number)=> (
                    <DropdownMenuCheckboxItem
                    textValue={items}
                    key={index}
                    checked={checked[index]}
                    onCheckedChange={() => handleCheckedChange(index, items)}
                    onSelect={event => event.preventDefault()}
                    >
                        {items}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}