import React from "react";
import SidebarSection from "./SidebarSection";
import { Box, SvgIconTypeMap } from "@mui/material";
import ProfileCard from "../Account/ProfileCard";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type SideBarItem = {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  link: string;
};
export type SideBarItems = {
  label: string;
  items: SideBarItem[];
};

export interface ISideBarProps {
  menuItems: SideBarItems[];
}

const Sidebar: React.FC<ISideBarProps> = ({ menuItems }) => {
  return (
    <>
      <Box padding="32px 16px">
        <Box mb={4}>
          <ProfileCard />
        </Box>
        {menuItems.map((m) => {
          return (
            <>
              <SidebarSection sectionTitle={m.label} items={m.items} />
            </>
          );
        })}
      </Box>
    </>
  );
};

export default Sidebar;
