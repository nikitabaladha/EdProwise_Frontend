

import React, { useEffect, useState } from "react";
import getAPI from "../../../api/getAPI";
import { IoLogOutOutline } from "react-icons/io5";
import { useLogout } from "../../../useLogout";

const SchoolHeader = () => {
    const [school, setSchool] = useState(null);
    const logout = useLogout();


    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId?.toUpperCase();

    const fetchSchool = async () => {
        try {
            if (!schoolId) return;

            const response = await getAPI(`/school-profile/${schoolId}`, {}, true);
            if (!response.hasError && response.data?.data) {
                setSchool(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching school:", error);
        }
    };

    useEffect(() => {
        fetchSchool();
    }, []);

    if (!school) return null;


    const styles = {
        header: {
            width: "100%",
            backgroundColor: "#1a1729",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        },
        left: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
        },
        logo: {
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "2px solid #ffc801",
        },
        name: {
            color: "white",
            fontSize: "1.2rem",
            margin: 0,
            fontWeight: "600",
        },
        logoutBtn: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#24253b",
            padding: "10px 16px",
            borderRadius: "8px",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            border: "1px solid #34354a",
            transition: "0.3s",
        },
    };

    return (
        <div style={styles.header}>
            <div style={styles.left}>
                <img
                    src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`}
                    alt="School Logo"
                    style={styles.logo}
                />
                <h3 style={styles.name}>{school.schoolName}</h3>
            </div>

              <div
                style={styles.logoutBtn}
                onClick={logout}
            >
                <IoLogOutOutline size={20} />
              
            </div>
        </div>
    );
};

export default SchoolHeader;

