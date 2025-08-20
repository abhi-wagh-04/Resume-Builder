import ProfilePhotoSelector from "../../../components/Inputs/ProfilePhotoSelector.jsx";
import Input from "../../../components/Inputs/Input.jsx";

function ProfileInfoForm({ profileData, updateSection, onNext }) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h2>
      <div className="mt-4">
        <ProfilePhotoSelector
          image={profileData?.profileImg || profileData?.profilePreviewUrl}
          setImage={(value) => updateSection("profileImg", value)}
          preview={profileData?.profilePreviewUrl}
          setPreview={(value) => updateSection("profilePreviewUrl", value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={profileData.fullName || ""}
            onChange={(e) => updateSection("fullName", e.target.value)}
            label="Full Name"
            placeholder="Abhi"
            type="text"
          />
          <Input
            value={profileData.designation || ""}
            onChange={(e) => updateSection("designation", e.target.value)}
            label="Designation"
            placeholder="Software Developer"
            type="text"
          />
          <div className="col-span-2 mt-3">
            <label className="text-xs font-medium text-slate-600">
              Summary
            </label>
            <textarea
              placeholder="short Introduction"
              className="form-input"
              rows={4}
              value={profileData.summary || ""}
              onChange={(e) => updateSection("summary", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoForm;
