"use client";

import css from "./FilterSideBar.module.css";
import { useCampersStore } from "@/store/campersStore";

type EquipmentKey = "AC" | "kitchen" | "TV" | "bathroom";
type VehicleType = "van" | "Fully Integrated" | "Alcove";

export default function FiltersSidebar() {
  const filters = useCampersStore((state) => state.filters);
  const setFilters = useCampersStore((state) => state.setFilters);
  const fetchCampers = useCampersStore((state) => state.fetchCampers);
  const resetCampers = useCampersStore((state) => state.resetCampers);

  function toggleEquipment(key: EquipmentKey) {
    setFilters({
      ...filters,
      [key]: !filters[key],
    });
  }
  function selectVehicleType(type: VehicleType) {
    setFilters({
      ...filters,
      form: filters.form === type ? undefined : type,
    });
  }

  function handleSearch() {
    resetCampers();
    fetchCampers(true);
  }

  function toggleAutomatic() {
    setFilters({
      ...filters,
      transmission:
        filters.transmission === "automatic" ? undefined : "automatic",
    });
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
        value={filters.location ?? ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            location: e.target.value || undefined,
          })
        }
      />

      <p className={css.filtersTitle}>Filter</p>

      <h3 className={css.sectionTitle}>Vehicle equipment</h3>
      <div className={css.divider}></div>
      <ul className={css.grid}>
        <li>
          <button
            type="button"
            onClick={() => toggleEquipment("AC")}
            aria-pressed={filters.AC === true}
          >
            AC
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={toggleAutomatic}
            aria-pressed={filters.transmission === "automatic"}
          >
            Automatic
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => toggleEquipment("kitchen")}
            aria-pressed={filters.kitchen === true}
          >
            Kitchen
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => toggleEquipment("TV")}
            aria-pressed={filters.TV === true}
          >
            TV
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => toggleEquipment("bathroom")}
            aria-pressed={filters.bathroom === true}
          >
            Bathroom
          </button>
        </li>
      </ul>

      <h3 className={css.sectionTitle}>Vehicle type</h3>
      <ul className={css.grid}>
        <li>
          <button
            type="button"
            onClick={() => selectVehicleType("van")}
            aria-pressed={filters.form === "van"}
          >
            Van
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => selectVehicleType("Fully Integrated")}
            aria-pressed={filters.form === "Fully Integrated"}
          >
            Fully Integrated
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => selectVehicleType("Alcove")}
            aria-pressed={filters.form === "Alcove"}
          >
            Alcove
          </button>
        </li>
      </ul>

      <button className={css.searchBtn} type="button" onClick={handleSearch}>
        Search
      </button>
    </aside>
  );
}
