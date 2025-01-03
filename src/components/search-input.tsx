import { SearchIcon } from "lucide-react";
import { Input } from "./ui";

export default function SearchInput() {
  return (
    <>
      <div className="relative">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </div>
        <Input
          id="search"
          type="search"
          placeholder="검색"
          className="w-full rounded-lg bg-background pl-8"
        />
      </div>
    </>
  );
}
