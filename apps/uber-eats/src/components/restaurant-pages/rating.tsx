import React from "react";
// import { StarIcon as OutlinedStarIcon } from '@heroicons/react/outline'
import { StarIcon as SolidStarIcon } from "@heroicons/react/solid";

function Rating() {
  return (
    <div className="flex">
      <SolidStarIcon className="h-4 w-4 text-orange-400" />
      <SolidStarIcon className="h-4 w-4 text-orange-400" />
      <SolidStarIcon className="h-4 w-4 text-orange-400" />
      <SolidStarIcon className="h-4 w-4 text-orange-400" />
      <SolidStarIcon className="h-4 w-4 text-orange-400" />
    </div>
  );
}

export default Rating;
