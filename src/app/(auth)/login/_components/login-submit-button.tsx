import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginSubmitButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <Button disabled={isSubmitting} type="submit" className="w-full">
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          로그인 중...
        </>
      ) : (
        "로그인"
      )}
    </Button>
  );
}
