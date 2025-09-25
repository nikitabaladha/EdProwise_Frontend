import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreatableSelect from "react-select/creatable";
import { FiDownload } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import CircularProgressCollection from './CircularProgressCollection';
import {
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PrincipalFeesCollectionReport = () => {
   const navigate = useNavigate();

const [selectedMonth, setSelectedMonth] = useState(null);

    const months = [
      { value: "01", label: "January" },
      { value: "02", label: "February" },
      { value: "03", label: "March" },
      { value: "04", label: "April" },
      { value: "05", label: "May" },
      { value: "06", label: "June" },
      { value: "07", label: "July" },
      { value: "08", label: "August" },
      { value: "09", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" },
    ];

    const data = [
      {
        name: "01 Aug",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "02 Aug",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "03 Aug",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "04 Aug",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "05 Aug",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "06 Aug",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "07 Aug",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: "08 Aug",
        uv: 3490,
        pv: 4500,
        amt: 2000,
      },
      {
        name: "09 Aug",
        uv: 3490,
        pv: 5700,
        amt: 1800,
      },
      {
        name: "10 Aug",
        uv: 3490,
        pv: 4200,
        amt: 2000,
      },
      {
        name: "11 Aug",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Fees Collection Chart
                  </h4>
                  <FaCalendarAlt className="me-2" />

                  <CreatableSelect
                    isClearable
                    options={months}
                    value={selectedMonth}
                    onChange={(newValue) => setSelectedMonth(newValue)}
                    placeholder="Select Month"
                    className="email-select form-select-sm me-2 w-auto"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-4 col-12">
                  <div
                    className="card overflow-hidden border border-dark"
                    style={{ height: "-webkit-fill-available" }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-lg-12 col-md-12 col-12 "
                          style={{ justifyItems: "center" }}
                        >
                          <p className="text-muted fw-semibold mb-1">
                            August Total Collected Amount
                          </p>
                          <h3 className="text-dark mt-1 mb-0">9,40,000</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-12">
                  <div
                    className="card overflow-hidden border border-dark"
                    style={{ height: "-webkit-fill-available" }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-8 col-md-7 col-12">
                          <p className="text-muted fw-semibold mb-1 ">
                            Progrss To Monthly Target
                          </p>
                          <div className="row ">
                            <div className="col-md-12 mb-3">
                              <div className="d-flex flex-wrap col-md-12 flex-grow-1 align-items-center gap-2 mb-1">
                                <div>Target :</div>
                                <div>10,00,000</div>
                              </div>
                              <div className="d-flex col-md-12 flex-grow-1 align-items-center gap-2">
                                <div>Progress :</div>
                                <div>94%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-5 col-12  text-end align-content-center">
                          <div className="d-flex align-items-center justify-content-center">
                            <CircularProgressCollection percentage={75} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row mt-3">
                <div className="col-lg-4 col-12">
                  <div
                    className="card overflow-hidden border border-dark"
                    style={{ height: "-webkit-fill-available" }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-lg-12 col-md-12 col-12 "
                          style={{ justifyItems: "center" }}
                        >
                          <p className="text-muted fw-semibold mb-1">
                            August Total Collected Amount
                          </p>
                          <h3 className="text-dark mt-1 mb-0">9,40,000</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div
                    className="card overflow-hidden border border-dark"
                    style={{ height: "-webkit-fill-available" }}
                  >
                    <div className="card-body">
                      <div className="row d-flex">
                        <div className="">
                          <p className="text-muted fw-semibold mb-1 ">
                            Progrss To Monthly Target
                          </p>
                          <div className="row ">
                            <div className="col-md-12 mb-3">
                              <div className="d-flex flex-wrap col-md-12 flex-grow-1 align-items-center gap-2 mb-1">
                                <div>Target :</div>
                                <div>10,00,000</div>
                              </div>
                              <div className="d-flex col-md-12 flex-grow-1 align-items-center gap-2">
                                <div>Progress :</div>
                                <div>94%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" align-content-center">
                          <div className="d-flex align-items-center justify-content-center">
                            <CircularProgressCollection percentage={75} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>  */}

              <ResponsiveContainer width="100%" height={500}>
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default PrincipalFeesCollectionReport