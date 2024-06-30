import { useAuthContext } from "../../hooks/useAuthContext";
import StudentTodayAttendance from "../../components/attendance/StudentTodayAttendance";
import { isUserStudent } from "../../util/user";
import TATodayAttendance from "../../components/attendance/TATodayAttendance";

const AttendancePage = () => {
  const { state } = useAuthContext();
  const isStudent = isUserStudent(state.user);
  return isStudent ? <StudentTodayAttendance /> : <TATodayAttendance />;
};

export default AttendancePage;
