import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

// Ensures that the users can only visit valid tutorials that they are inside
export const useTutorial = () => {
  const { tutorialId } = useParams();
  const user = useAuthContext().state.user;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const validateTutorialId = () => {
    if (+tutorialId! <= 0) {
      navigate("/");
      return;
    }

    if (user.role.userType === "student") {
      // Check whether the student that wants to visit this tutorial is already inside this tutorial
      const id = user.tutorials?.findIndex(
        (tutorial) => tutorial.ID === +tutorialId!
      );

      if (id === -1) {
        navigate("/");
        return;
      }
    } else {
      // Check whether the teaching assistant that wants to visit this tutorial teaches this tutorial
      if (+tutorialId! !== user.tutorial?.ID) {
        navigate("/");
        return;
      }
    }

    setIsLoading(false);
  };

  return { validateTutorialId, isLoading };
};
