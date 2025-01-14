"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { createCompany } from "@/lib/actions/company";
import { createCompanySchema, type CompanyFormData } from "@/schemas/company";
import {
  Badge,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
} from "@ui";
import { formatPhoneNumber, formatRegistrationNumber } from "@/lib/utils";

export function CompanyForm() {
  const [departments, setDepartments] = useState<string[]>([]);
  const [newDepartment, setNewDepartment] = useState("");

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      companyName: "",
      businessType: "법인",
      registrationNumber: "", // 사업자등록번호
      representativeName: "", // 대표자명
      representativeContact: "", // 대표번호
      email: "", // 대표 이메일
      address: "", // 주소
      departments: [], // 부서
    },
  });

  const onSubmit = (data: CompanyFormData) => {
    console.log(data);
    // startTransition(async () => {
    //   try {
    //     const result = await createCompany({
    //       ...data,
    //       departments,
    //     });

    //     if (result.success) {
    //       toast.success(result.message);
    //       form.reset();
    //       setDepartments([]);
    //     } else {
    //       toast.error(result.message);
    //     }
    //   } catch (error) {
    //     toast.error("예기치 못한 오류가 발생했습니다.");
    //   }
    // });
  };

  const addDepartment = () => {
    if (newDepartment.trim() && !departments.includes(newDepartment)) {
      const updatedDepartments = [...departments, newDepartment.trim()];
      setDepartments(updatedDepartments);
      form.setValue("departments", updatedDepartments);
      setNewDepartment("");
    }
  };

  const removeDepartment = (department: string) => {
    const updatedDepartments = departments.filter((d) => d !== department);
    setDepartments(updatedDepartments);
    form.setValue("departments", updatedDepartments);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>회사명</FormLabel>
                <FormControl>
                  <Input placeholder="회사명을 입력하세요" {...field} />
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
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="법인" id="corporate" />
                      <FormLabel htmlFor="corporate">법인</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="개인" id="individual" />
                      <FormLabel htmlFor="individual">개인</FormLabel>
                    </div>
                  </RadioGroup>
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
                    placeholder="123-45-67890"
                    maxLength={12}
                    {...field}
                    onChange={(e) => {
                      const formatted = formatRegistrationNumber(
                        e.target.value,
                      );
                      e.target.value = formatted;
                      onChange(e);
                    }}
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
                  <Input placeholder="대표자명을 입력하세요" {...field} />
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
                    placeholder="02-1234-5678"
                    maxLength={13}
                    {...field}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      e.target.value = formatted;
                      onChange(e);
                    }}
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
                  <Input
                    type="email"
                    placeholder="example@company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>주소</FormLabel>
                <FormControl>
                  <Input placeholder="회사 주소를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>부서</FormLabel>
            <div className="flex gap-2">
              <Input
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addDepartment();
                  }
                }}
                placeholder="부서명을 입력하세요"
                className="flex-1"
              />
              <Button type="button" onClick={addDepartment}>
                부서 추가
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {departments.map((department, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {department}
                  <button
                    type="button"
                    onClick={() => removeDepartment(department)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {/* {departments.length === 0 && (
              <p className="text-sm text-muted-foreground">
                최소 1개 이상의 부서를 입력해주세요
              </p>
            )} */}
          </div>
        </div>

        <Button type="submit" className="w-full">생성</Button>
      </form>
    </Form>
  );
}
