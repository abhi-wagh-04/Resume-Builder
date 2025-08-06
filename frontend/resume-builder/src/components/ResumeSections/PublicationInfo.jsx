function PublicationInfo({ title, conference, year, description, link }) {
  return (
    <div className="mb-5">
      <h3 className="text-[15px] font-semibold text-gray-900">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="text-sm text-gray-700 font-medium">
        {conference}, {year}
      </p>
      <p className="text-xs text-gray-500 font-medium italic mt-0.5">
        {description}
      </p>
    </div>
  );
}

export default PublicationInfo;
