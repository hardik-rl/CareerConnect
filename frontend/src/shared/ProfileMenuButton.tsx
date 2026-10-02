type ProfileMenuButtonProps = {
  onClick: () => void;
  mobile?: boolean;
};

function ProfileMenuButton({
  onClick,
  mobile = false,
}: ProfileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        mobile
          ? "rounded-[10px] border border-[#e0e5ed] px-4 py-3 text-left text-sm font-medium text-[#374151]"
          : "flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14px] text-[#374151] transition hover:bg-[#f5f7fa]"
      }
    >
      {!mobile && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
      Profile
    </button>
  );
}

export default ProfileMenuButton;