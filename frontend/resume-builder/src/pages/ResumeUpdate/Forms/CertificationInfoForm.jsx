import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

function CertificationInfoForm({
  certifications,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {certifications?.map((cert, index) => (
          <div
            className="border border-gray-200/80 p-4 rounded-lg relative"
            key={index}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Certificate Title"
                placeholder="FullStack Web Developer"
                type="text"
                value={cert.title || ""}
                onChange={(e) =>
                  updateArrayItem(index, "title", e.target.value)
                }
              />
              <Input
                label="Issuer"
                placeholder="Coursera / Google / etc."
                type="text"
                value={cert.issuer || ""}
                onChange={(e) =>
                  updateArrayItem(index, "issuer", e.target.value)
                }
              />
              <Input
                label="Year"
                placeholder="2025"
                type="text"
                value={cert.year || ""}
                onChange={(e) => updateArrayItem(index, "year", e.target.value)}
              />
            </div>
            {certifications?.length > 1 && (
              <button
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                type="button"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        ))}
        <button
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({
              title: "",
              issuer: "",
              year: "",
            })
          }
        >
          <LuPlus /> Add Certificate
        </button>
      </div>
    </div>
  );
}

export default CertificationInfoForm;
