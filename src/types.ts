export type Tutorial = {
  ID: number;
  tutorialCode: string;
  module: Module;
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
  modules: string[];
  tutorials: Tutorial[];
}

export interface TeachingAssistant extends User {
  tutorial: Tutorial;
}
