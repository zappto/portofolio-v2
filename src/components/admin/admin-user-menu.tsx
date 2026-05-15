"use client";

import { LogOut, UserRound } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AdminUserMenuProps = {
  email?: string | null;
};

export function AdminUserMenu({ email }: AdminUserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <UserRound data-icon="inline-start" aria-hidden="true" />
          Admin
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <span className="block text-xs text-muted-foreground">Signed in as</span>
          <span className="block truncate text-sm text-foreground">
            {email ?? "Admin user"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <form action={logoutAction} className="w-full">
              <button type="submit" className="flex w-full items-center gap-2">
                <LogOut aria-hidden="true" />
                Logout
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
