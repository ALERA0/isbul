// components/Card.tsx
import React from "react";
import Info from "./Info";

type CardProps = {
  character: {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    location: {
      name: string;
    };
  };
};

const Card: React.FC<CardProps> = ({ character }) => {
  return (
    <div className="rounded-xl bg-gray-500 flex flex-col gap-2 overflow-hidden">
      <img
        src={character.image}
        alt="avatarImg"
        className="rounded-xl w-full h-48 object-fill"
      />
      <div className="flex flex-col w-full gap-2 p-4">
        <Info header="Name" charInfo={character.name} />
        <Info header="Location" charInfo={character.location.name} />
        <Info header="Status" charInfo={character.status} charStatus={character.status} />
        <Info header="Species" charInfo={character.species} />
      </div>
    </div>
  );
};

export default Card;
