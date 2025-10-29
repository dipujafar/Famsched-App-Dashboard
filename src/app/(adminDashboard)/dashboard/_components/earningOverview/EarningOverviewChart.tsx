"use client";
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
import { useState } from "react";

const data = [
  { name: "Jan", user: 100, diff: 320 - 100 },
  { name: "Feb", user: 310, diff: 320 - 310 },
  { name: "Mar", user: 150, diff: 320 - 150 },
  { name: "Apr", user: 150, diff: 320 - 150 },
  { name: "May", user: 180, diff: 320 - 180 },
  { name: "Jun", user: 200, diff: 320 - 200 },
  { name: "Jul", user: 320, diff: 320 - 320 },
  { name: "Aug", user: 230, diff: 320 - 230 },
  { name: "Sep", user: 250, diff: 320 - 250 },
  { name: "Oct", user: 180, diff: 320 - 180 },
  { name: "Nov", user: 300, diff: 320 - 300 },
  { name: "Dec", user: 150, diff: 320 - 150 },
];

const EarningOverviewChart = () => {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );

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

  return (
    <div className="    w-full py-7 px-2 bg-[#fff] border-none rounded-2xl ">
      <div className="flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-3 gap-2 px-5">
        <h1 className="text-xl text-[#010101]">Earning Overview</h1>
        <p>Monthly Growth: 35.80%</p>
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

      {/* <div className=" flex gap-x-3 justify-center items-center">
        <div className="flex gap-x-1">
          <p className="bg-[#8243EE] p-2 rounded-full w-fit"></p>
          <p className="text-[11px]">User</p>
        </div>
        <div className="flex gap-x-1">
          <p className="bg-[#D8C5FA] p-2 rounded-full w-fit"></p>
          <p className="text-[11px]">Vendors</p>
        </div>
      </div> */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={data}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3C353B" />
              <stop offset="100%" stopColor="#785E57" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={customTooltip} />
          {/* <Legend /> */}

          <Bar
            dataKey="user"
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
