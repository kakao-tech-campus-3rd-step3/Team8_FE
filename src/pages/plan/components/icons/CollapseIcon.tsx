function CollapseIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: 'transform 0.2s',
      }}
    >
      <path d="M7 14l5-5 5 5H7z" fill="black" />
    </svg>
  );
}

export default CollapseIcon;
