export namespace ApiResponseModel {
  export namespace Login {
    export interface UserData {
      id: number;
      username: string;
      email: string;
      mobile_number: string;
      first_name: string;
      last_name: string;
      role: string;
      gender: string;
      grade: {
          id: number;
          name: string;
      };
      dob: string;
      section: string;
      total_gems: number;
      rank: number;
      daily_challenge: boolean;
      qualification: string | null;
      is_superteacher: boolean | null;
      institute: string | null;
      photo: string | null;
      avatar: string;
      thumbnail: string;
      has_completed_profile: boolean;
      status: string;
      is_active: boolean;
      is_deleted: boolean;
      badge: string;
  }
    export interface LoginData {
      access: string;
      refresh: string;
      user: UserData;
    }
    export interface Response {
      // Based on Error in Response
      error: {} | undefined;
      data: {
        data: LoginData;
      };
      // Based on success in Response
      success: number;
    }
  }

  export namespace Logout {
    export interface LogoutData {
      message: string;
    }

    export interface Response {
      error: {} | undefined;
      data: {
        data: LogoutData;
      };
      success: number;
    }
  }

}
