import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { IoTicketSharp } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsCalendarEvent } from "react-icons/bs";

function Home() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className="main-container">
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total Tickets Sold</h3>
            <IoTicketSharp className="card_icon" />
          </div>
          <h1>12,543</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Events</h3>
            <BsCalendarEvent className="card_icon" />
          </div>
          <h1>23</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Audiences</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>12,543</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Earnings</h3>
            <FaMoneyBillTrendUp className="card_icon" />
          </div>
          <h1>₱ 125,000</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <h2>Sales Report</h2>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#9966CC" />
            <Bar dataKey="uv" fill="#000000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <h2>Audience Reports</h2>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#9966CC"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#000000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
