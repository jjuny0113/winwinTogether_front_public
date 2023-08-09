"use client";
interface CircleProps {
  color?: "monoGray4" | "monoGray5" | "monoGray6";
}
export const Circle = ({ color = "monoGray6" }: CircleProps) => {
  const colorMapper = () => {
    const map = new Map<CircleProps["color"], string>([
      ["monoGray4", "bg-monoGray4"],
      ["monoGray5", "bg-monoGray5"],
      ["monoGray6", "bg-monoGray6"],
    ]);
    return map.get(color) ?? "";
  };
  return (
    <span
      className={`block w-1 h-1 rounded-full flex-shrink-0 ${colorMapper()}`}
    />
  );
};
