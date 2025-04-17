import {
  AddFilled,
  ArrowDownFilled,
  ArrowSortFilled,
  ArrowUpFilled,
  ChevronLeftRegular,
  ChevronRightRegular,
  SettingsRegular,
  SubtractFilled,
} from '@fluentui/react-icons';
import { Checkbox } from '@mui/material';
import {
  ColumnFiltersState,
  ColumnPinningState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineFileExcel } from 'react-icons/ai';
import { Button, Input } from 'weavify';

import { Select } from '@/common/components';
import TableFilter from './TableFilter';

import TableSettings from './TableSettings';
import { TableProps } from './types';
import { cn } from '@/utils/utils';
// const TableSettings = lazy(() => import('./TableSettings'));
const Table = <TData extends object = any>({
  data,
  columns,
  globalSearch = true,
  enableResizing = true,
  enableRowSelection = true,
  rowSelectionChange,
  onClickRow,
  enableChildren = false,
  enableLocalStorage = true,
  localStorageKey = 'db_store',
  enableDownloadExcel = false,
  isColorCodding = false,
  excelFileName = 'Data',
  colors,
  classes,
  exportOptions,
  toolbarContent,
}: TableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [columnSizing, setColumnSizing] = useState({});
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(columns.map((col) => [String(col.accessorKey), true])) || {},
  );
  const [columnOrder, setColumnOrder] = useState(columns.map((col) => String(col.accessorKey)));
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const settingsRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      rowSelection,
      columnSizing,
      columnVisibility,
      columnOrder,
      columnPinning,
      expanded,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnSizingChange: setColumnSizing,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onExpandedChange: setExpanded,
    getSubRows: (originalRow) => (originalRow as any).children,
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    columnResizeMode: enableResizing ? 'onChange' : undefined,
  });

  const [hasLoaded, setHasLoaded] = useState(false);

  // Handle row selection changes
  useEffect(() => {
    if (enableRowSelection && rowSelectionChange) {
      const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);
      rowSelectionChange(selectedRows);
    }
  }, [enableRowSelection, rowSelection, rowSelectionChange, table]);

  // Retrieve local storage state (if enabled)
  useEffect(() => {
    if (!enableLocalStorage) return;
    const lsData = localStorage.getItem(localStorageKey);
    if (lsData) {
      try {
        const parsedData = JSON.parse(lsData);
        if (parsedData.columnSizing) setColumnSizing(parsedData.columnSizing);
        if (parsedData.columnOrder) setColumnOrder(parsedData.columnOrder);
        if (parsedData.columnVisibility) setColumnVisibility(parsedData.columnVisibility);
        if (parsedData.columnPinning) setColumnPinning(parsedData.columnPinning);
      } catch (err) {
        console.error('Error parsing local storage data:', err);
      }
    }
    setHasLoaded(true);
  }, [enableLocalStorage, localStorageKey]);

  // Update local storage whenever state changes (if enabled)
  useEffect(() => {
    if (!enableLocalStorage || !hasLoaded) return;
    const tableState = {
      columnSizing,
      columnOrder,
      columnVisibility,
      columnPinning,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(tableState));
  }, [enableLocalStorage, localStorageKey, columnSizing, columnOrder, columnVisibility, columnPinning, hasLoaded]);

  // Export to CSV
  const exportToCSV = () => {
    if (!enableDownloadExcel) return;
    const { excludeColumns = [] } = exportOptions || {};
    const rows = table.getFilteredRowModel().rows;
    const leafColumns = table.getAllLeafColumns();
    const includedColumns = leafColumns.filter(
      (col) => col.getIsVisible() && !excludeColumns.includes(String(col.accessorKey)),
    );
    const headers = includedColumns.map((col) => String(col.columnDef.header));

    const csvRows = rows.map((row) =>
      row
        .getVisibleCells()
        .filter((cell) => includedColumns.includes(cell.column))
        .map((cell) => `"${String(cell.getValue() ?? '')}"`),
    );

    const csvContent = [headers.join(','), ...csvRows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${excelFileName}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid w-full">
      {/* Global Search & Settings */}
      <div className={cn(['mb-1 flex items-center justify-between pr-2', classes?.toolbarClass])}>
        {toolbarContent && (typeof toolbarContent === 'function' ? toolbarContent(table) : toolbarContent)}{' '}
        {globalSearch && (
          <Input
            label="Title"
            id="title"
            type="text"
            required={false}
            isLabelRequired={false}
            inputStyle="mb-4 !w-[300px] !bg-white !rounded-none"
            sx={{
              '.MuiOutlinedInput-root': {
                borderRadius: '2px',
              },
            }}
            wrapperStyle="!rounded-none"
            placeholder="Search..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        )}
        <div className="relative flex items-center justify-center gap-3" ref={settingsRef}>
          {enableDownloadExcel && (
            <AiOutlineFileExcel
              className={`cursor-pointer text-xl !text-[${colors?.tableIconColor}] ${colors?.tableIcon}`}
              style={{ color: 'var(--tableHeaderColor)' }}
              onClick={exportToCSV}
            />
          )}
          <SettingsRegular
            className={`cursor-pointer text-xl !text-[${colors?.tableIconColor}] ${colors?.tableIcon}`}
            style={{ color: 'var(--tableHeaderColor)' }}
            onClick={() => setShowSettings(!showSettings)}
          />
          <TableSettings
            columns={columns}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            columnPinning={columnPinning}
            setColumnPinning={setColumnPinning}
            settingsRef={settingsRef}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            colors={colors}
          />
        </div>
      </div>

      {/* Table */}
      <div className={cn(['max-h-[450px] min-h-[450px] w-full overflow-auto', classes?.tableWrapperClass])}>
        <table className="w-full table-fixed text-sm font-normal">
          <thead
            className={`sticky top-0 z-10 !bg-[${colors?.tableHeaderBGColor}] ${colors?.tableHeader}`}
            style={{
              backgroundClip: 'padding-box',
              backdropFilter: 'blur(1000px)',
              backgroundColor: colors?.tableHeaderBGColor,
              color: `${colors?.tableHeaderColor}`,
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th key={header.id} className="border-b text-left" style={{ width: header.column.getSize() }}>
                    <div
                      className={`flex h-full w-full justify-between !text-[${colors?.tableHeaderColor}] ${colors?.tableHeader}`}
                    >
                      <div className="flex w-full flex-col p-1">
                        <div className="flex items-center justify-between gap-2 px-2 py-1">
                          {/* Row selection checkbox in header */}
                          {index === 0 && enableRowSelection && (
                            <Checkbox
                              className="!p-0"
                              indeterminate={table.getIsSomeRowsSelected()}
                              onChange={table.getToggleAllRowsSelectedHandler()}
                              checked={table.getIsAllRowsSelected()}
                            />
                          )}
                          {/* Expand All */}
                          {index === 0 && enableChildren && (
                            <Button
                              className="!h-4 !w-4 !p-0.5"
                              size="small"
                              onClick={table.getToggleAllRowsExpandedHandler()}
                            >
                              {table.getIsAllRowsExpanded() ? (
                                <SubtractFilled
                                  style={{ color: 'var(--tableHeaderColor)' }}
                                  className="h-[12px] w-[12px]"
                                />
                              ) : (
                                <AddFilled style={{ color: 'var(--tableHeaderColor)' }} className="h-[12px] w-[12px]" />
                              )}
                            </Button>
                          )}

                          {/* Sorting */}
                          <div
                            className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 font-semibold"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                              {header.isPlaceholder
                                ? null
                                : header.column.columnDef.header && header.column.columnDef.header.toString()}
                            </span>
                            {header.column.getCanSort() && (
                              <>
                                {header.column.getIsSorted() === 'asc' ? (
                                  <ArrowUpFilled className="text-sm !text-black" />
                                ) : header.column.getIsSorted() === 'desc' ? (
                                  <ArrowDownFilled className="text-sm !text-black" />
                                ) : (
                                  <ArrowSortFilled className="text-sm !text-black" />
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {/* Column filter */}
                        {header.column.getCanFilter() && <TableFilter column={header.column} />}
                      </div>

                      {/* Resize handle */}
                      {enableResizing && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className="relative w-[1px] flex-grow cursor-ew-resize bg-transparent hover:border-l hover:border-gray-500"
                        >
                          <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 cursor-ew-resize" />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getAllLeafColumns().length} className="py-6 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, idx: number) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-300 hover:bg-gray-100 ${
                    idx % 2 !== 0 ? `bg-[${colors?.tableEvenOddColor}]` : ''
                  } ${onClickRow ? 'cursor-pointer' : ''}`}
                  onClick={() => onClickRow?.(row)}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td key={cell.id} className="p-3">
                      <div
                        className={`${isColorCodding ? ((cell.getValue() as string) === 'High' ? 'text-yellow-700' : (cell.getValue() as string) === 'Urgent' ? 'text-red-600' : '') : ''} flex items-center gap-2`}
                        style={{
                          paddingLeft: `${row.depth * 1.5}rem`,
                        }}
                      >
                        {index === 0 && enableRowSelection && (
                          <Checkbox
                            className="!p-0"
                            checked={row.getIsSelected()}
                            indeterminate={row.getIsSomeSelected()}
                            onChange={row.getToggleSelectedHandler()}
                            disabled={!row.getCanSelect()}
                          />
                        )}
                        {row.getCanExpand() && index === 0 && enableChildren && (
                          <Button className="!h-4 !w-4 !p-0.5" size="small" onClick={row.getToggleExpandedHandler()}>
                            {row.getIsExpanded() ? '-' : '+'}
                          </Button>
                        )}
                        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-2 text-sm">
        <div className="mb-4 sm:mb-0">
          <span className="mr-2">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center">
            <span className="mr-2 font-semibold text-[#333]">Show Entries:</span>
            <Select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e?.target?.value))}
              options={[10, 25, 50, 100, 500].map((pageSize) => ({
                label: String(pageSize),
                value: pageSize,
              }))}
            />
          </div>
          <div className="flex items-center gap-1">
            <ChevronLeftRegular
              onClick={() => {
                if (table.getCanPreviousPage()) table.previousPage();
              }}
              className="cursor-pointer !text-xl"
            />
            <span className="flex items-center bg-[#ddd] px-[10px] py-[4px]">
              {table.getState().pagination.pageIndex + 1}
            </span>
            <ChevronRightRegular
              onClick={() => {
                if (table.getCanNextPage()) table.nextPage();
              }}
              className="cursor-pointer !text-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
