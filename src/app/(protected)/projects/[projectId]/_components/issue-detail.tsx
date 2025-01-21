import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "../../../../../components/ui";
import { FileIcon, LinkIcon, MoreVertical, Pencil, Trash2 } from "lucide-react";

// TODO: 컴포넌트 쪼개기, 데이터 타입 정의
export default function IssueDetail() {
  return (
    <div className="overflow-y-auto">
      {/* 제목 및 메타 정보 */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold">
            2024년 1분기 프로젝트 계획 보고
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                수정하기
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
          <div>
            <span className="text-muted-foreground">작성자</span>
            <div className="mt-1 flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>김</AvatarFallback>
              </Avatar>
              <span>김철수</span>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">상태</span>
            <div className="mt-1">
              <Badge>진행중</Badge>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">마감일</span>
            <div className="mt-1">2024-03-31</div>
          </div>
          <div>
            <span className="text-muted-foreground">문서번호</span>
            <div className="mt-1">DOC-2024-001</div>
          </div>
          <div>
            <span className="text-muted-foreground">작성일</span>
            <div className="mt-1">2024-01-10 14:30</div>
          </div>
          <div>
            <span className="text-muted-foreground">수정일</span>
            <div className="mt-1">2024-01-10 15:45</div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-6">
        {/* 본문 */}
        <div className="prose prose-sm max-w-none">
          <p>안녕하세요, 2024년 1분기 프로젝트 계획에 대해 보고드립니다.</p>
          <p>주요 내용은 다음과 같습니다:</p>
          <ul>
            <li>신규 기능 개발 계획</li>
            <li>리소스 할당</li>
            <li>일정 관리</li>
            <li>예산 계획</li>
          </ul>
          <p>자세한 내용은 첨부된 문서를 참고해 주시기 바랍니다.</p>
        </div>

        {/* 첨부파일 */}
        <div>
          <h3 className="mb-3 font-medium">첨부파일</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <FileIcon className="h-4 w-4" />
              <a href="#" className="text-primary hover:underline">
                project-plan-2024-q1.pdf
              </a>
              <span className="text-muted-foreground">(2.5MB)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileIcon className="h-4 w-4" />
              <a href="#" className="text-primary hover:underline">
                budget-2024-q1.xlsx
              </a>
              <span className="text-muted-foreground">(1.8MB)</span>
            </div>
          </div>
        </div>

        {/* 관련 링크 */}
        <div>
          <h3 className="mb-3 font-medium">관련 링크</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <LinkIcon className="h-4 w-4" />
              <a
                href="#"
                target="_blank"
                className="text-primary hover:underline"
              >
                2023년 4분기 프로젝트 결과 보고
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <LinkIcon className="h-4 w-4" />
              <a href="#" className="text-primary hover:underline">
                연간 프로젝트 로드맵
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-100"></div>
    </div>
  );
}
