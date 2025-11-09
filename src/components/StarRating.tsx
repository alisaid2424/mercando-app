"use client";

import { useState } from "react";
import Star from "./Star";

interface StarRatingProps {
  maxRating?: number;
  color?: string;
  size?: number;
  message?: string[];
  onRate?: number;
}

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  message = [],
  onRate = 0,
}: StarRatingProps) => {
  const [rating, setRating] = useState<number>(onRate || 0);
  const [tempRating, setTempRating] = useState<number>(0);

  const handleClick = (rating: number): void => {
    setRating(rating);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i}
            onRating={() => handleClick(i + 1)}
            haverIn={() => setTempRating(i + 1)}
            haverOut={() => setTempRating(0)}
            fill={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p
        className="m-0 leading-none"
        style={{ color, fontSize: `${size / 1.2}px` }}
      >
        {message.length === maxRating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

export default StarRating;
