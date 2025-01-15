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
  const { id, title, description, status, startAt, endAt, client } = props;
  return (
    <Link href={`/projects/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h3>{title}</h3>
            <Badge variant="outline">{status}</Badge>
          </CardTitle>
          <CardDescription className="truncate">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between text-sm">
          <div>{client}</div>
          <div>
            {startAt} ~ {endAt}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
