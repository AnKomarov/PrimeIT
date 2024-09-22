import { TableData } from '../../../../../../model/types/types.ts'
interface LegalEntityNode {
  name: string;
  rows: TableData[];
}

interface RegionNode {
  name: string;
  legalEntities: { [legalEntity: string]: LegalEntityNode };
}

interface ArticleNode {
  name: string;
  regions: { [region: string]: RegionNode };
}

interface TreeData {
  [article: string]: ArticleNode;
}

interface ExpandedStateNode {
  expanded: boolean;
  children?: ExpandedState;
}

type ExpandedState = {
  [key: string]: ExpandedStateNode;
};
export function buildTree(data: TableData[]) {
  const tree: TreeData = {};
  data.forEach((row) => {
    if (!tree[row.Article]) {
      tree[row.Article] = { name: row.Article, regions: {} };
    }
    if (!tree[row.Article].regions[row.Region]) {
      tree[row.Article].regions[row.Region] = { name: row.Region, legalEntities: {} };
    }
    if (!tree[row.Article].regions[row.Region].legalEntities[row.LegalEntity]) {
      tree[row.Article].regions[row.Region].legalEntities[row.LegalEntity] = {
        name: row.LegalEntity,
        rows: [],
      };
    }
    tree[row.Article].regions[row.Region].legalEntities[row.LegalEntity].rows.push(row);
  });

  return tree;
}

export const updateExpandedState = (state: ExpandedState, keys: string[], index = 0): ExpandedState => {
  const key = keys[index];
  const isLastKey = index === keys.length - 1;

  const currentState = state[key] || { expanded: false };
  if (isLastKey) {
    const isCurrentlyExpanded = currentState.expanded;
    const newNode: ExpandedStateNode = {
      ...currentState,
      expanded: !isCurrentlyExpanded,
    };

    if (!newNode.expanded) {
      newNode.children = {};
    }

    return {
      ...state,
      [key]: newNode,
    };
  } else {
    const updatedChildState = updateExpandedState(currentState.children || {}, keys, index + 1);

    return {
      ...state,
      [key]: {
        ...currentState,
        children: updatedChildState,
      },
    };
  }
};


export const collapseDescendants = (state: ExpandedState, keys: string[]) => {
  let currentState = state;

  keys.forEach((key, index) => {
    if (currentState[key]) {
      currentState = currentState[key].children || {};
      if (index === keys.length - 1) {
        currentState = {}; // Очищаем потомков, если узел сворачивается
      }
    }
  });
};

export const getIsExpanded = (state: ExpandedState, keys: string[]): boolean => {
  let currentLevel: ExpandedStateNode | undefined = state[keys[0]];
  for (let i = 1; i < keys.length; i++) {
    if (!currentLevel || !currentLevel.expanded || !currentLevel.children) {
      return false;
    }
    currentLevel = currentLevel.children[keys[i]];
  }

  return currentLevel?.expanded || false;
};

export const getVisibleColumns = (expandedState: ExpandedState): string[] => {
  const columns = ['Article'];
  if (Object.values(expandedState).some((articleState) => articleState.expanded)) {
    columns.push('Region');
  }
  if (
    Object.values(expandedState).some(
      (articleState) =>
        articleState.expanded &&
        Object.values(articleState.children || {}).some((regionState) => regionState.expanded)
    )
  ) {
    columns.push('LegalEntity');
  }
  if (
    Object.values(expandedState).some(
      (articleState) =>
        articleState.expanded &&
        Object.values(articleState.children || {}).some((regionState) =>
          Object.values(regionState.children || {}).some((entityState) => entityState.expanded)
        )
    )
  ) {
    columns.push('Version', 'Currency', 'Measure', 'Value');
  }

  return columns;
};
