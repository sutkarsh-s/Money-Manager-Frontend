import { memo } from "react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const Greeting = ({ userName }) => {
  const name = userName?.split(" ")[0] ?? "";
  const greeting = getGreeting();

  return (
    <div className="mb-6 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {greeting}
        {name && <span className="text-purple-600">, {name}</span>}
      </h1>
      <p className="text-gray-600 mt-1">
        Here&apos;s your financial overview for today.
      </p>
    </div>
  );
};

export default memo(Greeting);
