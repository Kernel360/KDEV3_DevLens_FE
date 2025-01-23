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
    id,
    projectName,
    projectDescription,
    projectStatusCode,
    startDate,
    endDate,
    customerName,
  } = props;
  return (
    <Link href={`/projects/${id}`}>
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
          <div>{customerName}</div>
          <div>
            {startDate} ~ {endDate}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
