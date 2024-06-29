import { Button } from "@nextui-org/react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Countdown from "../../components/attendance/Countdown";
import { Attendance, AttendanceString } from "../../types";
import { getRemainingSeconds } from "../../util/util";
import AttendanceDisplay from "../../components/attendance/AttendanceDisplay";
import LoadingSpinner from "../../components/LoadingSpinner";
import StudentTodayAttendance from "../../components/attendance/StudentTodayAttendance";
import { isUserStudent } from "../../util/user";
import TATodayAttendance from "../../components/attendance/TATodayAttendance";

const AttendancePage = () => {
  const { state } = useAuthContext();
  const isStudent = isUserStudent(state.user);
  return isStudent ? <StudentTodayAttendance /> : <TATodayAttendance />;
};

export default AttendancePage;
