import { NextPage } from "next"
import React from "react"
import MyPayments from "../../../components/students/dashboard/MyPayments"
import { ComponentProps } from "../../_app"
import { createStyles, makeStyles } from "@mui/styles"
import { Box, Theme, Typography } from "@mui/material"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            padding: theme.spacing(2),
            marginLeft: theme.spacing(6),
            marginTop: theme.spacing(2),
            fontWeight: "bold",
            fontSize: theme.spacing(4)
        },

    })
);



const MyPaymentsPage: NextPage<ComponentProps> = () => {
    const classes = useStyles()

    return <>
        <Box>
            <Typography variant="h6" className={classes.heading}>
                Payment History
            </Typography>
            <Box><Typography></Typography><span></span></Box>
        </Box>
        <Box p={4} ml={4} mr={4}>
            <MyPayments />

        </Box>

    </>

}
export default MyPaymentsPage




