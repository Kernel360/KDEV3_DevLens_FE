import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Button,
} from "@ui";
import Heading from "@/components/ui/heading";
import { useMemberStore } from "@/store/useMemberAssignStore";

interface HandleMemberAssignmentProps {
  type: "developer" | "customer";
  title: string;
}

export function HandleMemberAssignment({
  type,
  title,
}: HandleMemberAssignmentProps) {
  const store = useMemberStore();

  const section = type === "customer" ? store.customer : store.developer;
  const { members, selectedApprovers, selectedNormal, activeRole, isLoading } =
    section;

  console.log("selectedApprovers", selectedApprovers);
  console.log("selectedNormal", selectedNormal);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading as="h2" size="lg">
          {title}
        </Heading>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => store.reset(type)}
        >
          선택 초기화
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[40%_1fr]">
        {/* 좌측: 전체 멤버 */}
        <Card>
          <CardHeader>
            <CardTitle>전체 멤버</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[300px]">
              <div className="flex flex-wrap gap-2">
                {members.map((member) => {
                  const isApprover = selectedApprovers.some(
                    (m) => m.memberId === member.memberId,
                  );
                  const isNormal = selectedNormal.some(
                    (m) => m.memberId === member.memberId,
                  );
                  const isDisabled = isApprover || isNormal;

                  return (
                    <Badge
                      key={member.memberId}
                      variant="outline"
                      className={`cursor-pointer transition-colors ${
                        isApprover || isNormal
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary hover:text-primary-foreground"
                      } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                      onClick={() =>
                        !isDisabled && store.selectMember(type, member)
                      }
                    >
                      {store.formatMemberLabel(member)}
                    </Badge>
                  );
                })}
                {!isLoading && members.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    {section.companyId
                      ? "멤버가 없습니다"
                      : "회사를 선택해주세요"}
                  </p>
                )}
                {isLoading && (
                  <p className="text-sm text-muted-foreground">
                    불러오는 중...
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 우측: 승인권자 & 일반 참여 멤버 영역 */}
        <div className="grid grid-rows-2 gap-4">
          {/* 상단: 승인권자 */}
          <Card
            className={`cursor-pointer ${
              activeRole === "APPROVER" ? "border-primary" : ""
            }`}
            onClick={() => store.setActiveRole(type, "APPROVER")}
          >
            <CardHeader>
              <CardTitle>승인권자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedApprovers.length > 0 ? (
                  selectedApprovers.map((member) => (
                    <Badge
                      key={member.memberId}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        store.removeMember(type, "APPROVER", member.memberId);
                      }}
                    >
                      {store.formatMemberLabel(member)}{" "}
                      <span className="ml-1">✕</span>
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    선택된 승인권자가 없습니다
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 하단: 일반 참여 멤버 */}
          <Card
            className={`cursor-pointer ${
              activeRole === "NORMAL" ? "border-primary" : ""
            }`}
            onClick={() => store.setActiveRole(type, "NORMAL")}
          >
            <CardHeader>
              <CardTitle>일반참여멤버</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedNormal.length > 0 ? (
                  selectedNormal.map((member) => (
                    <Badge
                      key={member.memberId}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        store.removeMember(type, "NORMAL", member.memberId);
                      }}
                    >
                      {store.formatMemberLabel(member)}{" "}
                      <span className="ml-1">✕</span>
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    선택된 일반참여멤버가 없습니다
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
