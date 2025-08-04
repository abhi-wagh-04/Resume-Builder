import TemplateFour from "./TemplateTwo";
import TemplateOne from "./TemplateOne";
import TemplateThree from "./TemplateThree";
import TemplateTwo from "./TemplateFour";
import TemplateFive from "./TemplateFive";

function RenderResume({
  templateId,
  resumeData,
  colorPalette,
  containerWidth,
}) {
  switch (templateId) {
    case "01":
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    case "02":
      return (
        <TemplateTwo
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    case "03":
      return (
        <TemplateThree
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    case "04":
      return (
        <TemplateFour
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    case "05":
      return (
        <TemplateFive
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    default:
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
  }
}

export default RenderResume;
