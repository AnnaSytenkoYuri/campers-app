'use client';

import useFilterStore from '@/lib/store/filterStore';
import css from './CampersSidebar.module.css';
import Icon from '@/components/Icon/Icon';

export default function CampersSidebar() {
  const {
    location,
    setLocation,
    filters,
    toggleFilter,
    form,
    setForm,
    transmission,
    setTransmission,
    applyFilters,
  } = useFilterStore();

  const filterEquipment = [
    'AC',
    'bathroom',
    'kitchen',
    'TV',
    'automatic',
  ] as const;

  const filterType = ['panelTruck', 'fullyIntegrated', 'alcove'] as const;

  const equipmentIconMap: Record<(typeof filterEquipment)[number], string> = {
    AC: 'wind',
    bathroom: 'ph_shower',
    kitchen: 'cup-hot',
    TV: 'tv',
    automatic: 'diagram',
  };

  const typeLabelMap: Record<(typeof filterType)[number], string> = {
    panelTruck: 'Van',
    fullyIntegrated: 'Fully Integrated',
    alcove: 'Alcove',
  };

  const typeIconMap: Record<(typeof filterType)[number], string> = {
    panelTruck: 'bi_grid-1x2',
    fullyIntegrated: 'bi_grid',
    alcove: 'bi_grid-3x3-gap',
  };

  const handleSearch = () => {
    applyFilters();
  };

  return (
    <div className={css.sidebar}>
      <div className={css.locationContainer}>
        <h2 className={css.sectionTitle}>Location</h2>
        <div className={css.inputContainer}>
          <input
            className={css.input}
            value={location}
            onChange={e => setLocation(e.target.value)}
            type="text"
            placeholder="City"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className={`${css.inputIcon} ${location && css.iconActive}`}
          >
            <use href="/sprite.svg#map" />
          </svg>
        </div>
      </div>

      <div className={css.equipmentContainer}>
        <h2 className={`${css.sectionTitle} ${css.sectionTitleFilters}`}>
          Filters
        </h2>

        <h3 className={css.filtersTitle}>Vehicle equipment</h3>
        <span className={css.divider} aria-hidden="true" />
        <ul className={css.optionsContainer}>
          {filterEquipment.map(key => {
            const isAutomatic = key === 'automatic';
            const isActive = isAutomatic
              ? transmission === 'automatic'
              : filters.includes(key);

            return (
              <li key={key} className={css.optionItem}>
                <button
                  type="button"
                  className={`${css.optionBtn} ${isActive ? css.active : ''}`}
                  onClick={() => {
                    if (isAutomatic) setTransmission('automatic');
                    else toggleFilter(key);
                  }}
                >
                  <Icon
                    name={equipmentIconMap[key]}
                    size={32}
                    className={css.optionIcon}
                    iconType="stroke"
                    title={key}
                  />
                  <span className={css.labelText}>{key}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={css.vehicleTypeContainer}>
        <h3 className={css.filtersTitle}>Vehicle type</h3>
        <span className={css.divider} aria-hidden="true" />
        <ul className={css.optionsContainer}>
          {filterType.map(key => {
            const isActive = form === key;

            return (
              <li key={key} className={css.optionItem}>
                <button
                  type="button"
                  className={`${css.optionBtn} ${isActive ? css.active : ''}`}
                  onClick={() => setForm(key)}
                >
                  <Icon
                    name={typeIconMap[key]}
                    size={32}
                    className={css.optionIcon}
                    iconType="stroke"
                    title={key}
                  />
                  <span className={css.labelText}>{typeLabelMap[key]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={css.btnContainer}>
        <button
          type="button"
          className="button button--primary"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
