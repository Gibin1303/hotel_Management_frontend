import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// const formatDate = (iso) =>
//   iso
//     ? new Intl.DateTimeFormat("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }).format(new Date(iso))
//     : "—";

const statusStyles = {
  ACTIVE:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900",
  INACTIVE: "bg-muted text-muted-foreground",
  PENDING:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
  SUSPENDED:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
};

export function OwnersTable({
  data = [],
  paginations,
  isLoading = false,
  onPageChange,
  onRowClick,
  columns,
}) {
  const { page = 1, limit = 10, total = 0, totalPages = 1 } = paginations ?? {};
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const checkData = (data) => {
    if (!data || data.length === 0) {
      return (
        <h1 className="text-red-600 font-extrabold text-md">
          No data available
        </h1>
      );
    }

    return data;
  };

  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.header}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3.5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3.5 w-20" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-3.5 w-20" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  No owners yet.
                </TableCell>
              </TableRow>
            )}

            {/* {!isLoading &&
              data.map((owner) => (
                <TableRow
                  key={owner._id}
                  onClick={() => onRowClick?.(owner)}
                  className={onRowClick ? "cursor-pointer" : undefined}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={owner.avatar ?? undefined}
                          alt={owner.name}
                        />
                        <AvatarFallback className="text-xs">
                          {initials(owner.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate font-medium">
                            {owner.name}
                          </span>
                          {owner.isVerified && (
                            <BadgeCheck
                              className="h-4 w-4 shrink-0 text-blue-500"
                              aria-label="Verified"
                            />
                          )}
                        </div>
                        <div className="truncate text-sm text-muted-foreground">
                          {owner.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {owner.phone ?? checkData(owner.phone)}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusStyles[owner.status] ?? ""}
                    >
                      {owner.status.charAt(0) +
                        owner.status.slice(1).toLowerCase()}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {owner.lastLogin
                      ? formatDate(owner.lastLogin)
                      : checkData(owner.lastLogin)}
                  </TableCell>

                  <TableCell className="text-right text-muted-foreground">
                    {formatDate(owner.createdAt)}
                  </TableCell>
                </TableRow>
              ))} */}

            {!isLoading &&
              data.map((row) => (
                <TableRow
                  key={row._id}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? "cursor-pointer" : undefined}
                >
                  {columns.map((column) => (
                    <TableCell key={column.header}>
                      {column.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {from}–{to} of {total}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isLoading}
              onClick={() => onPageChange?.(page - 1)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isLoading}
              onClick={() => onPageChange?.(page + 1)}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnersTable;
