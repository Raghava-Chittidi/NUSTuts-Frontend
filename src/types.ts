export type Tutorial = {
  lessonType: string;
  classNo: string;
  venue: string;
  day: string;
  startTime: string;
  endTime: string;
};

export type Request = {
  id: number;
  student: {
    name: string;
    email: string;
  };
};

export type Student = {
  name: string;
  email: string;
  tutorials: Tutorial[];
};
