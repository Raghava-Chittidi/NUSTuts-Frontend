import PrivateRoute from "../../components/PrivateRoute";
import { useEffect, useState } from "react";
import ModuleListItem from "../../components/modules/ModuleListItem";
import { Module } from "../../types";
import axios from "axios";
import { getCurrentAY } from "../../util/util";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

const ModulesPage = () => {
  const { state } = useAuthContext();
  const [mods, setMods] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Retrieves modules for the current academic year using NUSMods API
    const getMods = async () => {
      setIsLoading(true);
      const modules = state.user.modules;
      const promises = [];
      for (const module of modules!) {
        promises.push(
          axios
            .get(
              `https://api.nusmods.com/v2/${getCurrentAY()}/modules/${module}.json`
            )
            .then((res) => {
              return {
                code: res.data.moduleCode,
                name: res.data.title,
              };
            })
        );
      }

      const res = await Promise.all(promises);
      setMods(res);
      setIsLoading(false);
    };

    getMods();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PrivateRoute userType="student">
      <div className="w-full text-center space-y-5 pt-5">
        <h1 className="font-bold text-xl">Current Modules:</h1>
        <div className="flex flex-col w-full items-center space-y-5">
          {mods.map((module, index) => {
            return <ModuleListItem module={module} key={index} />;
          })}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ModulesPage;
