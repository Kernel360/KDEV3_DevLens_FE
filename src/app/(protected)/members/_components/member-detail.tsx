"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminMemberApi } from "@/lib/apis/admin/adminMemberApi";
import { handlePhoneNumberChange } from "@/lib/utils";
import { createMemberSchema, type MemberFormValues } from "@/schemas/member";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MemberDetailProps {
  id: number;
}

type MemberDetailFormValues = Pick<
  MemberFormValues,
  | "loginId"
  | "name"
  | "email"
  | "role"
  | "phoneNumber"
  | "department"
  | "position"
  | "companyId"
>;

const memberDetailSchema = createMemberSchema.innerType().pick({
  loginId: true,
  name: true,
  email: true,
  role: true,
  phoneNumber: true,
  department: true,
  position: true,
  companyId: true,
});

export function MemberDetail({ id }: MemberDetailProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ["memberDetail", id],
    queryFn: () => adminMemberApi.getDetail(id),
  });

  const { mutate: updateMember } = useMutation({
    mutationFn: (formData: MemberDetailFormValues) =>
      adminMemberApi.update(id, {
        name: formData.name,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        department: formData.department,
        position: formData.position,
        companyId: formData.companyId,
      }),
    onSuccess: () => {
      toast.success("회원 정보가 수정되었습니다.");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["memberList"] });
    },
    onError: () => {
      toast.error("회원 정보 수정 중 오류가 발생했습니다.");
    },
  });

  const { mutate: deleteMember } = useMutation({
    mutationFn: () => adminMemberApi.delete(id),
    onSuccess: () => {
      toast.success("회원이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["memberList"] });
      router.push("/members");
    },
    onError: () => {
      toast.error("회원 삭제 중 오류가 발생했습니다.");
    },
  });

  const form = useForm<MemberDetailFormValues>({
    resolver: zodResolver(memberDetailSchema),
    defaultValues: {
      loginId: data?.loginId || "",
      name: data?.name || "",
      email: data?.email || "",
      role: data?.role || "USER",
      phoneNumber: data?.phoneNumber || "",
      department: data?.department || "",
      position: data?.position || "",
      companyId: data?.companyId || 0,
    },
  });

  const onSubmit = (formData: MemberDetailFormValues) => {
    updateMember(formData);
  };

  const handleDelete = () => {
    deleteMember();
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">회원 상세</h2>
        <div className="flex gap-2">
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "취소" : "수정"}
          </Button>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline-destructive">삭제</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>회원 삭제</DialogTitle>
                <DialogDescription>
                  정말 이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  취소
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  삭제
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="loginId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>권한</FormLabel>
                  <Select
                    disabled={!isEditing}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="권한 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">일반 사용자</SelectItem>
                      <SelectItem value="ADMIN">관리자</SelectItem>
                      <SelectItem value="SUPER">슈퍼 관리자</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>연락처</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      maxLength={13}
                      onChange={(e) => handlePhoneNumberChange(e, onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>부서</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>직책</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button type="submit">저장</Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default MemberDetail;
