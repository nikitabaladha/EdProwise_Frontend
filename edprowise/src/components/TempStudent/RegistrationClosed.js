import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import getAPI from "../../api/getAPI"

export default function RegistrationClosed() {
  const { schoolId } = useParams()
  const navigate = useNavigate()
  const [school, setSchool] = useState(null)

  useEffect(() => {
    if (!schoolId) return
    const fetchSchool = async () => {
      try {
        const response = await getAPI(`/school-profile/${schoolId.toUpperCase()}`, {}, true)
        if (!response.hasError && response.data?.data) {
          setSchool(response.data.data)
        }
      } catch (err) {
        console.error("Error fetching school:", err)
      }
    }
    fetchSchool()
  }, [schoolId])

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
        padding: "16px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background circles */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 40,
          width: 288,
          height: 288,
          background: "rgba(59, 130, 246, 0.1)",
          borderRadius: "50%",
          filter: "blur(96px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 40,
          width: 288,
          height: 288,
          background: "rgba(168, 85, 247, 0.1)",
          borderRadius: "50%",
          filter: "blur(96px)",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "896px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* School logo + name */}
        {school && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            <img
              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`}
              alt="School Logo"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgb(96, 165, 250)",
              }}
            />
            <h2
              style={{
                color: "white",
                fontSize: "1.6rem",
                fontWeight: "700",
                margin: 0,
              }}
            >
              {school.schoolName}
            </h2>
          </div>
        )}

        {/* Heading and message */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
            }}
          >
            Registration
            <span
              style={{
                display: "block",
                background: "linear-gradient(to right, rgb(96, 165, 250), rgb(168, 85, 247))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Temporarily Closed
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgb(203, 213, 225)",
              lineHeight: 1.6,
              maxWidth: "640px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Student registration is not currently available. We'll be back soon with an enhanced registration
            experience.
          </p>
        </div>

        {/* Return button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
            marginTop: 32,
          }}
        >
          <button
            style={{
              padding: "12px 32px",
              fontSize: "1rem",
              fontWeight: 600,
              color: "white",
              border: "none",
              borderRadius: 8,
              background: "linear-gradient(to right, rgb(59, 130, 246), rgb(168, 85, 247))",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9"
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
            onClick={() => navigate(-1)}
          >
            Return To Home
          </button>
        </div>
      </div>
    </div>
  )
}
