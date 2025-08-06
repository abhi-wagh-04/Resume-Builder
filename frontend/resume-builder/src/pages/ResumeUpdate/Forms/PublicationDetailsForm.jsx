import { LuTrash2, LuPlus } from "react-icons/lu";
import Input from "../../../components/Inputs/Input";

function PublicationDetailsForm({
  publicationInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Publications</h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {publicationInfo?.map((publication, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Title"
                placeholder="Deep Learning for License Plate Detection"
                type="text"
                value={publication.title || ""}
                onChange={(e) =>
                  updateArrayItem(index, "title", e.target.value)
                }
              />
              <Input
                label="Conference"
                placeholder="IEEE ICCV"
                type="text"
                value={publication.conference || ""}
                onChange={(e) =>
                  updateArrayItem(index, "conference", e.target.value)
                }
              />
              <Input
                label="Year"
                placeholder="2025"
                type="number"
                value={publication.year || ""}
                onChange={(e) => updateArrayItem(index, "year", e.target.value)}
              />
              <Input
                label="Link"
                placeholder="https://example.com"
                type="url"
                value={publication.link || ""}
                onChange={(e) => updateArrayItem(index, "link", e.target.value)}
              />
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Brief summary of your research"
                  value={publication.description || ""}
                  onChange={(e) =>
                    updateArrayItem(index, "description", e.target.value)
                  }
                />
              </div>
            </div>

            {publicationInfo.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({
              title: "",
              conference: "",
              year: "",
              description: "",
              link: "",
            })
          }
        >
          <LuPlus /> Add Publication
        </button>
      </div>
    </div>
  );
}

export default PublicationDetailsForm;
