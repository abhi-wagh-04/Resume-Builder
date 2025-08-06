import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from "../../components/StepProgress";
import ProfileInfoCard from "../../components/cards/ProfileInfoCard";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import SkillsInfoForm from "./Forms/SkillsInfoForm";
import ProjectsDetailsForm from "./Forms/ProjectsDetailsForm";
import CertificationInfoForm from "./Forms/CertificationInfoForm";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import {
  captureElementAsImage,
  dataUrltoFile,
  fixTailwindColors,
} from "../../utils/helper";
import ThemeSelector from "./ThemeSelector";
import Modal from "../../components/Modal";
import PublicationDetailsForm from "./Forms/PublicationDetailsForm";

function EditResume() {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    educaton: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    publications: [
      {
        title: "",
        conference: "",
        year: "",
        description: "", // Optional: Short summary of the work
        link: "", // Optional: DOI, URL, arXiv link, etc.
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interests: [""],
  });

  // Validate Inputs
  const validateAndNext = (e) => {
    const errors = [];

    switch (currentPage) {
      case "profile-info":
        const { fullName, designation } = resumeData.profileInfo;
        if (!fullName.trim()) errors.push("Full Name is required");
        if (!designation.trim()) errors.push("Designation is required");
        break;

      case "contact-info":
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
          errors.push("Valid email is required");
        if (!phone.trim())
          errors.push("Valid 10-digit phone number is required");
        break;

      // case "work-experience":
      //   resumeData.workExperience.forEach(
      //     ({ company, role, startDate, endDate }, index) => {
      //       // if (!company.trim())
      //       //   errors.push(`Company is required in experience ${index + 1}`);
      //       if (!company.trim() && !role.trim())
      //         errors.push(`Role is required in experience ${index + 1} `);
      //       if (!company.trim() && (!startDate || !endDate))
      //         errors.push(
      //           `Start and End dates are required in experience ${index + 1}`
      //         );
      //     }
      //   );
      //   break;

      case "education-info":
        resumeData.educaton.forEach(
          ({ degree, institution, startDate, endDate }, index) => {
            if (!degree.trim())
              errors.push(`Degree is required in education ${index + 1}`);
            if (!institution.trim())
              errors.push(`Institution is required in education ${index + 1}`);
            if (!startDate || !endDate)
              errors.push(
                `Start and End dates are  required in education ${index + 1}`
              );
          }
        );
        break;

      // case "additionalInfo":
      // if (
      //   resumeData.languages.length === 0 ||
      //   !resumeData.languages[0].name?.trim()
      // ) {
      //   errors.push("At least one language is required");
      // }
      // if (
      //   resumeData.interests.length === 0 ||
      //   !resumeData.interests[0].trim()
      // ) {
      //   errors.push("At least one interest is required");
      // }
      // break;
      case "additionalInfo":
      case "publications":
      case "skills":
      case "work-experience":
      case "projects":
      case "certifications":
        break;

      default:
        return;
    }
    if (errors.length > 0) {
      console.log(errors);
      setErrorMsg(errors.join(","));
      return;
    }

    // Move to next step
    setErrorMsg("");
    goToNextStep();
  };

  // Function to navigate to next page
  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "publications",
      "certifications",
      "additionalInfo",
    ];
    if (currentPage === "additionalInfo") setOpenPreviewModal(true);
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);

      // Set Progress as percentage
      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Function to navigate to previous page
  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "additionalInfo") navigate("/dashboard");
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);

      // Set Progress as percentage
      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) =>
              updateSection("contactInfo", key, value)
            }
          />
        );

      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("workExperience", index)
            }
          />
        );

      case "education-info":
        return (
          <EducationDetailsForm
            educatonInfo={resumeData?.educaton}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("educaton", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("educaton", newItem)}
            removeArrayItem={(index) => removeArrayItem("educaton", index)}
          />
        );

      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        );

      case "projects":
        return (
          <ProjectsDetailsForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("projects", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />
        );

      case "publications":
        return (
          <PublicationDetailsForm
            publicationInfo={resumeData?.publications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("publications", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("publications", newItem)}
            removeArrayItem={(index) => removeArrayItem("publications", index)}
          />
        );

      case "certifications":
        return (
          <CertificationInfoForm
            certifications={resumeData?.certifications}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("certifications", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("certifications", index)
            }
          />
        );

      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData?.languages}
            interests={resumeData?.interests}
            updateArrayItem={(section, index, key, value) => {
              updateArrayItem(section, index, key, value);
            }}
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) =>
              removeArrayItem(section, index)
            }
          />
        );

      default:
        return null;
    }
  };

  // Update Simple nested object (like profileInfo, contactInfo, etc.)
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Update Array Items (like workExperience, skills)
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];

      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        };
      }

      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // Add item to Array
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  // Remove Item from Array
  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // Fetch resume info by ID
  const fetchResumeDetailsById = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
      if (res.data.resume && res.data.resume.profileInfo) {
        const resumeInfo = res.data.resume;

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          educaton: resumeInfo?.educaton || prevState?.educaton,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          publications: resumeInfo?.publications || prevState?.publications,
          certifications:
            resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (err) {
      console.error("Error fetching resume", err);
    }
  };

  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);

      // Log the reference DOM element
      console.log("🔍 resumeRef.current:", resumeRef.current);

      // 1. Fix Tailwind oklch color issues
      console.log("🎨 Fixing Tailwind colors...");
      fixTailwindColors(resumeRef.current);

      // 2. Capture the resume as a base64 image
      console.log("📸 Capturing resume preview as image...");
      const imageUrl = await captureElementAsImage(resumeRef.current);

      if (!imageUrl || !imageUrl.startsWith("data:image")) {
        throw new Error("❌ Image capture failed. Base64 string is invalid.");
      }

      // 3. Convert the image to a File object
      console.log("📦 Converting base64 to File...");
      const thumbnailFile = dataUrltoFile(imageUrl, `resume-${resumeId}.png`);

      // Log file info
      console.log("📝 Thumbnail File:", {
        name: thumbnailFile.name,
        size: thumbnailFile.size,
        type: thumbnailFile.type,
      });

      // 4. Prepare profile image and form data
      const profileImageFile = resumeData?.profileInfo?.profileImg || null;

      const formData = new FormData();
      if (profileImageFile) formData.append("profileImage", profileImageFile);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      // Log form data contents
      console.log("📤 FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(` - ${key}:`, value);
      }

      // 5. Upload images to server
      console.log("🚀 Uploading thumbnail and profile image to server...");
      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;
      console.log("✅ Upload successful. Server returned:");
      console.log(" - Thumbnail Link:", thumbnailLink);
      console.log(" - Profile Preview URL:", profilePreviewUrl);

      // 6. Update resume details with links
      await updateResumeDetails(thumbnailLink, profilePreviewUrl);

      // 7. Success UI
      toast.success("Resume Updated Successfully!!!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Error uploading image:", err);
      toast.error("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
      setIsLoading(true);

      const updatedData = {
        ...resumeData,
        thumbnailLink: thumbnailLink || "",
        profileInfo: {
          ...resumeData.profileInfo,
          profilePreviewUrl: profilePreviewUrl || "",
        },
      };

      // Log final payload being sent
      console.log("📦 Sending updated resume data to backend:");
      console.log(JSON.stringify(updatedData, null, 2));

      await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), updatedData);

      console.log("✅ Resume data updated successfully.");
    } catch (err) {
      console.error("❌ Error updating resume details:", err);
      toast.error("Failed to update resume data");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Resume
  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success("Resume Deleted Successfully!!!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error deleting resume details:", error);
      toast.error("Failed to delete resume data");
    } finally {
      setIsLoading(false);
    }
  };

  //Download Resume
  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  // Function to update basewidth based on the resume container size
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg bord border-purple-100 py-3 px-4 mb-4">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({ ...prevState, title: value }))
            }
          />
          <div className="flex items-center gap-4">
            <button
              className="btn-small-light"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className="text-[16px]" />
              <span className="hidden md:block">Change Theme</span>
            </button>
            <button className="btn-small-light" onClick={handleDeleteResume}>
              <LuTrash2 className="text-[16px]" />
              <span className="hidden md:block">Delete</span>
            </button>
            <button
              className="btn-small-light"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-[16px]" />
              <span className="hidden md:block">Preview & Download</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
            <StepProgress progress={progress} />
            {renderForm()}
            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5  my-1 rounded">
                  <LuCircleAlert className="text-md" /> {errorMsg}
                </div>
              )}
              <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                <button
                  className="btn-small-light"
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft className="text-[16px]" /> Back
                </button>
                <button
                  className="btn-small-light"
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className="text-[16px]" />
                  {isLoading ? "Updating" : "Save & Exit"}
                </button>
                <button
                  className="btn-small"
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === "additionalInfo" && (
                    <LuDownload className="text-[16px]" />
                  )}
                  {currentPage === "additionalInfo"
                    ? "Preview & Download"
                    : "Next"}
                  {currentPage !== "additionalInfo" && (
                    <LuArrowLeft className="text-[16px] rotate-180" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div ref={resumeRef} className="h-[100vh]">
            {/** Resume Template */}
            <RenderResume
              templateId={resumeData?.template?.theme || ""}
              resumeData={resumeData}
              colorPalette={resumeData?.template?.colorPalette || {}}
              containerWidth={baseWidth}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="Change Theme"
      >
        <div className="w-[90vw] h-[80vh]">
          <ThemeSelector
            selectedTheme={resumeData?.template}
            setSelectedTheme={(value) => {
              setResumeData((prevState) => ({
                ...prevState,
                template: value || prevState.template,
              }));
            }}
            resumeData={null}
            onClose={() => setOpenThemeSelector(false)}
          />
        </div>
      </Modal>
      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText="Download"
        actionBtnIcon={<LuDownload className="" />}
        onActionClick={() => reactToPrintFn()}
      >
        <div ref={resumeDownloadRef} className="w-[98vw] h-[96vh]">
          <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default EditResume;
