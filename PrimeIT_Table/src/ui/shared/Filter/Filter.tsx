import React from 'react';
import { FiltersProps as CoreFilterTypes } from '../../../model/types/types.ts';
import style from './Filters.module.scss';

interface FiltersProps {
  filters: { [Key in keyof CoreFilterTypes]: string };
  onFilterChange: (key: string, value: string) => void;
  filterOptions: {
    Article: string[];
    Region: string[];
    LegalEntity: string[];
    Version: string[];
    Currency: string[];
    Measure: string[];
  };
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, filterOptions }) => {
  return (
    <div className={style.filtersContainer}>
      <label className={style.label}>
        Article:
        <select
          className={style.select}
          value={filters.Article}
          onChange={(e) => onFilterChange('Article', e.target.value)}
        >
          {filterOptions.Article?.map((article) => (
            <option
              key={article}
              value={article}
              className={`${style.option} ${
                filters.Article === article ? style.selectedOption : ''
              }`}
            >
              {article}
            </option>
          ))}
        </select>
      </label>

      <label className={style.label}>
        Region:
        <select
          className={style.select}
          value={filters.Region}
          onChange={(e) => onFilterChange('Region', e.target.value)}
        >
          {filterOptions.Region?.map((region) => (
            <option
              key={region}
              value={region}
              className={`${style.option} ${
                filters.Region === region ? style.selectedOption : ''
              }`}
            >
              {region}
            </option>
          ))}
        </select>
      </label>

      <label className={style.label}>
        Legal Entity:
        <select
          className={style.select}
          value={filters.LegalEntity}
          onChange={(e) => onFilterChange('LegalEntity', e.target.value)}
        >
          {filterOptions.LegalEntity?.map((entity) => (
            <option
              key={entity}
              value={entity}
              className={`${style.option} ${
                filters.LegalEntity === entity ? style.selectedOption : ''
              }`}
            >
              {entity}
            </option>
          ))}
        </select>
      </label>

      <label className={style.label}>
        Version:
        <select
          className={style.select}
          value={filters.Version}
          onChange={(e) => onFilterChange('Version', e.target.value)}
        >
          {filterOptions.Version?.map((version) => (
            <option
              key={version}
              value={version}
              className={`${style.option} ${
                filters.Version === version ? style.selectedOption : ''
              }`}
            >
              {version}
            </option>
          ))}
        </select>
      </label>

      <label className={style.label}>
        Currency:
        <select
          className={style.select}
          value={filters.Currency}
          onChange={(e) => onFilterChange('Currency', e.target.value)}
        >
          {filterOptions.Currency?.map((currency) => (
            <option
              key={currency}
              value={currency}
              className={`${style.option} ${
                filters.Currency === currency ? style.selectedOption : ''
              }`}
            >
              {currency}
            </option>
          ))}
        </select>
      </label>

      <label className={style.label}>
        Measure:
        <select
          className={style.select}
          value={filters.Measure}
          onChange={(e) => onFilterChange('Measure', e.target.value)}
        >
          {filterOptions.Measure?.map((measure) => (
            <option
              key={measure}
              value={measure}
              className={`${style.option} ${
                filters.Measure === measure ? style.selectedOption : ''
              }`}
            >
              {measure}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filters;
