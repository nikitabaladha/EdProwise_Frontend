

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import postAPI from "../../../api/postAPI.js";
// import getAPI from "../../../api/getAPI.js";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Signup = () => {
//   const navigate = useNavigate();
//   const { schoolId } = useParams();
//   const [school, setSchool] = useState(null);
//   const [academicYears, setAcademicYears] = useState([]);
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [selectedYear, setSelectedYear] = useState(""); 

//   const [formData, setFormData] = useState({
//     academicYear: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     conformPassword: "",
//   });

//   const [generalError, setGeneralError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConformPassword, setShowConformPassword] = useState(false);

//   const formattedSchoolId = schoolId?.toUpperCase();


//   const fetchSchoolData = async () => {
//     try {
//       const response = await getAPI(`/school-profile/${formattedSchoolId}`, {}, true);
//       if (!response.hasError && response.data?.data) {
//         setSchool(response.data.data);
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching school:", err);
//     }
//   };


//   useEffect(() => {
//     if (!schoolId) return;

//     const fetchAcademicYears = async () => {
//       try {
//         setLoadingYears(true);
//         const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
//         if (!response.hasError) {
//           const years = Array.isArray(response.data.data)
//             ? response.data.data
//             : [];

//           setAcademicYears(years);

      
//           const activeYear = years.find((y) => y.registrationLink === true);

//           if (activeYear) {
//             setSelectedYear(activeYear.academicYear);
//             setFormData((prev) => ({
//               ...prev,
//               academicYear: activeYear.academicYear,
//             }));
//           } else {
//             toast.error("No active academic year for registration found.");
//           }
//         } else {
//           toast.error(response.message || "Failed to fetch academic years.");
//           setAcademicYears([]);
//         }
//       } catch (err) {
//         console.error("Error fetching academic years:", err);
//         toast.error("Error fetching academic years.");
//         setAcademicYears([]);
//       } finally {
//         setLoadingYears(false);
//       }
//     };

//     fetchAcademicYears();
//     fetchSchoolData();
//   }, [schoolId]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setGeneralError("");
//   };


