import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

function AdditionalInfoForm({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) {
  if (!interests || interests.length === 0) {
    // We had to include this condition because, we need to reinitialize the interests to empty array so it can be iterated in map method
    interests = [""];
  }

  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Additional Info</h2>
      {/** Language Section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Languages</h3>
        <div className="flex flex-col gap-4">
          {languages?.map((lang, index) => (
            <div
              className="border border-gray-200 p-4 rounded-lg relative"
              key={index}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <Input
                  label="Language"
                  type="text"
                  placeholder="e.g. English"
                  value={lang.name || ""}
                  onChange={(e) =>
                    updateArrayItem("languages", index, "name", e.target.value)
                  }
                />
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-7 block">
                    Proficiency
                  </label>
                  <RatingInput
                    value={lang.progress || ""}
                    onChange={(value) =>
                      updateArrayItem("languages", index, "progress", value)
                    }
                    total={5}
                    activeColor="#0ea5e9"
                    inactiveColor="#e0f2fe"
                  />
                </div>
              </div>
              {languages?.length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  type="button"
                  onClick={() => removeArrayItem("languages", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
          <button
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
            onClick={() => addArrayItem("languages", { name: "", progress: 0 })}
          >
            <LuPlus /> Add Language
          </button>
        </div>
      </div>
      {/** Intrests Section */}
      <div className="mt-8 mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Interests</h3>
        <div className="flex flex-col">
          {interests?.map((interest, index) => (
            <div className="relative rounded-lg" key={index}>
              <Input
                placeholder="e.g. Reading"
                type="text"
                value={interest}
                onChange={(e) =>
                  updateArrayItem("interests", index, null, e.target.value)
                }
              />
              {interests?.length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  type="button"
                  onClick={() => removeArrayItem("interests", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
          <button
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
            onClick={() => addArrayItem("interests", "")}
          >
            <LuPlus /> Add Interest
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfoForm;
