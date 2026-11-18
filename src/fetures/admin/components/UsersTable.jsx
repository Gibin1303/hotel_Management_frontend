import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Heading1, MoreHorizontal, ShieldCheck, UserRound } from "lucide-react";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../AdminService/Adminservice";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

const UsersTable = ({ users = [], pagination }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modal, setModal] = useState(false);

  console.log(selectedUser, "user selettecd data");

  const { mutate: removeUser, isPending } = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["AdminUsers"],
      });
    },
  });
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Users</h2>

          <p className="text-sm text-slate-400">Manage platform users</p>
        </div>

        <Badge variant="outline" className="border-yellow-600 text-yellow-500">
          Total {users.length}
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400">User</TableHead>

              <TableHead className="text-slate-400">Role</TableHead>

              <TableHead className="text-slate-400">Status</TableHead>

              <TableHead className="text-slate-400">Verification</TableHead>

              <TableHead className="text-slate-400">Joined</TableHead>

              <TableHead className="text-right text-slate-400">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-slate-400"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user._id}
                  className="border-slate-800 transition hover:bg-slate-900"
                >
                  {/* User */}

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />

                        <AvatarFallback className="bg-slate-800 text-yellow-500">
                          {user.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium text-white">{user.name}</p>

                        <p className="text-sm text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="gap-1 border-yellow-600 text-yellow-500"
                    >
                      {user.role === "ADMIN" ? (
                        <ShieldCheck size={14} />
                      ) : (
                        <UserRound size={14} />
                      )}

                      {user.role}
                    </Badge>
                  </TableCell>

                  {/* Status */}

                  <TableCell>
                    <Badge
                      className={
                        user.status === "ACTIVE"
                          ? "bg-emerald-600 hover:bg-emerald-600"
                          : "bg-red-600 hover:bg-red-600"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>

                  {/* Verify */}

                  <TableCell>
                    {user.isVerified ? (
                      <Badge className="bg-blue-600 hover:bg-blue-600">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </TableCell>

                  {/* Date */}

                  <TableCell className="text-slate-300">
                    {format(new Date(user.createdAt), "dd MMM yyyy")}
                  </TableCell>

                  {/* Actions */}

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-slate-400 hover:text-white"
                        >
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="bg-white border-slate-800"
                      >
                        <DropdownMenuItem
                          onClick={() => navigate(`/profile/${user?._id}`)}
                        >
                          View Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                          Delete User
                        </DropdownMenuItem>

                        {/* <Dialog
                    open={!!selectedUser}
                    onOpenChange={() => setSelectedUser(user)}
                  > */}

                    

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-red-500">
                          Block User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>


            <Dialog
                          open={!!selectedUser}
                          onOpenChange={(open) => {
                            if (!open) {
                              setSelectedUser(null);
                            }
                          }}
                        >
                          <DialogContent>
                            <DialogHeader >
                              <DialogTitle className="text-red-400">Delete User</DialogTitle>
                            </DialogHeader>

                          <div className="w-full p-5 bg-gray-900">
                                <p className="text-white">
                                  Are you sure you want to delete{" "}
                                  <strong>{selectedUser?.name}</strong>?
                                </p>
                          </div>

                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setSelectedUser(null)}
                              >
                                Cancel
                              </Button>

                              <Button
                                variant="destructive"
                                onClick={() => {
                                  removeUser(selectedUser._id);
                                  setSelectedUser(null);
                                }}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

        <p className="text-white text-center text-sm p-2">
          {pagination?.page}/{pagination?.totalPages}
        </p>
      </div>
    </div>
  );
};

export default UsersTable;
