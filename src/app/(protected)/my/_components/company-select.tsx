"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminCompanyApi } from "@/lib/apis/admin/adminCompanyApi";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CompanySelectProps {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
}

export function CompanySelect({
  value,
  onChange,
  disabled,
}: CompanySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: () => adminCompanyApi.getAll(),
    initialData: [],
  });

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedCompany = companies.find((company) => company.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            selectedCompany?.companyName || "회사를 선택하세요"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full overflow-hidden p-2"
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex items-center rounded-md border px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="회사 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>
        <div className="max-h-60 overflow-y-auto">
          {filteredCompanies.length === 0 ? (
            <div className="py-2 text-center text-sm text-muted-foreground">
              검색 결과가 없습니다
            </div>
          ) : (
            filteredCompanies.map((company) => (
              <div
                key={company.id}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                  "cursor-pointer hover:bg-accent",
                  value === company.id && "bg-accent",
                )}
                onClick={() => {
                  onChange(value === company.id ? null : company.id);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    value === company.id ? "opacity-100" : "opacity-0",
                  )}
                />
                {company.companyName}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
