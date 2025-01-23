export namespace ApiRequestModel {
  export namespace Payload {
    export interface GetToken {}

    export interface Login {
      mobileNumber: string;
      password: string;
      device_id: string;
      device_type: string;
    }

    export interface Logout {}
  }
}
