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
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        {name ? (
          <>
            Welcome<span className="text-purple-600 dark:text-purple-400">, {name}</span>
          </>
        ) : (
          greeting
        )}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        Here&apos;s your financial overview for today.
      </p>
    </div>
  );
};

export default memo(Greeting);
