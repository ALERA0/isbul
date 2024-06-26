// components/Filter.tsx
"use client";
import { getAllCharacters } from "@/api";
import { AppDispatch } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

type FilterProps = {
  charStatus: string;
  locations?: Array<{ id: number; name: string }>; // Location için props
  filteredLocations?: string;
  setFilteredLocations?: React.Dispatch<React.SetStateAction<string | null>>;
};

const Filter = ({ charStatus, locations, filteredLocations, setFilteredLocations }: FilterProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const filteredLocation =
    locations &&
    locations.filter((location) =>
      location.name.toLowerCase().startsWith(search.toLowerCase())
    );

  const status = ["Alive", "Dead", "unknown"];

  const filteredStatus = status.filter((status) =>
    status.toLowerCase().startsWith(search.toLowerCase())
  );

  const handleStatusChange = (status: string) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
  };

  useEffect(() => {
    if (selectedStatus) {
      dispatch(getAllCharacters([selectedStatus]));
    } else {
      dispatch(getAllCharacters());
    }
  }, [selectedStatus]);

  const handleLocationChange = (locationName: string) => {
    if (locationName !== filteredLocations) {
      setFilteredLocations && setFilteredLocations(locationName);
    } else {
      setFilteredLocations && setFilteredLocations(null);
    }
  };

  return (
    <div className="w-80 p-4 border rounded-lg shadow-lg bg-gray-100 text-black">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{charStatus}</h3>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "▲" : "▼"}</button>
      </div>
      {isOpen && (
        <>
          <input
            type="text"
            placeholder="Ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="max-h-40 overflow-y-auto">
            {charStatus === "Location" && filteredLocation && (
              filteredLocation.map((location) => (
                <label key={location.id} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filteredLocations === location.name}
                    onChange={() => handleLocationChange(location.name)}
                  />
                  {location.name}
                </label>
              ))
            )}
            {charStatus === "Status" && filteredStatus.map((status) => (
              <label key={status} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedStatus === status}
                  onChange={() => handleStatusChange(status)}
                />
                {status}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
