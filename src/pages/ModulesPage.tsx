import ModuleListItem from "../components/modules/ModuleListItem";

const ModulesPage = ({
  modules,
}: {
  modules: { code: string; name: string }[];
}) => {
  return (
    <div className="w-full text-center space-y-5 mt-5">
      <h1 className="font-bold text-xl">Current Modules:</h1>
      <div className="flex flex-col w-full items-center space-y-5">
        {modules.map((module) => {
          return <ModuleListItem module={module} />;
        })}
      </div>
    </div>
  );
};

export default ModulesPage;
