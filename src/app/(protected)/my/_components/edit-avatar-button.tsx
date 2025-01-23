import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function EditAvatarButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute -bottom-2 -right-2 size-8 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <Pencil className="size-4" />
    </Button>
  );
}
