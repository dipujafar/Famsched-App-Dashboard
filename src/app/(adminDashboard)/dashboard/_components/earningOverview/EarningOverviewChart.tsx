"use client";;
import { Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EarningOverviewChartSkeleton from "../skeletons/EarningOverviewChartSkeleton";

const EarningOverviewChart = ({ loading, data, selectedYear, setSelectedYear }: any) => {


  const yearsOption = Array(5)
    .fill(0)
    .map((_, index) => new Date().getFullYear() - index);

  const handleChange = (value: string) => {
    setSelectedYear(value);
  };

  const customTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#fff] p-3 rounded-lg shadow-md">
          <p className="label">{`$${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };


  if (loading) return <EarningOverviewChartSkeleton />

  return (
    <div className="    w-full py-7 px-2 bg-[#fff] border-none rounded-2xl ">
      <div className="flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-3 gap-2 px-5">
        <h1 className="text-xl text-[#010101]">Earning Overview</h1>
        <Select
          value={selectedYear}
          style={{ width: 120 }}
          onChange={handleChange}
          options={yearsOption.map((year) => ({
            value: year.toString(),
            label: year.toString(),
          }))}
          
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={data}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3C353B" />
              <stop offset="100%" stopColor="#785E57" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={customTooltip} />
          {/* <Legend /> */}

          <Bar
            dataKey="income"
            stackId="a"
            fill="url(#barGradient)"
            barSize={20}
            radius={[10, 10, 0, 0]}
          />
          {/* <Bar dataKey="diff" stackId="a" fill="#F5E7E9" barSize={50} /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningOverviewChart;
