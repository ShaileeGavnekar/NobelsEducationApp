import React from "react";
import { Classes } from "../../../lib/useMyClasses";
import ClassCard from "./ClassCard";

interface ClassTabProps {
  classes: Classes[];
}
const UpcomingClassTab: React.FC<ClassTabProps> = ({ classes }) => {
  return (
    <>
      {classes.map((c) => {
        return (
          <>
            <ClassCard clas={c} />
          </>
        );
      })}
    </>
  );
};

export default UpcomingClassTab;
