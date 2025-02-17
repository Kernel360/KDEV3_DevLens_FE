import { GetMyProjectListGetMyProjectResponseInfo } from "@/lib/api/generated/main/models";
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

export default function ProjectCard(
  props: GetMyProjectListGetMyProjectResponseInfo,
) {
  const {
    id,
    projectName,
    currentStepName,
    startDate,
    endDate,
    customerCompanyName,
    // developerCompanyName,
    projectTags,
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
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold leading-normal">
                  {projectName}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {customerCompanyName}
                </p>
              </div>
              {currentStepName && (
                <Badge
                  variant="successOutline"
                  className={`${getStatusColor()} shrink-0`}
                >
                  <Circle className="mr-2 h-2 w-2" />
                  {currentStepName}
                </Badge>
              )}
            </div>
          </CardTitle>
          {/* <CardDescription className="truncate"></CardDescription> */}
        </CardHeader>
        <CardContent className="flex justify-between text-sm">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{startDate}</span>
            </div>
            <span>-</span>
            <span>{endDate}</span>
          </div>
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
