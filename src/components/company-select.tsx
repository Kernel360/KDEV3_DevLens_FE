'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui"
import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from "react"

const companies = [
  { value: "tech-corp", label: "테크 주식회사" },
  { value: "dev-inc", label: "개발 주식회사" },
  { value: "software-ltd", label: "소프트웨어 주식회사" },
  { value: "it-solutions", label: "IT 솔루션즈" },
  { value: "digital-corp", label: "디지털 주식회사" },
]

interface CompanySelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function CompanySelect({ value, onChange, disabled }: CompanySelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {value
            ? companies.find((company) => company.value === value)?.label
            : "회사를 선택하세요"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="회사 검색..." />
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup>
            {companies.map((company) => (
              <CommandItem
                key={company.value}
                value={company.value}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === company.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {company.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

