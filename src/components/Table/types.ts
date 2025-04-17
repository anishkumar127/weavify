import { ColumnDef, ColumnOrderState, ColumnPinningState, useReactTable, VisibilityState } from '@tanstack/react-table';
import React, { Dispatch, SetStateAction } from 'react';

export interface ExportOptions {
  excludeColumns?: string[];
}

export interface CustomColumnMeta<TData = unknown> {
  searchPlaceholder?: string;
  filterVariant?: false | 'range' | 'select';
}

export interface TableSettingsProps<TData> {
  columns: ColumnDef<TData>[];
  columnOrder: ColumnOrderState;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  columnPinning: ColumnPinningState;
  setColumnPinning: Dispatch<SetStateAction<ColumnPinningState>>;
  settingsRef: React.RefObject<HTMLDivElement>;
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
  colors: {
    tableIconColor: string;
    tableHeaderBGColor: string;
    tableHeaderColor: string;
    tableEvenOddColor: string;
    tableIcon: string;
    tableHeader: string;
  };
}

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  loading?: boolean;
  globalSearch?: boolean;
  enableResizing?: boolean;
  enableRowSelection?: boolean;
  rowSelectionChange?: (selectedRows: TData[]) => void;
  enableChildren?: boolean;
  onClickRow?: (row: any) => void;
  enableLocalStorage?: boolean;
  isColorCodding?: boolean;
  localStorageKey?: string;
  exportOptions?: ExportOptions;
  enableDownloadExcel?: boolean;
  excelFileName?: string;
  colors: {
    tableIconColor: string;
    tableHeaderBGColor: string;
    tableHeaderColor: string;
    tableEvenOddColor: string;
    tableIcon: string;
    tableHeader: string;
  };
  classes: {
    tableWrapperClass: string;
    toolbarClass: string;
  };
  toolbarContent?: React.ReactNode | ((table: ReturnType<typeof useReactTable<TData>>) => React.ReactNode);
}
