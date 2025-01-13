"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { cn, formatPhoneNumber } from "@/lib/utils";
import { createMemberSchema, type MemberFormValues } from "@/schemas/member";
import {
  Button,
  Calendar,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui";

// 예시 데이터
const companies = [
  { label: "Vercel", value: "vercel" },
  { label: "Google", value: "google" },
  { label: "Microsoft", value: "microsoft" },
  { label: "Apple", value: "apple" },
  { label: "Amazon", value: "amazon" },
];

const departments = [
  { label: "개발팀", value: "development" },
  { label: "디자인팀", value: "design" },
  { label: "마케팅팀", value: "marketing" },
  { label: "영업팀", value: "sales" },
  { label: "인사팀", value: "hr" },
];

export function MemberForm() {
  const [open, setOpen] = useState(false);

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      phone: "",
      email: "",
      teamLeader: "",
    },
  });

  function onSubmit(data: MemberFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col space-y-2 md:col-span-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="아이디 입력 (영문, 숫자 4~12자)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호 입력 (영문 대소문자, 숫자, 특수문자 8~20자)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호 재입력"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>전화번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder="010-0000-0000"
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
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="이메일 주소 입력"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>생년월일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ko })
                        ) : (
                          <span>생년월일 선택</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={ko}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>소속회사</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? companies.find(
                              (company) => company.value === field.value,
                            )?.label
                          : "회사 검색"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="회사명 검색..." />
                      <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                      <CommandGroup>
                        {companies.map((company) => (
                          <CommandItem
                            key={company.value}
                            value={company.value}
                            onSelect={(value) => {
                              form.setValue("company", value);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                company.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {company.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="부서 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem
                        key={department.value}
                        value={department.value}
                      >
                        {department.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teamLeader"
            render={({ field }) => (
              <FormItem>
                <FormLabel>팀장</FormLabel>
                <FormControl>
                  <Input placeholder="팀장 이름 입력" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          생성
        </Button>
      </form>
    </Form>
  );
}
