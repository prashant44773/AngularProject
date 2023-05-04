import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ASSIGN } from './assignmentmodel';
@Injectable()
export class AssignmentService {
  readonly rootUrl = 'https://localhost:44385/api/UserAssignment/';
  constructor(private http: HttpClient) { }
  GetAssign(){
    return this.http.get(this.rootUrl + 'Get');
  }  
  AssignUpdate(Assigndata: ASSIGN){
    const body: ASSIGN = {

      intUserAssignmentID: Assigndata.intUserAssignmentID,
      intUserID: Assigndata.intUserID,
      strUserName: Assigndata.strUserName,
      intAreaID: Assigndata.intAreaID,
      strAreaName: Assigndata.strAreaName,
      intLotID: Assigndata.intLotID,
      intParkingLotID: Assigndata.intParkingLotID,
      strParkingLotName: Assigndata.strParkingLotName,
      strAreaNames: Assigndata.strAreaNames,
      strAreaIDs: Assigndata.strAreaIDs,
      strLotIDs: Assigndata.strLotIDs,
      strParkingLotNames: Assigndata.strParkingLotNames,
      intCreatedBy: Assigndata.intCreatedBy,
      intModifiedBy: Assigndata.intModifiedBy,
      dteModifiedOn: Assigndata.dteModifiedOn,
      dteCreatedOn: Assigndata.dteCreatedOn,
      bActive: Assigndata.bActive,
      bDeleted: Assigndata.bDeleted,

    }
    return this.http.post(this.rootUrl + 'Edit', body);
  }

  AssignDelete(Assigndata: ASSIGN){
    const body: ASSIGN = {
      intUserAssignmentID: Assigndata.intUserAssignmentID,
      intUserID: Assigndata.intUserID,
      strUserName: Assigndata.strUserName,
      intAreaID: Assigndata.intAreaID,
      strAreaName: Assigndata.strAreaName,
      intLotID: Assigndata.intLotID,
      intParkingLotID: Assigndata.intParkingLotID,
      strParkingLotName: Assigndata.strParkingLotName,
      strAreaNames: Assigndata.strAreaNames,
      strAreaIDs: Assigndata.strAreaIDs,
      strLotIDs: Assigndata.strLotIDs,
      strParkingLotNames: Assigndata.strParkingLotNames,
      intCreatedBy: Assigndata.intCreatedBy,
      intModifiedBy: Assigndata.intModifiedBy,
      dteModifiedOn: Assigndata.dteModifiedOn,
      dteCreatedOn: Assigndata.dteCreatedOn,
      bActive: Assigndata.bActive,
      bDeleted: Assigndata.bDeleted,
    }
    return this.http.post(this.rootUrl + 'Delete', body);
  }
  AssignStatus(Assigndata: ASSIGN){
    const body: ASSIGN = {
      intUserAssignmentID: Assigndata.intUserAssignmentID,
      intUserID: Assigndata.intUserID,
      strUserName: Assigndata.strUserName,
      intAreaID: Assigndata.intAreaID,
      strAreaName: Assigndata.strAreaName,
      intLotID: Assigndata.intLotID,
      intParkingLotID: Assigndata.intParkingLotID,
      strParkingLotName: Assigndata.strParkingLotName,
      strAreaNames: Assigndata.strAreaNames,
      strAreaIDs: Assigndata.strAreaIDs,
      strLotIDs: Assigndata.strLotIDs,
      strParkingLotNames: Assigndata.strParkingLotNames,
      intCreatedBy: Assigndata.intCreatedBy,
      intModifiedBy: Assigndata.intModifiedBy,
      dteModifiedOn: Assigndata.dteModifiedOn,
      dteCreatedOn: Assigndata.dteCreatedOn,
      bActive: Assigndata.bActive,
      bDeleted: Assigndata.bDeleted,
    }
    return this.http.post(this.rootUrl + 'Activate', body);
  }

  GetAdmin(){
    return this.http.get('https://localhost:44385/api/UserAssignment/GetAdminUsers');
  } 
}
