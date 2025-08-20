import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

function SkillsInfoForm({
  skillsInfo,
  updateArrayItem, addArrayItem, removeArrayItem
}) {
  return (
   <div className="px-5 pt-3">
      <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
      <div className="mt-4 flex flex-col gap-6 mb-3">
        {/* Programming */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Programming</h3>
          {(skillsInfo.programming || []).map((skill, index) => (
            <div key={index} className="border border-gray-200/80 p-4 rounded-lg relative mb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Skill Name"
                  placeholder="JavaScript"
                  type="text"
                  value={skill.name || ""}
                  onChange={(e) =>
                    updateArrayItem("programming", index, "name", e.target.value)
                  }
                />
                <div>
                  <label className="text-[13px] text-slate-800 mb-1">
                    Proficiency ({skill.progress / 20 || 0}/5)
                  </label>
                  <div className="mt-5">
                    <RatingInput
                      value={skill.progress || 0}
                      total={5}
                      onChange={(newValue) =>
                        updateArrayItem("programming", index, "progress", newValue)
                      }
                    />
                  </div>
                </div>
              </div>
              {(skillsInfo.programming || []).length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  type="button"
                  onClick={() => removeArrayItem("programming", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 cursor-pointer"
            onClick={() => addArrayItem("programming", { name: "", progress: 0 })}
          >
            <LuPlus /> Add Skill
          </button>
        </div>

        {/* Databases */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Databases</h3>
          {(skillsInfo.databases || []).map((skill, index) => (
            <div key={index} className="border border-gray-200/80 p-4 rounded-lg relative mb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Skill Name"
                  placeholder="MySQL"
                  type="text"
                  value={skill.name || ""}
                  onChange={(e) =>
                    updateArrayItem("databases", index, "name", e.target.value)
                  }
                />
                <div>
                  <label className="text-[13px] text-slate-800 mb-1">
                    Proficiency ({skill.progress / 20 || 0}/5)
                  </label>
                  <div className="mt-5">
                    <RatingInput
                      value={skill.progress || 0}
                      total={5}
                      onChange={(newValue) =>
                        updateArrayItem("databases", index, "progress", newValue)
                      }
                    />
                  </div>
                </div>
              </div>
              {(skillsInfo.databases || []).length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  type="button"
                  onClick={() => removeArrayItem("databases", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 cursor-pointer"
            onClick={() => addArrayItem("databases", { name: "", progress: 0 })}
          >
            <LuPlus /> Add Skill
          </button>
        </div>

        {/* Frameworks & Tools */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Frameworks & Tools</h3>
          {(skillsInfo.frameworksAndTools || []).map((skill, index) => (
            <div key={index} className="border border-gray-200/80 p-4 rounded-lg relative mb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Skill Name"
                  placeholder="ReactJS"
                  type="text"
                  value={skill.name || ""}
                  onChange={(e) =>
                    updateArrayItem("frameworksAndTools", index, "name", e.target.value)
                  }
                />
                <div>
                  <label className="text-[13px] text-slate-800 mb-1">
                    Proficiency ({skill.progress / 20 || 0}/5)
                  </label>
                  <div className="mt-5">
                    <RatingInput
                      value={skill.progress || 0}
                      total={5}
                      onChange={(newValue) =>
                        updateArrayItem("frameworksAndTools", index, "progress", newValue)
                      }
                    />
                  </div>
                </div>
              </div>
              {(skillsInfo.frameworksAndTools || []).length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  type="button"
                  onClick={() => removeArrayItem("frameworksAndTools", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 cursor-pointer"
            onClick={() => addArrayItem("frameworksAndTools", { name: "", progress: 0 })}
          >
            <LuPlus /> Add Skill
          </button>
        </div>

        {/* AI/ML & Computer Vision */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">AI/ML & Computer Vision</h3>
          {(skillsInfo.aiMlAndComputerVision || []).map((skill, index) => (
            <div key={index} className="border border-gray-200/80 p-4 rounded-lg relative mb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Skill Name"
                  placeholder="Machine Learning"
                  type="text"
                  value={skill.name || ""}
                  onChange={(e) =>
                    updateArrayItem("aiMlAndComputerVision", index, "name", e.target.value)
                  }
                />
                <div>
                  <label className="text-[13px] text-slate-800 mb-1">
                    Proficiency ({skill.progress / 20 || 0}/5)
                  </label>
                  <div className="mt-5">
                    <RatingInput
                      value={skill.progress || 0}
                      total={5}
                      onChange={(newValue) =>
                        updateArrayItem("aiMlAndComputerVision", index, "progress", newValue)
                      }
                    />
                  </div>
                </div>
              </div>
              {(skillsInfo.aiMlAndComputerVision || []).length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  type="button"
                  onClick={() => removeArrayItem("aiMlAndComputerVision", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 cursor-pointer"
            onClick={() => addArrayItem("aiMlAndComputerVision", { name: "", progress: 0 })}
          >
            <LuPlus /> Add Skill
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkillsInfoForm;
