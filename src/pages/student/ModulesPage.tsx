import PrivateRoute from "../../components/PrivateRoute";
import { useEffect, useState } from "react";
import ModuleListItem from "../../components/modules/ModuleListItem";
import { Module } from "../../types";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import { getCurrentAY } from "../../util/util";
import { useAuthContext } from "../../hooks/useAuthContext";

const ModulesPage = () => {
  const { state } = useAuthContext();
  const [mods, setMods] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMods = async () => {
      setIsLoading(true);
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

    const modules = state.user?.modules;
    if (modules && modules.length > 0) {
      getMods();
    }
  }, [state.user]);

  if (isLoading || mods.length === 0) {
    return <Spinner />;
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
