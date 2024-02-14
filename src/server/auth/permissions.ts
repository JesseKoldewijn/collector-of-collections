import { type UserRole } from "../db/schema/users";

/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

type Permissions = {
  [resource: string]: {
    [action: string]: Array<UserRole>;
  };
}[];

const permissions: Permissions = [
  {
    users: {
      canReadAll: ["admin"],
    },
  },
];

export const getPermissionsByRole = (role: UserRole) => {
  return permissions
    .map((perm) => {
      const newPerm: {
        [resource: string]: {
          [action: string]: boolean;
        };
      } = {};
      for (const resource in perm) {
        const actions = perm[resource as keyof typeof perm];
        const newActions: {
          [action: string]: boolean;
        } = {};
        for (const action in actions) {
          const roles = actions[action as keyof typeof actions];

          if (roles?.includes(role)) {
            newActions[action] = true;
          }
        }
        newPerm[resource] = newActions;
      }
      return newPerm;
    })
    .flat();
};

