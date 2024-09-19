import React, { useState, useEffect } from 'react';
import PivotTable from '../shared/Tables/PivotTable/PivotTable.tsx';
import { ThemeProvider, ThemeContext } from '../../model/context/ThemeContext';
import { filterChanged, retrieveData } from '../../model/api/dataService.ts'
import Filters from '../shared/Filter/Filter.tsx'
import { FiltersProps, TableData } from '../../model/types/types.ts'


const initialFilters = {
  Article: 'All Articles',
  Region: 'All Regions',
  LegalEntity: 'All Entities',
  Version: 'All Versions',
  Currency: 'All Currencies',
  Measure: 'All Measures'
};

const App: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [filters, setFilters] = useState(initialFilters);
  const [filterOptions, setFilterOptions] = useState<FiltersProps>({
    Article: [],
    Region: [],
    LegalEntity: [],
    Version: [],
    Currency: [],
    Measure: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    retrieveData().then((data) => {
      setData(data);
      setFilteredData(data);
      setLoading(false);

      const articles = ['All Articles', ...Array.from(new Set(data.map((item) => item.Article)))];
      const regions = ['All Regions', ...Array.from(new Set(data.map((item) => item.Region)))];
      const legalEntities = ['All Entities', ...Array.from(new Set(data.map((item) => item.LegalEntity)))];
      const versions = ['All Versions', ...Array.from(new Set(data.map((item) => item.Version)))];
      const currencies = ['All Currencies', ...Array.from(new Set(data.map((item) => item.Currency)))];
      const measures = ['All Measures', ...Array.from(new Set(data.map((item) => item.Measure)))];

      setFilterOptions({
        Article: articles,
        Region: regions,
        LegalEntity: legalEntities,
        Version: versions,
        Currency: currencies,
        Measure: measures
      });
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      filterChanged(filters)
        .then(response => {
          setFilteredData(response);
          setLoading(false);
        })
    }, 500);
  }, [filters, data]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div>
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              filterOptions={filterOptions}
            />
            <button onClick={toggleTheme}>
              Switch to {theme === 'default' ? 'alternate' : 'standard'} theme
            </button>
            {loading ? (
              <p>Data loading...</p>
            ) : (
              <PivotTable data={filteredData} />
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

export default App;
