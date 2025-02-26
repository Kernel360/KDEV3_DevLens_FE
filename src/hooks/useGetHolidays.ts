import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useScheduleStore } from "@/store/useScheduleStore";

interface HolidayResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: Array<{
          dateKind: string;
          dateName: string;
          isHoliday: string;
          locdate: number;
          seq: number;
        }>;
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export default function useGetHolidays(year: number, month?: number) {
  const setHolidays = useScheduleStore((state) => state.setHolidays);

  const { data, isLoading, error } = useQuery({
    queryKey: ["holidays", year, month],
    queryFn: async () => {
      // serviceKey는 별도로 인코딩하지 않고 원본 그대로 사용
      const serviceKey = process.env.NEXT_PUBLIC_HOLIDAY_API_KEY || "";

      // 나머지 파라미터들은 URLSearchParams로 처리
      const params = new URLSearchParams({
        _type: "json",
        numOfRows: "100",
        pageNo: "1",
        solYear: year.toString(),
        ...(month && { solMonth: month.toString().padStart(2, "0") }),
      });

      const response = await axios<HolidayResponse>({
        url: `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${serviceKey}&${params}`,
        method: "GET",
      });

      // 응답 데이터를 ScheduleItem 형식으로 변환
      const holidays = response.data.response.body.items.item;
      setHolidays(holidays); // 스토어에 공휴일 저장
      return holidays;
    },
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7일 동안 캐시 유지
  });

  return {
    holidays: data || [],
    isLoading,
    error,
  };
}
