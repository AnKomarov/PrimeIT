export interface TableData {
  Article: string;
  Region: string;
  LegalEntity: string;
  Version: string;
  Currency: string;
  Measure: string;
  value: number;
}

export interface FiltersProps {
  Article: string[];
  Region: string[];
  LegalEntity: string[];
  Version: string[];
  Currency: string[];
  Measure: string[];
}
