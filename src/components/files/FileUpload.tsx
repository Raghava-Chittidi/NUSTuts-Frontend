import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { createClient } from "@supabase/supabase-js";
import { TutorialFile } from "../../types";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const FileUpload = ({
  week,
  setLoading,
  setFiles,
}: {
  week: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<TutorialFile[]>>;
}) => {
  const { state } = useAuthContext();

  const uploadFile = async (event: React.FormEvent<HTMLInputElement>) => {
    if (state.user.role.userType === "student") {
      return;
    }

    setLoading(true);
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const filepath = `${state.user.tutorial?.ID}/${week}/${uuidv4()}-${
      file.name
    }`;

    const { error } = await supabase.storage
      .from("NUSTuts")
      .upload(filepath, file);

    if (error) {
      target.value = "";
      setLoading(false);
      console.log(error);
      toast.error("File cannot be uploaded!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/files/upload/${
          state.user.tutorial?.ID
        }`,
        {
          name: file.name,
          week,
          filepath,
        },
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      console.log(res.data);

      const date = new Date().toString();
      const tutorialFile: TutorialFile = {
        ID: Math.random(),
        filepath: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/NUSTuts/${filepath}`,
        name: file.name,
        tutorialId: state.user.tutorial!.ID,
        visible: true,
        week: week,
        CreatedAt: date,
        UpdatedAt: date,
        DeletedAt: null,
      };

      target.value = "";
      setFiles((prevState) => [...prevState, tutorialFile]);
      setLoading(false);
      toast.success("File successfully uploaded!");
    } catch (error) {
      target.value = "";
      setLoading(false);
      toast.error("File cannot be uploaded!");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center w-80 space-x-4">
      <input
        type="file"
        className="w-full text-gray-500 border-blue-950 border-2 rounded-lg font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white"
        onChange={uploadFile}
      />
    </div>
  );
};

export default FileUpload;
