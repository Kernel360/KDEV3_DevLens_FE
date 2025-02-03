"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";
import { SearchInput } from "../search-input";
import {
  DEFAULT_ROLE_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_STATUS_OPTIONS,
} from "@/lib/constants/selects";
import { DEFAULT_FILTER_OPTIONS } from "@/lib/constants/selects";
import { useState } from "react";
import { X } from "lucide-react";

interface TableToolsProps {
  showFilter?: boolean;
  showSort?: boolean;
  showStatus?: boolean;
  showRole?: boolean;
}

export default function TableTools({
  showFilter = false,
  showSort = true,
  showStatus = false,
  showRole = false,
}: TableToolsProps) {
  const [sortType, setSortType] = useQueryState("sortType", {
    defaultValue: "NEWEST",
  });
  const [search, setSearch] = useQueryState("search");
  const [filter, setFilter] = useQueryState("filter");
  const [status, setStatus] = useQueryState("status");
  const [role, setRole] = useQueryState("role");

  // 로컬 검색어 상태 추가
  const [searchInput, setSearchInput] = useState(search ?? "");

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    setSearch(searchInput);
  };

  return (
    <div className="my-3 flex w-full justify-between gap-2 p-1">
      <div className="flex flex-grow gap-2">
        {showStatus && (
          <Select value={status ?? undefined} onValueChange={setStatus}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {DEFAULT_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {showRole && (
          <Select value={role ?? undefined} onValueChange={setRole}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="권한" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {DEFAULT_ROLE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {showSort && (
          <Select value={sortType} onValueChange={setSortType}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {DEFAULT_SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      {showFilter && (
        <Select value={filter ?? undefined} onValueChange={setFilter}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {DEFAULT_FILTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      <div className="relative">
        <SearchInput
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        {searchInput && (
          <button
            onClick={() => {
              setSearchInput("");
              setSearch(null);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-zinc-100"
          >
            <X className="size-3 text-zinc-500" />
          </button>
        )}
      </div>
      <Button onClick={handleSearch}>검색</Button>
    </div>
  );
}
