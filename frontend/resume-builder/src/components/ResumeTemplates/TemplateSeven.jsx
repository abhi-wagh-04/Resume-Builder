import { useEffect, useRef, useState } from "react";

import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuRss,
  LuGithub,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import { formatYearMonth } from "../../utils/helper";
import LanguageSection from "../ResumeSections/LanguageSection";
import WorkExpierence from "../ResumeSections/WorkExpierence";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const Title = ({ text, color }) => {
  return (
    <div className="relative w-fit mb-2.5">
      <span
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: color }}
      ></span>
      <h2 className={`relative text-sm font-bold`}>{text}</h2>
    </div>
  );
};

function TemplateSeven({ resumeData, colorPalette, containerWidth }) {
  console.log(containerWidth);
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Calculate the scale factor based on the container width
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-4 bg-white text-[12px] leading-tight"
      style={{
        fontFamily: `"Georgia", serif`,
        fontFeatureSettings: `"lnum", "tnum"`,
        transform: containerWidth > 0 ? `scale(1)` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      <div className="px-6 pt-6 pb-3">
        <div className="flex justify-between text-[11px] flex-wrap">
          {/* Left section */}
          <div className="text-left">
            <h2 className="text-lg font-bold">
              {resumeData.profileInfo.fullName}
            </h2>

            {resumeData.contactInfo.github && (
              <div>
                <span className="font-semibold">GitHub: </span>
                <a
                  href={resumeData.contactInfo.github}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {resumeData.contactInfo.github}
                </a>
              </div>
            )}

            {resumeData.contactInfo.linkedin && (
              <div>
                <span className="font-semibold">LinkedIn: </span>
                {resumeData.contactInfo.linkedin}
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="text-right">
            <div>
              <span className="font-semibold">Email: </span>
              {resumeData.contactInfo.email}
            </div>
            <div>
              <span className="font-semibold">Phone: </span>
              {resumeData.contactInfo.phone}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="px-6 pb-3">
        <p className="text-[12px]">{resumeData.profileInfo.summary}</p>
      </div> */}

      {/* EDUCATION */}
      {resumeData.educaton.length > 0 && (
        <div className="px-6 pb-3">
          <h2 className="text-[15px] font-bold text-gray-800 mb-1">
            Education
          </h2>
          <hr className="border-t-2 border-gray-400 mb-2" />
          {resumeData.educaton.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800 inline">
                    {edu.institution},{" "}
                  </p>
                  <p className="font-medium text-gray-700 inline">
                    {edu.degree}
                  </p>
                </div>
                <p className="text-[11px] text-gray-600 text-right">
                  {new Date(edu.startDate).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(edu.endDate).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="text-[12px] text-gray-700">{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
      {resumeData.skills.length > 0 && (
        <div className="px-6 pb-3">
          <span className="text-[15px] font-bold text-gray-800">Skills</span>
          <hr className="border-t-2 border-gray-400 mb-2 w-full" />
          <span className="text-[12px] block">
            {resumeData.skills.map((skill) => skill.name).join(", ")}
          </span>
        </div>
      )}

      {/* EXPERIENCE */}
      {resumeData.workExperience.some(
        (exp) =>
          exp.company.trim() !== "" ||
          exp.role.trim() !== "" ||
          exp.startDate.trim() !== "" ||
          exp.endDate.trim() !== "" ||
          exp.description.trim() !== ""
      ) && (
        <div className="px-6 pb-3">
          <h2 className="text-[15px] font-bold text-gray-800 mb-1">
            Work Experience
          </h2>
          <hr className="border-t-2 border-gray-400 mb-2" />
          {resumeData.workExperience
            .filter(
              (exp) =>
                exp.company.trim() !== "" ||
                exp.role.trim() !== "" ||
                exp.startDate.trim() !== "" ||
                exp.endDate.trim() !== "" ||
                exp.description.trim() !== ""
            )
            .map((exp, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <p className="font-bold text-gray-800">
                    {exp.company},{" "}
                    <span className="font-normal italic">{exp.role}</span>
                  </p>
                  <p className="text-[11px] text-gray-600">
                    {new Date(exp.startDate).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(exp.endDate).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <ul className="list-disc pl-4 text-[12px] mt-1 space-y-0.5 leading-snug">
                  {exp.description
                    .split(".")
                    .map((point) => point.trim())
                    .filter((point) => point.length > 0)
                    .map((point, i) => (
                      <li key={i}>{point}.</li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      )}

      {/* PROJECTS */}
      {resumeData.projects.length > 0 && (
        <div className="px-6 pb-3">
          <h2 className="text-[15px] font-bold text-gray-800 mb-1">Projects</h2>
          <hr className="border-t-2 border-gray-400 mb-2" />
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800 text-[13px]">
                  {project.title}
                </p>
                <div className="flex gap-2 text-[11px]">
                  {project.github && (
                    <a
                      href={project.github}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
              <ul className="list-disc pl-4 text-[12px] mt-1 space-y-0.5 leading-snug">
                {project.description
                  .split(".")
                  .map((point, i) => point.trim())
                  .filter((point) => point.length > 0)
                  .map((point, i) => (
                    <li key={i}>{point}.</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {resumeData.certifications.some(
        (cert) =>
          cert.title.trim() !== "" ||
          cert.issuer.trim() !== "" ||
          cert.year.trim() !== ""
      ) && (
        <div className="px-6 pb-3">
          <h2 className="text-[15px] font-bold text-gray-800 mb-1">
            Certifications
          </h2>
          <hr className="border-t-2 border-gray-400 mb-2" />
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="flex justify-between text-[12px] mb-1">
              <span>{cert.title}</span>
              <span className="text-right">
                {cert.issuer}, {cert.year}
              </span>
            </div>
          ))}
        </div>
      )}

      {resumeData.languages.some((lang) => lang.name !== "") && (
        <div className="px-6 pb-3">
          <span className="text-[15px] font-bold text-gray-800">
            Languages:
          </span>
          <hr className="border-t-2 border-gray-400 mb-2 w-full" />
          <span className="text-[12px] block">
            {resumeData.languages.map((lang) => lang.name).join(", ")}
          </span>
        </div>
      )}

      {resumeData.interests.some((interest) => interest.trim() !== "") && (
        <div className="px-6 pb-3">
          <span className="text-[15px] font-bold text-gray-800">
            Interests:
          </span>
          <hr className="border-t-2 border-gray-400 mb-2 w-full" />
          <span className="text-[12px] block">
            {resumeData.interests
              .filter((interest) => interest.trim() !== "")
              .join(", ")}
          </span>
        </div>
      )}
    </div>
  );
}

export default TemplateSeven;
