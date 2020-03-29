export interface IloginData {
  email: string;
  password: string;
}

export interface Iuser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  gender: string;
  verified: boolean;
  profilePic: string;
  roleId?: number;
  institutionId?: number;
}
export interface Token {
  token: string;
}
