"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { adminCompanyApi } from "@/lib/apis/admin/adminCompanyApi";
import { formatPhoneNumber, formatRegistrationNumber } from "@/lib/utils";
import { createCompanySchema, type CompanyFormData } from "@/schemas/company";
import {
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function handleRegistrationNumberChange(
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
) {
  const formatted = formatRegistrationNumber(e.target.value);
  e.target.value = formatted;
  onChange(e);
}

function handlePhoneNumberChange(
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
) {
  const formatted = formatPhoneNumber(e.target.value);
  e.target.value = formatted;
  onChange(e);
}

export function CompanyForm() {
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
  const router = useRouter();
  // const departmentInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: CompanyFormData) => {
    try {
      const requestData = {
        companyName: data.companyName,
        businessType:
          data.businessType === "법인" ? "CORPORATION" : "INDIVIDUAL",
        businessRegistrationNumber: data.registrationNumber,
        representativeName: data.representativeName,
        representativeContact: data.representativeContact,
        representativeEmail: data.email,
        address: data.address,
        // departments: data.departments,
      } as const;
      await adminCompanyApi.create(requestData);
      toast.success("회사 생성이 완료되었습니다.", {
        action: {
          label: "회사 목록으로 이동",
          onClick: () => router.push("/company"),
        },
      });
    } catch (error) {
      toast.error(`회사 생성중 오류가 발생했습니다. ${error}`);
    }
  };

  // const getDepartments = () => form.getValues("departments");
  // const setDepartments = (departments: string[]) =>
  //   form.setValue("departments", departments);

  // const addDepartment = (value: string) => {
  //   const trimmedValue = value.trim();
  //   if (!trimmedValue) return;

  //   const currentDepartments = getDepartments();
  //   if (!currentDepartments.includes(trimmedValue)) {
  //     setDepartments([...currentDepartments, trimmedValue]);
  //   }
  // };

  // const removeDepartment = (department: string) => {
  //   const currentDepartments = getDepartments();
  //   setDepartments(currentDepartments.filter((d) => d !== department));
  // };

  // const handleAddDepartment = () => {
  //   if (!departmentInputRef.current) return;

  //   addDepartment(departmentInputRef.current.value);
  //   departmentInputRef.current.value = "";
  // };

  return (
    <div className="p-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
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

            {/* <FormField
            control={form.control}
            name="departments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>부서</FormLabel>
                <div className="flex gap-2">
                  <Input
                    ref={departmentInputRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddDepartment();
                      }
                    }}
                    placeholder="부서명을 입력하세요"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddDepartment}>
                    부서 추가
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {field.value.map((department, index) => (
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
                <FormMessage />
              </FormItem>
            )}
          /> */}
          </div>

          <Button type="submit" className="w-full">
            생성
          </Button>
        </form>
      </Form>
    </div>
  );
}
