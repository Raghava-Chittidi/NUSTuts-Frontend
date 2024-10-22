export type Tutorial = {
  ID: number;
  tutorialCode: string;
  module: string;
  teachingAssistant: TeachingAssistant;
  students: Student[];
};

export type FetchedTutorial = {
  lessonType: string;
  classNo: string;
  venue: string;
  day: string;
  startTime: string;
  endTime: string;
};

export type Request = {
  id: number;
  name: string;
  email: string;
};

export type Role = {
  userType: string;
  privilege: number;
};

export type Module = {
  code: string;
  name: string;
};

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Student extends User {
  // ID for Gorm
  ID: number;
  modules: string[];
  tutorials: Tutorial[];
}

export interface TeachingAssistant extends User {
  tutorial: Tutorial;
}

export type TutorialFile = {
  ID: number;
  filepath: string;
  name: string;
  tutorialId: number;
  visible: boolean;
  week: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
};

export type Message = {
  content: string;
  senderId: number;
  sender: string;
  roomId: number;
  userType: string;
  type: "other" | "self";
};

export type Consultation = {
  id: number;
  tutorial: Tutorial;
  student?: Student;
  teachingAssistant: TeachingAssistant;
  date: string;
  startTime: string;
  endTime: string;
  booked: boolean;
};

export type BookedConsultationsView = {
  date: string;
  consultations: Consultation[];
};

export type AttendanceString = {
  ID: number;
  code: string;
  tutorialId: number;
  expiresAt: string;
};

export type Attendance = {
  id: number;
  student: Student;
  tutorialId: number;
  date: string;
  present: boolean;
};

export type StudentAttendance = {
  ID: number;
  studentId: number;
  tutorialId: number;
  date: string;
  present: boolean;
};

export type AttendanceListsView = {
  date: string;
  attendance: Attendance[];
};

export type TutorialContextType = { tutorialId: number };
