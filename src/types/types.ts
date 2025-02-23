export enum CarTypes {
    MICRO = "MICRO",
    MINI = "MINI",
    SEDAN = "SEDAN",
    SUV = "SUV",
  }
  
  export enum Approval {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    COMPLETED = "COMPLETED",
  }
  
  export enum Status {
    RESOLVED = "RESOLVED",
    PENDING = "PENDING",
  }
  
  export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
  }
  
  export interface Images {
    id: string;
    url: string;
    carDataId?: string | null;
    travelPackagesId?: string | null;
  }
  
  export interface User {
    id: string;
    mobile: string;
    password: string;
    userDataId?: string | null;
    profileCompletionStatus: boolean;
    data?: UserData | null;
  }
  
  export interface UserData {
    id: string;
    name?: string | null;
    email?: string | null;
    dob?: string | null;
    gender?: Gender | null;
    address?: string | null;
    emailVerificationStatus: boolean;
    cabEnquiries: CarEnquiry[];
    packageEnquiries: TravelPackageEnquiry[];
    bookings: Booking[];
    createdAt: Date;
    updatedAt: Date;
    users?: User | null;
  }
  
  export interface TravelPackage {
    id: string;
    name: string;
    description: string;
    price: number;
    subDescription: string;
    mealIncluded: boolean;
    departureTime: string;
    departureDesc: string;
    returnTime: string;
    returnDesc: string;
    images: Images[];
    details: TourContent[];
    createdAt: Date;
    updatedAt: Date;
    enquires: TravelPackageEnquiry[];
    bookings: Booking[];
  }
  
  export interface TourContent {
    id: string;
    name: string;
    description?: string | null;
    travelPackagesId?: string | null;
  }
  
  export interface CarData {
    id: string;
    name: string;
    type: CarTypes;
    ac: boolean;
    price: number;
    seats: number;
    images: Images[];
    description: string;
  }
  
  export interface CarEnquiry {
    id: string;
    carType: CarTypes;
    from: string;
    to: string;
    date: Date;
    seats: number;
    userDataId?: string | null;
    userData?: UserData | null;
    status: Status;
  }
  
  export interface TravelPackageEnquiry {
    id: string;
    totalPeople: number;
    query: string;
    userDataId?: string | null;
    userData?: UserData | null;
    travelPackagesId?: string | null;
    travelPackages?: TravelPackage | null;
    createdAt: Date;
    status: Status;
  }
  
  export interface Booking {
    id: string;
    carBoooking: boolean;
    packageBooking: boolean;
    seats?: number | null;
    carType?: CarTypes | null;
    bookingTime: Date;
    userDataId?: string | null;
    userData?: UserData | null;
    status: Approval;
    createdAt: Date;
    travelPackagesId?: string | null;
    travelPackages?: TravelPackage | null;
  }
  