import React, { useState, useContext, useMemo } from 'react';
import { ThemeContext } from '../../../../model/context/ThemeContext.tsx';
import style from './PivotTable.module.scss';
import { TableData } from '../../../../model/types/types.ts';
import {
  buildTree,
  collapseDescendants,
  getIsExpanded,
  getVisibleColumns,
  updateExpandedState
} from './assets/helpers/helpers.ts'

interface PivotTableProps {
  data: TableData[];
}

interface ExpandedStateNode {
  expanded: boolean;
  children?: ExpandedState;
}

type ExpandedState = {
  [key: string]: ExpandedStateNode;
};

const PivotTable: React.FC<PivotTableProps> = ({ data }) => {
  const [expandedState, setExpandedState] = useState<ExpandedState>({});
  const { theme } = useContext(ThemeContext);

  const treeData = useMemo(() => buildTree(data), [data]);

  const toggleExpand = (keys: string[]) => {
    setExpandedState((prevState) => {
      const newState = updateExpandedState(prevState, keys);

      if (!getIsExpanded(newState, keys)) {
        collapseDescendants(newState, keys);
      }

      return newState;
    });
  };

  const visibleColumns = getVisibleColumns(expandedState);

  const renderRows = (
    nodes: any,
    keys: string[] = [],
    level = 0,
    rowIndexRef: { current: number }
  ): React.ReactNode[] => {
    const rows: React.ReactNode[] = [];

    Object.keys(nodes).forEach((key) => {
      if (key === 'expanded' || key === 'name') return;

      const node = nodes[key];
      const currentKeys = [...keys, key];
      const isExpanded = getIsExpanded(expandedState, currentKeys);

      const rowClassName =
        theme === 'alternate' && rowIndexRef.current % 2 === 1 ? style.darkRow : style.lightRow;

      const columns: React.ReactNode[] = [];

      ['Article', 'Region', 'LegalEntity'].forEach((col, idx) => {
        if (visibleColumns.includes(col)) {
          if (level === idx) {
            columns.push(
              <td key={`${col}-${key}`}>
                <span style={{ cursor: 'pointer' }} onClick={() => toggleExpand(currentKeys)}>
                  {isExpanded ? '▼' : '▶'} {node.name}
                </span>
              </td>
            );
          } else {
            columns.push(<td key={`${col}-${key}-empty`}></td>);
          }
        }
      });

      ['Version', 'Currency', 'Measure', 'Value'].forEach((col) => {
        if (visibleColumns.includes(col)) {
          columns.push(<td key={`${col}-${key}-empty`}></td>);
        }
      });

      rows.push(
        <tr key={currentKeys.join('-')} className={rowClassName}>
          {columns}
        </tr>
      );
      rowIndexRef.current += 1;

      if (isExpanded) {
        if (node.regions) {
          rows.push(...renderRows(node.regions, currentKeys, level + 1, rowIndexRef));
        } else if (node.legalEntities) {
          rows.push(...renderRows(node.legalEntities, currentKeys, level + 1, rowIndexRef));
        } else if (node.rows) {
          node.rows.forEach((dataRow: TableData, idx: number) => {
            const dataRowClassName =
              theme === 'alternate' && rowIndexRef.current % 2 === 1
                ? style.darkRow
                : style.lightRow;

            const dataColumns = [];

            ['Article', 'Region', 'LegalEntity'].forEach((col, idx) => {
              if (visibleColumns.includes(col)) {
                dataColumns.push(<td key={`empty-data-${idx}`}></td>);
              }
            });

            if (visibleColumns.includes('Version')) {
              dataColumns.push(<td key="version">{dataRow.Version}</td>);
            }
            if (visibleColumns.includes('Currency')) {
              dataColumns.push(<td key="currency">{dataRow.Currency}</td>);
            }
            if (visibleColumns.includes('Measure')) {
              dataColumns.push(<td key="measure">{dataRow.Measure}</td>);
            }
            if (visibleColumns.includes('Value')) {
              dataColumns.push(<td key="value">{dataRow.value}</td>);
            }

            rows.push(
              <tr key={`${currentKeys.join('-')}-data-${idx}`} className={dataRowClassName}>
                {dataColumns}
              </tr>
            );
            rowIndexRef.current += 1;
          });
        }
      }
    });

    return rows;
  };

  if (data.length === 0) {
    return <p>No data to show</p>;
  }

  const rowIndexRef = { current: 0 };

  return (
    <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
      <tr>
        {visibleColumns.includes('Article') && <th>Article</th>}
        {visibleColumns.includes('Region') && <th>Region</th>}
        {visibleColumns.includes('LegalEntity') && <th>Legal Entity</th>}
        {visibleColumns.includes('Version') && <th>Version</th>}
        {visibleColumns.includes('Currency') && <th>Currency</th>}
        {visibleColumns.includes('Measure') && <th>Measure</th>}
        {visibleColumns.includes('Value') && <th>Value</th>}
      </tr>
      </thead>
      <tbody>{renderRows(treeData, [], 0, rowIndexRef)}</tbody>
    </table>
  );
};

export default PivotTable;
