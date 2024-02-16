import { type User } from "lucia";
import React from "react";

type UserListerProps = {
  users: User[];
  roleSpecific?: User["role"];
};

const UserLister = ({ users, roleSpecific }: UserListerProps) => {
  if (!users || users.length === 0) {
    if (roleSpecific) {
      return <span>No accounts with role {roleSpecific}</span>;
    }
    return <span>No users found</span>;
  }

  return (
    <div className="flex w-full flex-col">
      {users.map((user, idx) => (
        <div
          key={`${user.id}-${idx}`}
          className="flex w-full flex-col gap-2 border-b-2 border-neutral-100 px-2 py-2 first:border-t-2"
        >
          <div className="flex gap-2 text-sm">
            <strong>Username</strong>
            <span className="max-w-28 text-ellipsis whitespace-nowrap">
              {user.username}
            </span>
          </div>
          <div className="flex gap-2 text-sm">
            <strong>Firstname</strong>
            <span className="max-w-28 text-ellipsis whitespace-nowrap">
              {user.firstname}
            </span>
          </div>
          <div className="flex gap-2 text-sm">
            <strong>Lastname</strong>
            <span className="max-w-28 text-ellipsis whitespace-nowrap">
              {user.lastname}
            </span>
          </div>
          <div data-intent="actions" className="flex gap-4 px-2 pt-2">
            <button className="text-sm text-neutral-100 hover:text-neutral-300">
              Edit
            </button>
            <button className="text-sm text-neutral-100 hover:text-neutral-300">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLister;
