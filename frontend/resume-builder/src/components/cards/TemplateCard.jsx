function TemplateCard({ thumbnailImg, isSelected, onSelect }) {
  return (
    <div
      className={`h-auto md:h-[380px] flex flex-col items-center justify-between bg-white rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer ${
        isSelected ? "border-purple-500 border-2" : ""
      }`}
      onClick={onSelect}
    >
      {thumbnailImg ? (
        <img
          src={thumbnailImg}
          alt=""
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TemplateCard;
