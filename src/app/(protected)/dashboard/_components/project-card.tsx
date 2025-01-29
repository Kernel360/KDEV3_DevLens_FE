import { Project } from "@/types/project";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui";
import Link from "next/link";

export default function ProjectCard(props: Project) {
  const {
    projectId,
    projectName,
    projectDescription,
    projectStatusCode,
    startDate,
    endDate,
    customerCompanyName,
  } = props;
  return (
    <Link href={`/projects/${projectId}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h3>{projectName}</h3>
            <Badge variant="outline">{projectStatusCode}</Badge>
          </CardTitle>
          <CardDescription className="truncate">
            {projectDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between text-sm">
          <div>{customerCompanyName}</div>
          <div>
            {startDate} ~ {endDate}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
