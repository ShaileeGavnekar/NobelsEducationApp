import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import React from "react";

interface IFormWrapper<T> {
  open: boolean;
  handleClose: () => void;
  initialValues: T;
  title: string;
  validationSchema: any;
  render: (props: FormikProps<T>) => React.ReactNode;
  confirmLabel?: string;
  dismissLabel?: string;
  handleSubmit: (values: T) => void;
  subHeader?: string;
}

function FormWrapper<T>(props: IFormWrapper<T>) {
  const {
    open,
    handleClose,
    initialValues,
    title,
    validationSchema,
    render,
    confirmLabel,
    dismissLabel,
    handleSubmit,
    subHeader,
  } = props;
  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          scroll="paper"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5">{title}</Typography>
            {subHeader && (
              <Typography variant="subtitle2" color="textSecondary">
                {subHeader}
              </Typography>
            )}
          </DialogTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            render={(props: FormikProps<T>) => {
              return (
                <>
                  {" "}
                  <Form
                    aria-label="create class form"
                    id="create-teacher-form"
                    style={{ margin: "20px" }}
                  >
                    <DialogContent dividers={true}>
                      {render(props)}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>
                        {" "}
                        {Boolean(dismissLabel) ? dismissLabel : "Disagree"}
                      </Button>
                      <Button type="submit" autoFocus variant={"contained"}>
                        {Boolean(confirmLabel) ? confirmLabel : "Agree"}
                      </Button>
                    </DialogActions>
                  </Form>
                </>
              );
            }}
          />
        </Dialog>
      </div>
    </>
  );
}

export default FormWrapper;
