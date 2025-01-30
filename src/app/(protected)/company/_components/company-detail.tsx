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
import { adminCompanyApi } from "@/lib/apis/admin/adminCompanyApi";
import { BUSINESS_TYPE_OPTIONS } from "@/lib/constants/selects";
import {
  handlePhoneNumberChange,
  handleRegistrationNumberChange,
} from "@/lib/utils";
import { createCompanySchema, type CompanyFormData } from "@/schemas/company";
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

interface CompanyDetailProps {
  id: number;
}

export default function CompanyDetail({ id }: CompanyDetailProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ["companyDetail", id],
    queryFn: () => adminCompanyApi.getDetail(id),
  });

  const { mutate: updateCompany } = useMutation({
    mutationFn: (formData: CompanyFormData) =>
      adminCompanyApi.update(id, {
        companyName: formData.companyName,
        businessType: formData.businessType,
        businessRegistrationNumber: formData.registrationNumber,
        representativeName: formData.representativeName,
        representativeContact: formData.representativeContact,
        representativeEmail: formData.email,
        address: formData.address,
      }),
    onSuccess: () => {
      toast.success("회사 정보가 수정되었습니다.");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["companyList"] });
    },
    onError: () => {
      toast.error("회사 정보 수정 중 오류가 발생했습니다.");
    },
  });

  const { mutate: deleteCompany } = useMutation({
    mutationFn: () => adminCompanyApi.delete(id),
    onSuccess: () => {
      toast.success("회사가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["companyList"] });
      router.push("/company");
    },
    onError: () => {
      toast.error("회사 삭제 중 오류가 발생했습니다.");
    },
  });

  const form = useForm({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      companyName: data?.companyName || "",
      businessType: data?.businessType || "CORPORATION",
      registrationNumber: data?.businessRegistrationNumber || "",
      representativeName: data?.representativeName || "",
      representativeContact: data?.representativeContact || "",
      email: data?.representativeEmail || "",
      address: data?.address || "",
    },
  });

  const onSubmit = (formData: CompanyFormData) => {
    updateCompany({
      ...formData,
    });
  };

  const handleDelete = () => {
    deleteCompany();
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">회사 상세</h2>
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
                <DialogTitle>회사 삭제</DialogTitle>
                <DialogDescription>
                  정말 이 회사를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>회사명</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>사업자 유형</FormLabel>
                  <Select
                    disabled={!isEditing}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>
                          {
                            BUSINESS_TYPE_OPTIONS[
                              field.value as keyof typeof BUSINESS_TYPE_OPTIONS
                            ]
                          }
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(BUSINESS_TYPE_OPTIONS).map(
                        ([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>사업자등록번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      maxLength={12}
                      onChange={(e) =>
                        handleRegistrationNumberChange(e, onChange)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="representativeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>대표자명</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="representativeContact"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>대표번호</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>대표 이메일</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>주소</FormLabel>
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
