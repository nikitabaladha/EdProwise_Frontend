import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../../CityData.json";

const UpdateSeller = ({ updateSeller }) => {
  return <div className="container">Hello From update seller page</div>;
};

export default UpdateSeller;
