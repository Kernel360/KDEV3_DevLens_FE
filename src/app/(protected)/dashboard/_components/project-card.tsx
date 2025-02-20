import { GetAdminDashboardResponse } from "@/lib/api/generated/admin/models";
import { GetMyProjectListGetMyProjectResponseInfo } from "@/lib/api/generated/main/models";
import { formatDate, getProjectStatusVariant } from "@/lib/utils";
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@ui";
import { Calendar, Circle } from "lucide-react";
import Link from "next/link";

type ProjectCardProps = GetMyProjectListGetMyProjectResponseInfo &
  GetAdminDashboardResponse;

export default function ProjectCard(props: ProjectCardProps) {
  const {
    id,
    projectName,
    currentStepName,
    startDate,
    endDate,
    customerCompanyName,
    developerCompanyName,
    projectTags,
    projectStatus,
  } = props;

  const getStatusColor = () =>
    // status: GetProjectListGetMyProjectResponseInfo["projectStatusCode"],
    {
      // switch (status) {
      //   case "진행중":
      //     return "bg-blue-500/15 text-blue-500 hover:bg-blue-500/25";
      //   case "완료":
      //     return "bg-green-500/15 text-green-500 hover:bg-green-500/25";
      //   case "중단":
      //     return "bg-red-500/15 text-red-500 hover:bg-red-500/25";
      //   case "예정":
      //     return "bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25";
      //   default:
      //     return "bg-gray-500/15 text-gray-500 hover:bg-gray-500/25";
      // }
    };

  return (
    <Link href={`/projects/${id}`}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold leading-normal">
                  {projectName}
                </h3>
                <div className="mt-4 flex flex-col gap-1 text-sm text-muted-foreground">
                  {projectStatus ? (
                    <>
                      <div className="flex items-center gap-2">
                        <p>고객사 :</p>
                        <p className="text-primary">{customerCompanyName}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <p>개발사 :</p>
                        <p className="text-primary">{developerCompanyName}</p>
                      </div>
                    </>
                  ) : (
                    <p>{customerCompanyName}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col place-items-end gap-2">
                {projectStatus && (
                  <Badge
                    variant={getProjectStatusVariant(projectStatus)}
                    className="shrink-0"
                  >
                    {projectStatus}
                  </Badge>
                )}
                {currentStepName && (
                  <Badge
                    variant="successOutline"
                    className={`${getStatusColor()} w-fit shrink-0`}
                  >
                    <Circle className="mr-2 h-2 w-2" />
                    {currentStepName}
                  </Badge>
                )}
              </div>
            </div>
          </CardTitle>
          {/* <CardDescription className="truncate"></CardDescription> */}
        </CardHeader>
        <CardContent className="flex justify-between text-sm">
          {startDate && endDate && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(startDate)}</span>
              </div>
              <span>-</span>
              <span>{formatDate(endDate)}</span>
            </div>
          )}
        </CardContent>
        {projectTags && projectTags.length > 0 && (
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {projectTags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="group-hover:bg-primary/5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
