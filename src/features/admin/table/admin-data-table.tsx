"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export type AdminTableRow = {
  id: string;
  title: string;
  module: string;
  status: string;
  owner: string;
  updatedAt: string;
};

type AdminDataTableProps = {
  rows: AdminTableRow[];
};

const pageSize = 6;

export function AdminDataTable({ rows }: AdminDataTableProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const statuses = useMemo(
    () => Array.from(new Set(rows.map((row) => row.status))),
    [rows],
  );
  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rows
      .filter((row) => {
        const matchesQuery =
          !normalizedQuery ||
          row.title.toLowerCase().includes(normalizedQuery) ||
          row.module.toLowerCase().includes(normalizedQuery);
        const matchesStatus = status === "all" || row.status === status;

        return matchesQuery && matchesStatus;
      })
      .sort((first, second) => {
        const firstTime = new Date(first.updatedAt).getTime();
        const secondTime = new Date(second.updatedAt).getTime();
        return sortDirection === "desc"
          ? secondTime - firstTime
          : firstTime - secondTime;
      });
  }, [query, rows, sortDirection, status]);
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const visibleRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  function toggleRow(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <section className="portfolio-card overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl">Admin table pattern</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search, filter, sort, pagination, row actions, and optional bulk selection.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-[1fr_auto] lg:w-[34rem]">
          <label className="relative block">
            <span className="sr-only">Search content</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search content…"
              className="h-10 pl-9"
            />
          </label>
          <select
            aria-label="Filter by status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="all">All status</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead className="bg-muted/45 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="w-12 px-4 py-3">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Module</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() =>
                    setSortDirection((current) =>
                      current === "desc" ? "asc" : "desc",
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  Updated
                  <ArrowUpDown aria-hidden="true" />
                </button>
              </th>
              <th className="w-16 px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleRows.length ? (
              visibleRows.map((row) => (
                <tr key={row.id} className="bg-card">
                  <td className="px-4 py-3">
                    <label className="grid size-5 place-items-center">
                      <span className="sr-only">Select {row.title}</span>
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="size-4 accent-primary"
                      />
                    </label>
                  </td>
                  <td className="max-w-[18rem] px-4 py-3 font-medium">
                    <span className="block truncate">{row.title}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.module}</td>
                  <td className="px-4 py-3">
                    <Badge variant={row.status === "published" ? "default" : "secondary"}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.owner}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(row.updatedAt))}
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label={`Open actions for ${row.title}`}>
                          <MoreHorizontal aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Preview</DropdownMenuItem>
                          <DropdownMenuItem>Edit draft</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  No content matches this table state.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {selected.length} selected / {filteredRows.length} results
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" size="sm" disabled={!selected.length}>
            Archive Selected
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            <ChevronLeft aria-hidden="true" />
            Previous
          </Button>
          <span className="font-mono text-sm tabular-nums">
            {page} / {pageCount}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page === pageCount}
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          >
            Next
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
