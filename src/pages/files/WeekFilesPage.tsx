import { useNavigate, useParams } from "react-router-dom";
import { IoDocumentText } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import FileUpload, { supabase } from "../../components/files/FileUpload";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { TutorialFile } from "../../types";
import { formatDate } from "../../util/util";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";

const WeekFilesPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const [files, setFiles] = useState<TutorialFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [uploadFileLoading, setUploadFileLoading] = useState<boolean>(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch tutorial files for the current week from the server
  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/files/${state.user.role.userType}/${params.tutorialId}/${params.week}`,
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );

      const promises = [];
      for (const file of res.data.data.files) {
        // Fetch each file from supabase storage using the filepath
        const fetchedFile = await supabase.storage
          .from("NUSTuts")
          .getPublicUrl(file.filepath);

        const fileObj = {
          ...file,
          filepath: fetchedFile.data.publicUrl,
        };

        promises.push(fileObj);
      }

      const fileObjs = await Promise.all(promises);
      setFiles(fileObjs);
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  // Redirects to homepage if week is invalid
  useEffect(() => {
    if (+params.week! > 13 || +params.week! <= 0) {
      navigate("/");
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const deleteFileHandler = async (filepath: string) => {
    // Only teaching assistants can delete files
    if (state.user.role.userType === "student") {
      return;
    }

    try {
      setIsLoading(true);
      const path = filepath.split("NUSTuts/")[1];

      // Remove the file from the database
      const res = await axios.patch(
        `${BASE_URL}/api/files/delete/${state.user.tutorial?.ID}`,
        {
          filepath: path.replaceAll("%20", " "),
        },
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      console.log(res.data);

      // Remove the file from supabase storage
      await supabase.storage.from("NUSTuts").remove([path]);
      setFiles((prevState) =>
        prevState.filter((tutorialFile) => tutorialFile.filepath !== filepath)
      );
      setIsLoading(false);
      toast.success("File successfully deleted!");
    } catch (error) {
      setIsLoading(false);
      toast.error("File cannot be deleted!");
      console.log(error);
    }
  };

  const privateFileHandler = async (filepath: string, index: number) => {
    // Only teaching assistants can private files
    if (state.user.role.userType === "student") {
      return;
    }

    try {
      const path = filepath.split("NUSTuts/")[1];

      // Update the tutorial file to be private in the database
      const res = await axios.patch(
        `${BASE_URL}/api/files/private/${state.user.tutorial?.ID}`,
        {
          filepath: path.replaceAll("%20", " "),
        },
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      console.log(res.data);

      // Hide the file that is set to private
      setFiles((prevState) => {
        const newState = [...prevState];
        prevState[index].visible = false;
        return newState;
      });
      toast.success("File successfully privated!");
    } catch (error) {
      toast.error("File cannot be privated!");
      console.log(error);
    }
  };

  const unprivateFileHandler = async (filepath: string, index: number) => {
    // Only teaching assistants can unprivate files
    if (state.user.role.userType === "student") {
      return;
    }

    try {
      const path = filepath.split("NUSTuts/")[1];

      // Update the tutorial file to be unprivated in the database
      const res = await axios.patch(
        `${BASE_URL}/api/files/unprivate/${state.user.tutorial?.ID}`,
        {
          filepath: path.replaceAll("%20", " "),
        },
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      console.log(res.data);

      // Display the file that is unprivated
      setFiles((prevState) => {
        const newState = [...prevState];
        prevState[index].visible = true;
        return newState;
      });
      toast.success("File successfully unprivated!");
    } catch (error) {
      toast.error("File cannot be unprivated!");
      console.log(error);
    }
  };

  return (
    <div className="w-full md:pl-10 p-2 md:p-5 space-y-5 overflow-y-scroll">
      <div className="flex justify-between items-center font-bold text-blue-950">
        <span className="pl-2">Filename</span>
        <div className="flex items-center space-x-8 md:space-x-10">
          <span>Modified on</span>
          {state.user.role.userType === "teachingAssistant" && (
            <span className="pr-2">Actions</span>
          )}
        </div>
      </div>
      {files.length === 0 && <p className="pl-2">No files uploaded yet!</p>}
      {files.length > 0 &&
        files.map((file, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <div className="flex items-center sm:space-x-4 pl-2 my-2">
                <IoDocumentText
                  size={23}
                  className="text-gray-500 hidden sm:block"
                />
                <Link
                  to={file.filepath}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer hover:underline text-xs md:text-sm lg:text-base text-blue-600 duration-300 hover:opacity-85"
                >
                  {file.name}
                </Link>
              </div>
              <div className="flex items-center space-x-10 text-xs md:text-sm lg:text-base">
                <span>{formatDate(file.UpdatedAt)}</span>
                {state.user.role.userType === "teachingAssistant" && (
                  <div className="flex space-x-0 sm:space-x-1 items-center">
                    <div className="w-8 h-8 flex items-center">
                      <Modal
                        title="Warning!"
                        body="This action is irreversible! Are you sure you want to delete this file?"
                        component={
                          <FaTrash
                            title="Delete file"
                            className="rounded-lg p-1 cursor-pointer hover:bg-red-600 hover:bg-opacity-15 duration-400 text-red-600 text-xl sm:text-2xl"
                          />
                        }
                        handler={() => deleteFileHandler(file.filepath)}
                      />
                    </div>
                    <div className="w-8 h-8 flex items-center">
                      {!file.visible ? (
                        <FaEyeSlash
                          title="Unprivate file"
                          className="rounded-lg p-1 cursor-pointer hover:bg-green-600 hover:bg-opacity-15 duration-400 text-green-600 text-xl sm:text-2xl"
                          onClick={() =>
                            unprivateFileHandler(file.filepath, index)
                          }
                        />
                      ) : (
                        <FaEye
                          title="Private file"
                          className="rounded-lg p-1 cursor-pointer hover:bg-green-600 hover:bg-opacity-15 duration-400 text-green-600 text-xl sm:text-2xl"
                          onClick={() =>
                            privateFileHandler(file.filepath, index)
                          }
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <hr className="w-full border-gray-300" />
          </div>
        ))}
      {state.user.role.userType === "teachingAssistant" && (
        <div className="pt-5 pl-2">
          <h1 className="font-bold text-blue-950 pb-5">Upload Files</h1>
          <div className="flex items-center space-x-5">
            <FileUpload
              week={+params.week!}
              setLoading={setUploadFileLoading}
              setFiles={setFiles}
            />
            {uploadFileLoading && <Spinner />}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekFilesPage;
