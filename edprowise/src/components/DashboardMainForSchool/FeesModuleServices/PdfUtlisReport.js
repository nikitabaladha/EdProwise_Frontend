import getAPI from "../../../api/getAPI";

export const fetchSchoolData = async (schoolId) => {
  let school = null;
  let logoSrc = '';
  try {
    const response = await getAPI(`/school-profile/${schoolId}`, {}, true);
    if (!response.hasError && response.data && response.data.data) {
      school = response.data.data;
      if (school.profileImage) {
        const logoUrl = `${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`;
        logoSrc = await getImageDataUrl(logoUrl);
        if (!logoSrc) {
          console.error("Logo fetch returned empty data URL");
        }
      } else {
        console.warn("No profileImage found in school data");
      }
    } else {
      console.error("Invalid response format or error in response:", response.message);
    }
  } catch (err) {
    console.error("Error fetching School data:", err);
  }
  return { school, logoSrc };
};

const getImageDataUrl = async (url) => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to fetch image:', error);
    return '';
  }
};

export const generateHeader = (school, logoSrc) => `
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; width: 100%;">
    <div style="flex: 0 0 auto; width: 20mm; text-align: left;">
      ${logoSrc ? `<img src="${logoSrc}" style="width: 20mm; height: 20mm; object-fit: contain;" crossOrigin="anonymous" />` : '<div style="width: 40mm; height: 40mm; background: rgb(255, 255, 255); display: flex; align-items: center; justify-content: center; color: rgb(0, 0, 0);">No Logo</div>'}
    </div>
    <div style="flex: 1; text-align: center;">
      <h2 style="color: rgb(0, 0, 0); margin-bottom: 0.25rem; font-size: 30px;">${school?.schoolName || ""}</h2>
      <p style="color: rgb(0, 0, 0); margin-bottom: 0.25rem; font-size: 15px;">${school?.schoolAddress || ""}</p>
      <p style="color: rgb(0, 0, 0); margin-bottom: 0.25rem; font-size: 15px;">Phone: ${school?.schoolMobileNo || ""} | Email: ${school?.schoolEmail || ""}</p>
    </div>
  </div>
  <div style="border-top: 2px solid #0d6efd; width: 100%; margin-bottom: 1rem;"></div>
`;

export const generateFooter = (school) => `

  <div style="position: absolute; left: 0; right: 0; text-align: center;">
    <div style="border-top: 2px solid #0d6efd; "></div>
    <p style="font-size: 0.8rem; color: rgb(0, 0, 0); margin: 0.25rem 20mm; padding: 0;">
      This is a computer-generated receipt and does not require a physical signature.
    </p>
    <p style="font-size: 0.8rem; color: rgb(0, 0, 0); margin: 0.25rem 20mm; padding: 0;">
      For any queries, please contact ${school?.schoolEmail || ""} or call ${school?.schoolMobileNo || ""}
    </p>
  </div>
`;