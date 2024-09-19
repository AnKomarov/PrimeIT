import { TableData } from '../types/types.ts'

export const retrieveData = (): Promise<TableData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      import('../../../public/data.json').then((jsonData) => {
        resolve(jsonData.data);
      });
    }, 500);
  });
};

export const filterChanged = async (filters: any): Promise<TableData[]> => {
  const data = await retrieveData();
  const filteredData = data.filter((row) => {
    return (
      (filters.Article === 'All Articles' || row.Article === filters.Article) &&
      (filters.Region === 'All Regions' || row.Region === filters.Region) &&
      (filters.LegalEntity === 'All Entities' || row.LegalEntity === filters.LegalEntity) &&
      (filters.Version === 'All Versions' || row.Version === filters.Version) &&
      (filters.Currency === 'All Currencies' || row.Currency === filters.Currency) &&
      (filters.Measure === 'All Measures' || row.Measure === filters.Measure)
    );
  });
  return filteredData;
};

