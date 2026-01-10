"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import css from "./FilterSideBar.module.css";

type EquipmentKey = "AC" | "automatic" | "kitchen" | "TV" | "bathroom";
type VehicleType = "van" | "Fully Integrated" | "Alcove";

export default function FiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState("");

  const [equipment, setEquipment] = useState<Record<EquipmentKey, boolean>>({
    AC: false,
    automatic: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  });

  const [vehicleType, setVehicleType] = useState<VehicleType | "">("");

  function toggleEquipment(key: EquipmentKey) {
    setEquipment((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function selectVehicleType(type: VehicleType) {
    setVehicleType(type);
  }

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());

    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    Object.entries(equipment).forEach(([key, value]) => {
      if (value) {
        params.set(key, "true");
      } else {
        params.delete(key);
      }
    });

    if (vehicleType) {
      params.set("type", vehicleType);
    } else {
      params.delete("type");
    }

    router.push(`/catalog?${params.toString()}`);
  }

  return (
    <aside className={css.sidebar}>
      <label htmlFor="location" className={css.label}>
        Location
      </label>
      <input
        className={css.input}
        placeholder="City"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <p className={css.filtersTitle}>Filter</p>

      <h3 className={css.sectionTitle}>Vehicle equipment</h3>
      <div className={css.divider}></div>
      <ul className={css.grid}>
        <li>
          <button
            type="button"
            onClick={() => toggleEquipment("AC")}
            aria-pressed={equipment.AC}
          >
            AC
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => toggleEquipment("automatic")}
            aria-pressed={equipment.automatic}
          >
            Automatic
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => toggleEquipment("kitchen")}
            aria-pressed={equipment.kitchen}
          >
            Kitchen
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => toggleEquipment("TV")}
            aria-pressed={equipment.TV}
          >
            TV
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => toggleEquipment("bathroom")}
            aria-pressed={equipment.bathroom}
          >
            Bathroom
          </button>
        </li>
      </ul>

      <h3 className={css.sectionTitle}>Vehicle type</h3>
      <div className={css.divider}></div>
      <ul className={css.grid}>
        <li>
          <button
            type="button"
            onClick={() => selectVehicleType("van")}
            aria-pressed={vehicleType === "van"}
          >
            Van
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => selectVehicleType("Fully Integrated")}
            aria-pressed={vehicleType === "Fully Integrated"}
          >
            Fully Integrated
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => selectVehicleType("Alcove")}
            aria-pressed={vehicleType === "Alcove"}
          >
            Alcove
          </button>
        </li>
      </ul>

      <button  className={css.searchBtn} type="button" onClick={handleSearch}>
        Search
      </button>
    </aside>
  );
}
