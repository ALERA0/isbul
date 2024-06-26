// pages/HomePage.tsx
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCharacters, getAllLocations } from "@/api";
import { RootState, AppDispatch } from "@/store";
import Card from "@/components/Card";
import Filter from "@/components/Filter";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [filteredLocations, setFilteredLocations] = useState<string | null>(null);
  const characters = useSelector((state: RootState) => state.getAllChar.data);
  const locations = useSelector((state: RootState) => state.getAllLocations.data);

  useEffect(() => {
    dispatch(getAllCharacters());
    dispatch(getAllLocations());
  }, [dispatch]);



  // Filtrelenmiş karakterleri almak için bir fonksiyon
  const getFilteredCharacters = () => {
    if (filteredLocations) {
      return characters.filter((character) =>
        character.location.name.includes(filteredLocations)
      );
    } else {
      return characters; // Eğer filteredLocations null ise tüm karakterleri göster
    }
  };

  return (
    <main className="flex min-h-screen items-start justify-between py-24 px-8 gap-6">
      <div className="gap-6 flex flex-col">
        {/* Location için Filter component'ı */}
        <Filter
          charStatus="Location"
          locations={locations}
          filteredLocations={filteredLocations}
          setFilteredLocations={setFilteredLocations}
        />
        {/* Status için Filter component'ı */}
        <Filter charStatus="Status" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {getFilteredCharacters()?.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
