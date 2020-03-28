export interface Irequest {
  requestType: string;
  assetTypeId: number;
  status: string;
  numberOfItems: number;
  requesterId: number;
  approvedBy: number;
  requestedTo: number;
  requesterReason: string;
  adminComment: string;
  superAdminComment: string;
}

export interface IrequestInput {
  requestType: string;
  assetTypeName: number;
  assignedAdmins: Array<object>;
  numberOfItems: number;
  requestedTo: number;
  Reason?: string;
  adminComment?: string;
  superAdminComment?: string;
}
