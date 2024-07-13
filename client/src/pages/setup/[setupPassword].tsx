import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import useDataCodes from "../../lib/useDataCode";

const setUpPassword: React.FC = () => {
  const [pass, setPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const router = useRouter();
  const { setUpPassword: dataCode } = router.query;
  const { data, isLoading } = useDataCodes(dataCode! as string);
  if (isLoading) {
    return <>Loading....</>;
  }

  return (
    <>
      <>Hey {data?.name}, Setup your password</>
      <TextField value={pass} onChange={(e) => setPass(e.target.value)} />
      <TextField
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <Button>Save Password</Button>
    </>
  );
};

export default setUpPassword;
