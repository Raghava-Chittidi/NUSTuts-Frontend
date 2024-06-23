import { Attendance } from "../../types";

const AttendanceDisplay = ({ attendances }: { attendances: Attendance[] }) => {
  return (
    <div className="w-full flex flex-col items-center mb-5 px-5">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Present</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.id}>
              <td className="border border-gray-300 px-4 py-2">{attendance.student.name}</td>
              <td className="border border-gray-300 px-4 py-2">{attendance.student.email}</td>
              <td className="border border-gray-300 px-4 py-2">{attendance.present ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceDisplay;
