import { useEffect, useRef, useState } from "react";
import {
  DUMMY_RESUME_DATA,
  resumeTemplates,
  themeColorPalette,
} from "../../utils/data";
import { LuCircleCheckBig } from "react-icons/lu";
import Tabs from "../../components/Tabs";
import TemplateCard from "../../components/cards/TemplateCard";

const TAB_DATA = [{ label: "Templates" }, { label: "Color Palettes" }];

function ThemeSelector({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState("Templates");
  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette,
    index: -1,
  });
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  // Handle Theme Changes
  const handleThemeSelection = () => {
    setSelectedTheme({
      colorPalette: selectedColorPalette?.colors,
      theme: selectedTemplate?.theme,
    });
    onClose();
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="flex items-center justify-between mb-5 mt-2 mr-4">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
        <button
          className="btn-small-light"
          onClick={() => handleThemeSelection()}
        >
          <LuCircleCheckBig className="text-[16px]" />
          Done
        </button>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-5 bg-white">
          <div className="grid grid-cols-2 gap-6 md:gap-8 max-h-[80vh] overflow-scroll custom-scrollbar md:pr-5">
            {tabValue === "Templates" &&
              resumeTemplates.map((template, index) => (
                <div className="transform scale-[0.9]">
                  <TemplateCard
                    key={`templates_${index}`}
                    thumbnailImg={template.thumbnailImg}
                    isSelected={selectedTemplate?.index === index}
                    onSelect={() =>
                      setSelectedTemplate({ theme: template.id, index })
                    }
                  />
                </div>
              ))}
            {tabValue === "Color Palettes" &&
              themeColorPalette.themeOne.map((colors, index) => (
                <colorPalette
                  key={index}
                  colors={colors}
                  isSelected={selectedColorPalette?.index === index}
                  onSelect={() => setSelectedColorPalette({ colors, index })}
                />
              ))}
          </div>
        </div>
        <div
          className="col-span-12 md:col-span-7 bg-white -mt-3"
          ref={resumeRef}
        ></div>
      </div>
    </div>
  );
}

export default ThemeSelector;

const colorPalette = ({ colors, isSelected, onSelect }) => {
  return (
    <div
      className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 ${
        isSelected ? "border-purple-500" : "border-none"
      }`}
    >
      {colors.map((color, index) => (
        <div
          className="flex-1"
          key={index}
          style={{ backgroundColor: colors[index] }}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};
