// components/Info.tsx
import React from "react";

type InfoProps = {
  header: string;
  charInfo: string;
  charStatus?: string;
};

const Info: React.FC<InfoProps> = ({ header, charInfo, charStatus }) => {
  return (
    <div className="truncate w-full">
      <p className="text-gray-300">{header}</p>
      <h2 className="text-lg truncate overflow-ellipsis whitespace-nowrap">
        {charStatus ? (
          charStatus === "Alive" ? (
            <span className="text-green-600 text-2xl">:</span>
          ) : (
            <span className="text-red-600 text-2xl">.</span>
          )
        ) : null}
        {charInfo}
      </h2>
    </div>
  );
};

export default Info;
