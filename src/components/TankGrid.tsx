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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 mt-10">
      {tanks.map((tank) => (
        <TankCard key={tank.tank_no} tank={tank} />
      ))}
    </div>
  );
};

export default TankGrid;