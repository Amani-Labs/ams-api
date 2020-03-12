export interface IloginData {
  email: string;
  password: string;
}

export interface Iuser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  gender: string;
  profilePic: string;
  roleId?: number;
  institutionId?: number;
}
