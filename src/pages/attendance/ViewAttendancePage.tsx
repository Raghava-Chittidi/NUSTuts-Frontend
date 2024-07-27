import { useAuthContext } from "../../hooks/useAuthContext";
import { isUserStudent } from "../../util/user";
import StudentViewAttendance from "../../components/attendance/StudentViewAttendance";
import TAViewAttendance from "../../components/attendance/TAViewAttendance";

const ViewAttendancePage = () => {
  const { state } = useAuthContext();
  const isStudent = isUserStudent(state.user);
  // If user is a student, show student view attendance page. Else If user is a teaching assistant, show TA view attendance page
  return isStudent ? <StudentViewAttendance /> : <TAViewAttendance />;
};

export default ViewAttendancePage;
