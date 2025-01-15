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


export default function TableTools() {
  const [sort, setSort] = useQueryState("sort", {
    defaultValue: "recent",
  });
  const [search, setSearch] = useQueryState("search");
  const [filter, setFilter] = useQueryState("filter");

  return (
    <div className="my-3 flex w-full justify-between gap-2">
      <div className="flex flex-grow gap-2">
        <Select value={filter ?? undefined} onValueChange={setFilter}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="title">제목</SelectItem>
              <SelectItem value="content">내용</SelectItem>
              <SelectItem value="author">작성자</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <SearchInput
          value={search ?? ""}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => {
            /* TODO: 검색 로직 */
          }}
        >
          검색
        </Button>
      </div>
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-20">
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="recent">최신 순</SelectItem>
            <SelectItem value="old">오래된 순</SelectItem>
            <SelectItem value="deadline">마감일 순</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
