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

function TemplateTwo({ resumeData, colorPalette, containerWidth }) {
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
      className="p-2 bg-white text-[11px] leading-tight"
      style={{
        transform: containerWidth > 0 ? `scale(1)` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      <div className="px-6 pt-6 pb-3 text-center">
        <h2 className="text-lg font-bold">{resumeData.profileInfo.fullName}</h2>
        <p className="text-sm font-semibold mb-2">
          {resumeData.profileInfo.designation}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[11px]">
          <ContactInfo
            icon={<LuMapPinHouse />}
            iconBG={themeColors[2]}
            value={resumeData.contactInfo.location}
          />
          <ContactInfo
            icon={<LuMail />}
            iconBG={themeColors[2]}
            value={resumeData.contactInfo.email}
          />
          <ContactInfo
            icon={<LuPhone />}
            iconBG={themeColors[2]}
            value={resumeData.contactInfo.phone}
          />
          {resumeData.contactInfo.linkedin && (
            <ContactInfo
              icon={<RiLinkedinLine />}
              iconBG={themeColors[2]}
              value={resumeData.contactInfo.linkedin}
            />
          )}
          {resumeData.contactInfo.website && (
            <ContactInfo
              icon={<LuRss />}
              iconBG={themeColors[2]}
              value={resumeData.contactInfo.website}
            />
          )}
        </div>
      </div>

      <div className="mx-6 pb-4">
        <div>
          <Title text="Professional Summary" color={themeColors[1]} />
          <p>{resumeData.profileInfo.summary}</p>
        </div>

        <div className="mt-3">
          <Title text="Work Experience" color={themeColors[1]} />
          {resumeData?.workExperience.map((data, i) => (
            <WorkExpierence
              key={i}
              company={data.company}
              role={data.role}
              duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(
                data.endDate
              )}`}
              durationColor={themeColors[4]}
              description={data.description}
            />
          ))}
        </div>

        <div className="mt-3">
          <Title text="Projects" color={themeColors[1]} />
          {resumeData.projects.map((project, i) => (
            <ProjectInfo
              key={i}
              title={project.title}
              description={project.description}
              githubLink={project.github}
              liveDemoUrl={project.liveDemo}
              bgColor={themeColors[2]}
            />
          ))}
        </div>

        <div className="mt-3">
          <Title text="Education" color={themeColors[1]} />
          <div className="flex flex-col gap-2 mt-2 text-[11px]">
            {resumeData.educaton.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div className="w-3/4">
                  <p className="font-semibold">{edu.degree}</p>
                  {edu.institution && (
                    <p className="text-[10px]">{edu.institution}</p>
                  )}
                </div>
                <div className="text-right text-[10px] whitespace-nowrap">
                  {formatYearMonth(edu.startDate)} -{" "}
                  {formatYearMonth(edu.endDate)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <Title text="Certifications" color={themeColors[1]} />
          <div className="grid grid-cols-2 gap-3">
            {resumeData.certifications.map((data, i) => (
              <CertificationInfo
                key={i}
                title={data.title}
                issuer={data.issuer}
                year={data.year}
                bgColor={themeColors[2]}
              />
            ))}
          </div>
        </div>

        <div className="mt-3">
          <Title text="Skills" color={themeColors[1]} />
          <div className="flex flex-wrap gap-2 mt-2 text-[11px]">
            {resumeData.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-200 px-2 py-1 rounded-md"
                style={{ backgroundColor: themeColors[2] }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <Title text="Languages" color={themeColors[1]} />
          <div className="flex flex-wrap gap-2 mt-2 text-[11px]">
            {resumeData.languages.map((lang, i) => (
              <span
                key={i}
                className="bg-gray-200 px-2 py-1 rounded-md"
                style={{ backgroundColor: themeColors[2] }}
              >
                {lang.name}
              </span>
            ))}
          </div>
        </div>

        {resumeData.interests.length > 0 && resumeData.interests[0] !== "" && (
          <div className="mt-3">
            <Title text="Interests" color={themeColors[1]} />
            <div className="flex flex-wrap gap-2 mt-2 text-[11px]">
              {resumeData.interests.map((interest, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-2 py-1 rounded-md"
                  style={{ backgroundColor: themeColors[2] }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplateTwo;
