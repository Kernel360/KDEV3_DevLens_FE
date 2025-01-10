import { SearchInput } from "@/components/search-input";
import { postListData, projectSteps } from "@/lib/mockData";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@ui";
import Link from "next/link";
import { postListColumns } from "./post-list-columns";
import PostTableWithSheet from "@/components/post-table-with-sheet";

export default async function ProjectStepPage({
  params,
}: {
  params: Promise<{ stepId: string }>;
}) {
  const { stepId } = await params;
  const steps = projectSteps;
  return (
    <>
      <Tabs defaultValue={stepId} className="w-full">
        <TabsList>
          {steps.map((step) => (
            <Link key={step.id} href={`./${step.id}`} replace>
              <TabsTrigger value={step.id}>{step.title}</TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
      {/* Table tools */}
      <div className="my-3 flex justify-between gap-2">
        <div className="flex gap-2">
          <Select>
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
          <SearchInput />
          <Button>검색</Button>
        </div>
        <Select>
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
      {/* Table */}
      <PostTableWithSheet columns={postListColumns} data={postListData} />
    </>
  );
}