//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.conformPassword) {
//       toast.error("Password and Confirm Password do not match.");
//       return;
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(formData.phone)) {
//       toast.error("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     try {
//       const response = await postAPI(
//         "/student-signup",
//         {
//           schoolId: formattedSchoolId,
//           academicYear: formData.academicYear, 
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//         },
//         false
//       );

//       if (!response.hasError) {
//         toast.success("Signup successful!");
//         setTimeout(() => navigate("/student-login"), 2000);
//         setFormData({
//           academicYear: selectedYear,
//           firstName: "",
//           lastName: "",
//           email: "",
//           phone: "",
//           password: "",
//           conformPassword: "",
//         });
//       } else {
//         setGeneralError(response.message || "Signup failed.");
//       }
//     } catch (error) {
//       setGeneralError(
//         error?.response?.data?.message ||
//           "An unexpected signup error occurred. Please try again."
//       );
//     }
//   };

//   return (
    
//     <div className="form-body form-left">
//       {school && (
//   <div
//     className="d-flex align-items-center justify-content-start mt-2 mb-4 px-3"
//     style={{
//       gap: "12px",
//       flexWrap: "wrap",
//     }}
//   >
//     <img
//       src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`}
//       alt="School Logo"
//       className="img-fluid"
//       style={{
//         width: "60px",
//         height: "60px",
//         borderRadius: "50%",
//         objectFit: "cover",
//         border: "2px solid #ffc801",
//       }}
//     />
//     <h3
//       className="fw-bold m-0"
//       style={{
//         color: "#333",
//         fontSize: "1.4rem",
//         whiteSpace: "nowrap",
//       }}
//     >
//       {school.schoolName}
//     </h3>
//   </div>
// )}

//       <div className="iofrm-layout">
//         <div className="img-holder text-start">
//           <div className="bg" />
//           <div className="info-holder">
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/images/graphic15.svg`}
//               alt=""
//             />
//           </div>
//         </div>

//         <div
//           className="form-holder"
//           style={{
//             height: "100vh",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div className="form-content justify-content-end">
//             <div className="form-items">

             

//               <div className="website-logoo-inside logo-normal mb-2">
//                 <img
//                   className="logos"
//                   src="/assets/website-images/EdProwise New Logo-1.png"
//                   alt="logo"
//                   style={{ height: "50px" }}
//                 />
//               </div>

//               <h3 className="font-md">Whatever School Need, We Provide</h3>
//               <p>We Listen...We Resolve...We Deliver</p>

//               {/* Signup Form */}
//               <form onSubmit={handleSignup}>
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="First Name"
//                   required
//                 />
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   placeholder="Last Name"
//                   required
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="form-control"
//                   placeholder="Enter email address"
//                   onKeyDown={(e) => e.key === " " && e.preventDefault()}
//                 />
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="form-control"
//                   placeholder="Phone Number"
//                   maxLength="10"
//                   onKeyDown={(e) => {
//                     if (
//                       !/[0-9]/.test(e.key) &&
//                       e.key !== "Backspace" &&
//                       e.key !== "Tab"
//                     ) {
//                       e.preventDefault();
//                     }
//                     if (e.key === " ") e.preventDefault();
//                   }}
//                 />

//                 {/* Password Fields */}
//                 <div style={{ position: "relative", width: "100%" }}>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="form-control pe-5"
//                     placeholder="Enter password"
//                   />
//                   {showPassword ? (
//                     <FaEye
//                       onClick={() => setShowPassword(false)}
//                       style={{
//                         position: "absolute",
//                         right: "10px",
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         cursor: "pointer",
//                         fontSize: "1.2rem",
//                       }}
//                     />
//                   ) : (
//                     <FaEyeSlash
//                       onClick={() => setShowPassword(true)}
//                       style={{
//                         position: "absolute",
//                         right: "10px",
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         cursor: "pointer",
//                         fontSize: "1.2rem",
//                       }}
//                     />
//                   )}
//                 </div>

//                 <div style={{ position: "relative", width: "100%" }}>
//                   <input
//                     type={showConformPassword ? "text" : "password"}
//                     name="conformPassword"
//                     value={formData.conformPassword}
//                     onChange={handleChange}
//                     required
//                     className="form-control pe-5"
//                     placeholder="Confirm password"
//                   />
//                   {showConformPassword ? (
//                     <FaEye
//                       onClick={() => setShowConformPassword(false)}
//                       style={{
//                         position: "absolute",
//                         right: "10px",
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         cursor: "pointer",
//                         fontSize: "1.2rem",
//                       }}
//                     />
//                   ) : (
//                     <FaEyeSlash
//                       onClick={() => setShowConformPassword(true)}
//                       style={{
//                         position: "absolute",
//                         right: "10px",
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         cursor: "pointer",
//                         fontSize: "1.2rem",
//                       }}
//                     />
//                   )}
//                 </div>

//                 {generalError && (
//                   <div className="alert alert-danger mt-3">{generalError}</div>
//                 )}

//                 <div className="form-button d-flex">
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: "#ffc801",
//                       borderColor: "#ffc801",
//                     }}
//                   >
//                     Sign Up
//                   </button>
//                 </div>

//                 <div className="mt-3 text-center">
//                   <Link onClick={() => navigate("/student-login")}>
//                     If Already Registered, Sign In Here
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import postAPI from "../../../api/postAPI.js";
import getAPI from "../../../api/getAPI.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const [school, setSchool] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [loadingYears, setLoadingYears] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");

  const [formData, setFormData] = useState({
    academicYear: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    conformPassword: "",
  });

  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);

  const formattedSchoolId = schoolId?.toUpperCase();


  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(`/school-profile/${formattedSchoolId}`, {}, true);
      if (!response.hasError && response.data?.data) {
        setSchool(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching school:", err);
    }
  };

  useEffect(() => {
    if (!schoolId) return;

    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const response = await getAPI(`/get-feesmanagment-year/${formattedSchoolId}`);
        if (!response.hasError) {
          const years = Array.isArray(response.data.data)
            ? response.data.data
            : [];

          setAcademicYears(years);


          const activeYear = years.find((y) => y.registrationLink === true);

          if (activeYear) {
            setSelectedYear(activeYear.academicYear);
            setFormData((prev) => ({
              ...prev,
              academicYear: activeYear.academicYear,
            }));
          } else {

            navigate(`/registration-closed/${schoolId}`, { replace: true });
          }
        } else {
          toast.error(response.message || "Failed to fetch academic years.");
          setAcademicYears([]);
          navigate(`/registration-closed/${schoolId}`, { replace: true });
        }
      } catch (err) {
        console.error("Error fetching academic years:", err);
        toast.error("Error fetching academic years.");
        navigate(`/registration-closed/${schoolId}`, { replace: true });
      } finally {
        setLoadingYears(false);
      }
    };

    fetchAcademicYears();
    fetchSchoolData();
  }, [formattedSchoolId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setGeneralError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.conformPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await postAPI(
        "/student-signup",
        {
          schoolId: formattedSchoolId,
          academicYear: formData.academicYear,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        },
        false
      );

      if (!response.hasError) {
        toast.success("Signup successful!");
        setTimeout(() => navigate("/student-login"), 2000);
        setFormData({
          academicYear: selectedYear,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          conformPassword: "",
        });
      } else {
        setGeneralError(response.message || "Signup failed.");
      }
    } catch (error) {
      setGeneralError(
        error?.response?.data?.message ||
        "An unexpected signup error occurred. Please try again."
      );
    }
  };


  if (loadingYears) {
    return <div className="text-center mt-5">Checking registration status...</div>;
  }


  return (
    <div className="form-body form-left">

      <div className="iofrm-layout">
        <div className="img-holder text-start">
          <div className="bg" />
          <div className="info-holder">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/graphic15.svg`}
              alt=""
            />
          </div>
        </div>

        <div
          className="form-holder"
          style={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="form-content justify-content-end">
            <div className="form-items">
              <div className="website-logoo-inside logo-normal mb-2">
                {/* <img
                  className="logos"
                  src="/assets/website-images/EdProwise New Logo-1.png"
                  alt="logo"
                  style={{ height: "50px" }}
                /> */}

                  {school && (
        <div
          className="d-flex align-items-center justify-content-start mt-2 mb-4 px-3"
          style={{ gap: "12px", flexWrap: "wrap" }}
        >
          <img
            src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`}
            alt="School Logo"
            className="img-fluid"
            style={{
             width: "70px",
                height: "70px",
                borderRadius: "50%",
                objectFit: "cover",
              border: "2px solid #ffc801",
            }}
          />
          <h3 className="fw-bold m-0" style={{ color: "#333", fontSize: "1.2rem" }}>
            {school.schoolName}
          </h3>
        </div>
      )}
              </div>

              <h3 className="font-md">Whatever School Need, We Provide</h3>
              <p>We Listen...We Resolve...We Deliver</p>

              { }
              <form onSubmit={handleSignup}>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter email address"
                  onKeyDown={(e) => e.key === " " && e.preventDefault()}
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Phone Number"
                  maxLength="10"
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                      e.preventDefault();
                    }
                    if (e.key === " ") e.preventDefault();
                  }}
                />

                { }
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-control pe-5"
                    placeholder="Enter password"
                  />
                  {showPassword ? (
                    <FaEye
                      onClick={() => setShowPassword(false)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setShowPassword(true)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                    />
                  )}
                </div>

                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    type={showConformPassword ? "text" : "password"}
                    name="conformPassword"
                    value={formData.conformPassword}
                    onChange={handleChange}
                    required
                    className="form-control pe-5"
                    placeholder="Confirm password"
                  />
                  {showConformPassword ? (
                    <FaEye
                      onClick={() => setShowConformPassword(false)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setShowConformPassword(true)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                    />
                  )}
                </div>

                {generalError && (
                  <div className="alert alert-danger mt-3">{generalError}</div>
                )}

                <div className="form-button d-flex">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#ffc801",
                      borderColor: "#ffc801",
                    }}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <Link onClick={() => navigate("/student-login")}>
                    If Already Registered, Sign In Here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
