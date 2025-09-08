import { CircleX } from "lucide-react";

export const ChipItem = ({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center gap-1 text-sm border border-gray-400 rounded-xl p-1">
      <span>{children}</span>

      {/* Using span instead of button since it's incorrect to have a button nested inside another button */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
      >
        <span className="sr-only">Remove</span>
        <CircleX className="size-4" />
      </span>
    </div>
  );
};
