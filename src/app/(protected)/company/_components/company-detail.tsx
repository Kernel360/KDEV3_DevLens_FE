"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { useUpdateCompany } from "@/lib/api/generated/admin/services/administrator-company-management-api/administrator-company-management-api";
import { adminCompanyApi } from "@/lib/apis/admin/adminCompanyApi";
import { BUSINESS_TYPE_OPTIONS } from "@/lib/constants/selects";
import {
  handlePhoneNumberChange,
  handleRegistrationNumberChange,
} from "@/lib/utils";
import { updateCompanySchema } from "@/schemas/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CompanyDetail({ id }: { id: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [, setPendingDeactivation] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ["companyDetail", id],
    queryFn: () => adminCompanyApi.getDetail(id),
  });

  const { mutate: updateCompany } = useUpdateCompany({
    mutation: {
      onSuccess: () => {
        toast.success("회사 정보가 수정되었습니다.");
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ["companyList"] });
        queryClient.invalidateQueries({
          queryKey: ["/api/admin/companies", id],
        });
      },
      onError: () => {
        toast.error("회사 정보 수정 중 오류가 발생했습니다.");
      },
    },
  });

  const form = useForm({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      companyName: data?.companyName || "",
      businessType: data?.businessType || "CORPORATION",
      registrationNumber: data?.businessRegistrationNumber || "",
      representativeName: data?.representativeName || "",
      representativeContact: data?.representativeContact || "",
      email: data?.representativeEmail || "",
      address: data?.address || "",
      isActive: data?.isActive === "Y" ? "Y" : "N",
    },
  });

  const handleStatusChange = (value: string) => {
    const isActive = value === "active";
    if (!isActive) {
      setIsDeactivateDialogOpen(true);
      setPendingDeactivation(true);
      return;
    }
    form.setValue("isActive", isActive ? "Y" : "N");
  };

  const handleDeactivateConfirm = () => {
    form.setValue("isActive", "N");
    setIsDeactivateDialogOpen(false);
    setPendingDeactivation(false);
  };

  const handleDeactivateCancel = () => {
    form.setValue("isActive", "Y");
    setIsDeactivateDialogOpen(false);
    setPendingDeactivation(false);
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">회사 상세</h2>
        <div className="flex items-center gap-4">
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "취소" : "수정"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((formData) => {
            if (!id) return;
            updateCompany({
              id,
              data: {
                companyName: formData.companyName,
                businessType: formData.businessType,
                businessRegistrationNumber: formData.registrationNumber,
                representativeName: formData.representativeName,
                representativeContact: formData.representativeContact,
                representativeEmail: formData.email,
                address: formData.address,
                isActive: formData.isActive as "Y" | "N",
              },
            });
          })}
          className="space-y-6"
        >
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
              name="representativeContact"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>대표 연락처</FormLabel>
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

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>활성화 상태</FormLabel>
                  <Select
                    disabled={!isEditing}
                    onValueChange={handleStatusChange}
                    value={field.value === "Y" ? "active" : "inactive"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>
                          {field.value === "Y" ? "활성화" : "비활성화"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">활성화</SelectItem>
                      <SelectItem value="inactive">비활성화</SelectItem>
                    </SelectContent>
                  </Select>
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

      <AlertDialog
        open={isDeactivateDialogOpen}
        onOpenChange={setIsDeactivateDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>비활성화 하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              회사를 비활성화하면 회사에 소속된 모든 회원들도 비활성화 됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeactivateCancel}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeactivateConfirm}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
