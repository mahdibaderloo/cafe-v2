import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useChartData } from "../../../hooks/dashboard/useChartData";
import { getCurrentJalaliYear } from "../../../utils/date";

export default function MonthlySalesChart() {
  const { data, isLoading } = useChartData(getCurrentJalaliYear());

  if (isLoading) return <p>Loading...</p>;

  return (
    <div
      className="lg:w-[95%] lg:h-80 xl:w-[85%] xl:h-100 2xl:w-220 2xl:h-120 bg-[#748F80] rounded-xl mx-auto mt-4 xl:mt-8 2xl:mt-12 shadow-md p-4 xl:p-5"
      dir="rtl"
    >
      <div className="w-full h-full bg-white rounded-xl p-4 xl:p-5">
        <h3 className="text-center text-[#485158] text-sm xl:text-base 2xl:text-lg font-medium mb-2">
          نمودار فروش
        </h3>

        <div className="w-full h-[calc(100%-2rem)]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                stroke="#E5E5E5"
              />

              <XAxis
                dataKey="monthName"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#485158",
                  fontSize: 12,
                  fontFamily: "Rubik",
                }}
                interval={0}
                textAnchor="middle"
                height={50}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: 10,
                  fontFamily: "Rubik",
                  fontWeight: "medium",
                }}
              />

              <Tooltip
                cursor={{ fill: "rgba(116, 143, 128, 0.08)" }}
                contentStyle={{
                  backgroundColor: "#485158",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                  fontFamily: "Rubik",
                }}
                labelStyle={{
                  color: "#fff",
                }}
                itemStyle={{
                  color: "#fff",
                }}
                formatter={(value) => `${Number(value).toLocaleString()}`}
              />

              <Bar
                dataKey="sales"
                fill="#6FAF45"
                radius={[4, 4, 0, 0]}
                barSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
