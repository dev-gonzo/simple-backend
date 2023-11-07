export type PropsPermission = {
  id?: number;
  key: string;
  active: boolean;
};

export type PropsAccessGroup = {
  id?: number;
  name: string;
  active: boolean;
};

export type PropsAccessGroupPermissions = {
  id?: number;
  accessGroupId: string;
  permissionsId: boolean;
};
