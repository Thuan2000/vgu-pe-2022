import React from "react";
import DownVIcon from "@assets/icons/down-v-icon";
import { COLORS } from "@utils/colors";
import Button from "./storybook/button";

interface IPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalCount: number;
  limit: number;
  activeIdx: number;
  fullWidth?: boolean;
  align?: "start" | "center" | "end" | "between";
  displayPageAmount: number;
  /**
   * In tailwind e.g gray-100, etc
   */
  color: string;
  /**
   * In tailwind e.g gray-100, etc
   */
  activeColor: string;
  onChangePage: (idx: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  className,
  totalCount,
  limit,
  activeIdx = 1,
  displayPageAmount,
  color,
  activeColor,
  align = "start",
  onChangePage,
  ...props
}) => {
  function getShowLastLimit() {
    if (activeIdx <= 1) return 5;
    if (activeIdx <= 2) return 4;
    if (activeIdx <= 3) return 3;
    // if (activeIdx <= 4) return 2;
    // if (activeIdx <= 4) return 2;

    return 3;
  }

  // Safety control
  if (totalCount <= 0) totalCount = 1;

  const pagesNumber = Math.ceil(totalCount / limit);

  // Safety control
  if (displayPageAmount > pagesNumber) displayPageAmount = pagesNumber;

  // Used to show more
  const activeEndDelta = pagesNumber - activeIdx;
  const showLastIndexWithMore =
    activeEndDelta > Math.max(displayPageAmount - activeIdx, 3);

  function changePage(newPageIdx: number) {
    if (activeIdx === newPageIdx) return;
    // if (newPageIdx < 1 || newPageIdx > pagesNumber) return;

    onChangePage(newPageIdx);
  }

  function getSlicing() {
    const half = Math.ceil(displayPageAmount / 2);

    const start = Math.max(activeIdx - half, 0);
    const end = Math.min(start + displayPageAmount, pagesNumber);
    const delta = end - start;
    return {
      start:
        // Just don't touch this it's very hard to explain this lol
        !showLastIndexWithMore
          ? Math.max(start - (displayPageAmount + 2 - delta), 0)
          : start,
      end,
    };
  }

  const array = Array.from(new Array(pagesNumber).keys());

  const pagesDom = array
    .slice(getSlicing().start, getSlicing().end)
    .map((count) => {
      const isLast = count + 1 >= getSlicing().end;
      const isActive = count + 1 === activeIdx;
      return (
        <Button
          variant="custom"
          key={`pagination-number-count-${count}`}
          onClick={() => changePage(count + 1)}
          className={`border-2 text-${color} border-${color}
                      ${isActive && `text-${activeColor} border-${activeColor}`}
                    `}
        >
          {count + 1}
        </Button>
      );
    });

  return (
    <div {...props}>
      <div className={`fic space-x-4 justify-${align} mt-2 w-full px-4`}>
        <Button
          variant="custom"
          size="small"
          className={`border-2 !px-2 text-${color} border-${color}`}
          onClick={() => changePage(activeIdx - 1)}
          disabled={activeIdx - 1 < pagesNumber}
        >
          <DownVIcon className="rotate-90" fill={COLORS.GRAY[100]} />
        </Button>
        <div className="flex items-center">
          {pagesDom}
          {showLastIndexWithMore && (
            <>
              <Button
                variant="custom"
                // onClick={() => changePage(pagesNumber)}
                className={`border-2 radius-sm p-2 h-8 w-8 font-semibold text-${color} border-${color} flex-center rounded-sm ml-2`}
              >
                ...
              </Button>
              <Button
                variant="custom"
                onClick={() => changePage(pagesNumber)}
                className={`border-2 radius-sm p-2 h-8 w-8 font-semibold text-${color} border-${color} flex-center rounded-sm ml-2`}
              >
                {pagesNumber}
              </Button>
            </>
          )}
        </div>
        <Button
          variant="custom"
          size="small"
          className={`border-2 !px-2 text-${color} border-${color} mr-4`}
          onClick={() => changePage(activeIdx + 1)}
          disabled={activeIdx + 1 > pagesNumber}
        >
          <DownVIcon className="-rotate-90" fill={COLORS.GRAY[100]} />
        </Button>
      </div>
    </div>
  );
};
export default Pagination;
