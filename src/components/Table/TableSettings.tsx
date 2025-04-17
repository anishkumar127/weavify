import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { ArrowLeftRegular, ArrowRightRegular, ReOrderDotsVerticalRegular } from '@fluentui/react-icons';
import { Checkbox } from '@mui/material';
import { useEffect } from 'react';
import { Label } from 'weavify';
import DraggableRow from './DraggableRow';
import { TableSettingsProps } from './types';

function TableSettings<TData>({
  columns,
  columnOrder,
  setColumnOrder,
  columnVisibility,
  setColumnVisibility,
  columnPinning,
  setColumnPinning,
  settingsRef,
  showSettings,
  setShowSettings,
  colors,
}: TableSettingsProps<TData>) {
  // Reset the column order to initial
  const handleResetOrder = () => {
    setColumnOrder(columns?.map((col) => String(col?.accessorKey)));
  };

  // Show all columns
  const handleShowAll = () => {
    setColumnVisibility(
      columns.reduce(
        (acc, col) => {
          const key = String(col?.accessorKey);
          acc[key] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
    );
  };

  // Unpin everything
  const handleUnpinAll = () => {
    setColumnPinning({ left: [], right: [] });
  };

  // DnD reorder logic
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = columnOrder.indexOf(String(active.id));
    const newIndex = columnOrder.indexOf(String(over.id));
    setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
  };

  // Pin left
  const handlePinLeft = (key: string) => {
    setColumnPinning((prev) => ({
      left: [...(prev.left ?? []), key],
      right: (prev.right ?? []).filter((k) => k !== key),
    }));
  };

  // Pin right
  const handlePinRight = (key: string) => {
    setColumnPinning((prev) => ({
      ...prev,
      right: [...new Set([...prev.right, key])],
      left: prev.left.filter((k) => k !== key),
    }));
  };

  // Unpin a single column
  const handleUnpin = (key: string) => {
    setColumnPinning((prev) => ({
      left: prev.left.filter((k) => k !== key),
      right: prev.right.filter((k) => k !== key),
    }));
  };

  // Check if pinned
  const isPinned = (key: string) => {
    if (columnPinning.left.includes(key)) return 'left';
    if (columnPinning.right.includes(key)) return 'right';
    return null;
  };

  // Close settings if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings, settingsRef, setShowSettings]);

  if (!showSettings) return null;

  return (
    <div className="absolute right-0 top-5 z-50 w-[320px] rounded-md border border-gray-200 bg-white shadow-xl">
      <div className="flex justify-between border-b border-gray-200 px-4 py-3 text-sm text-gray-600">
        <span className="cursor-pointer font-semibold" onClick={handleResetOrder}>
          Reset Order
        </span>
        <span
          className={`cursor-pointer font-semibold ${
            Object.values(columnVisibility).every((v) => v) ? 'cursor-not-allowed text-gray-400' : ''
          }`}
          onClick={Object.values(columnVisibility).every((v) => v) ? undefined : handleShowAll}
        >
          Show All
        </span>
        <span className="cursor-pointer font-semibold" onClick={handleUnpinAll}>
          Unpin All
        </span>
      </div>

      <div className="max-h-[400px] overflow-x-auto px-4 py-1 pb-2">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={columnOrder} strategy={verticalListSortingStrategy}>
            {columnOrder.map((accessorKey) => {
              {
                /* const column = columns.find((col) => String(col.accessorKey) === accessorKey); */
              }

              const column = columns.find((col) => (col as any).accessorKey === accessorKey);
              if (!column) return null;

              return (
                <div key={accessorKey} className="flex h-8 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DraggableRow id={accessorKey}>
                      <ReOrderDotsVerticalRegular
                        // style={{ color: 'var(--tableHeaderColor)' }}
                        className={`inline-block cursor-grab text-xl !text-[${colors?.tableIconColor}] ${colors?.tableIcon}`}
                      />
                    </DraggableRow>

                    <Checkbox
                      className="!p-0"
                      checked={columnVisibility[accessorKey] !== false}
                      onChange={(e) =>
                        setColumnVisibility((prev) => ({
                          ...prev,
                          [accessorKey]: e.target.checked,
                        }))
                      }
                    />
                    <Label htmlFor="abc" label={String(column.header)} />
                  </div>

                  <div className="flex gap-3">
                    {isPinned(accessorKey) === 'left' ? (
                      <span onClick={() => handleUnpin(accessorKey)} className="cursor-pointer text-blue-600">
                        Unpin
                      </span>
                    ) : isPinned(accessorKey) === 'right' ? (
                      <span onClick={() => handleUnpin(accessorKey)} className="cursor-pointer text-blue-600">
                        Unpin
                      </span>
                    ) : (
                      <>
                        <ArrowLeftRegular
                          className={`cursor-pointer !text-[${colors?.tableIconColor}] ${colors?.tableIcon}`}
                          onClick={() => handlePinLeft(accessorKey)}
                        />
                        <ArrowRightRegular
                          className={`cursor-pointer !text-[${colors?.tableIconColor}] ${colors?.tableIcon}`}
                          onClick={() => handlePinRight(accessorKey)}
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default TableSettings;
