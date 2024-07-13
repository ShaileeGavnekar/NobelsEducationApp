import { Button, IconButton, Link, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";
import { H4 } from "../../common/typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const Item = styled(Button)(({ theme }) => ({
  justifyContent: "left",
  fontFamily: "Nunito",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
  },
  "&.active-link": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
}));

export type SideBarItems = Array<{
  title: string;
  icon: any;
  link: string;
}>;
interface SidebarOptionsProps {
  sectionTitle?: string;
  items: SideBarItems;
}

const SidebarSection: React.FC<SidebarOptionsProps> = ({
  sectionTitle,
  items,
}) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box mb={4}>
      <H4
        fontWeight="bold"
        fontFamily="Montserrat"
        color={theme.palette.text.primary}
        pb={1}
      >
        {sectionTitle}
      </H4>
      <Stack spacing={1}>
        {items.map((item, i) => (
          <Item
            key={i}
            startIcon={<item.icon />}
            onClick={() => router.push(item.link)}
            className={`${router.pathname == item.link ? "active-link" : ""}`}
          >
            {item.title}
          </Item>
        ))}
      </Stack>
    </Box>
  );
};

export default SidebarSection;
