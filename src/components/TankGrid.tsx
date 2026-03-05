import TankCard from "./TankCard";
import type { Tank } from "../types/tank";



const TankGrid = ({ tanks }: { tanks: Tank[] }) => {


  if (tanks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
        <p className="text-lg">No tanks found.</p>
        <p className="text-sm mt-2">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8 mt-8 pb-10">
      {tanks.map((tank) => (
        <TankCard key={tank.tank_no} tank={tank} />
      ))}
    </div>
  );
};

export default TankGrid;