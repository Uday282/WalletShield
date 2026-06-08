"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
};

export default function SecurityScoreChart({
  data,
}: Props) {

  return (

   <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5">
      
      <h2 className="text-2xl font-bold">
        Wallet Security Score History
      </h2>

      <div className="h-56">

        <ResponsiveContainer
          width="100%"
          height={160}
        >

          <LineChart

  data={data}

  margin={{
    top: 10,
    right: 10,
    left: -20,
    bottom: 0,
  }}

>

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}