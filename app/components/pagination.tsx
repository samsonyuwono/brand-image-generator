import React from "react";
import { Button, IconButton } from '../test'
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function DefaultPagination({ index = 1, total = 10, setIndex }: any) {

  const getItemProps = (i: number | undefined) =>
    ({
      variant: index === i ? "filled" : "text",
      color: index === i ? "blue" : "blue-gray",
      onClick: () => setIndex(i),
    } as any);

  const next = () => {
    if (index === total) return;

    setIndex(index + 1);
  };

  const prev = () => {
    if (index === 1) return;

    setIndex(index - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={index === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <IconButton key={i} {...getItemProps(i + 1)}>
            {i + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={next}
        disabled={index === total}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default DefaultPagination;
