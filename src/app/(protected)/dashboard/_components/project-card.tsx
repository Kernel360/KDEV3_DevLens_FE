import { GetProjectListGetMyProjectResponseInfo } from "@/lib/api/generated/main/models";
import {
  // Badge,
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@ui";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function ProjectCard(
  props: GetProjectListGetMyProjectResponseInfo,
) {
  const {
    id,
    projectName,
    // name,
    // projectDescription,
    // projectStatusCode,
    startDate,
    endDate,
    customerCompanyName,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getStatusColor = (
    // status: GetProjectListGetMyProjectResponseInfo["projectStatusCode"],
  ) => {
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
              {/* <Badge
                variant="secondary"
                className={`${getStatusColor(projectStatusCode)} shrink-0`}
              >
                {projectStatusCode}
                상태
              </Badge> */}
            </div>
          </CardTitle>
          {/* <CardDescription className="truncate">
            {projectDescription}
          </CardDescription> */}
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
      </Card>
    </Link>
  );
}
