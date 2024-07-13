import { GetServerSidePropsContext, NextPage } from "next";
import Login from "../../components/common/Login";
import cookie from "cookie";

const StudentLogin: NextPage = ({ cookies }: any) => {
  return (
    <>
      <Login />
      <button
        onClick={() => {
          // cookie.set("token", "ABCD", { expires: 1 / 24 });
          fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/test`, {
            method: "post",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });
        }}
      >
        Client
      </button>
    </>
  );
};
//
export default StudentLogin;

function parseCookies(req: any) {
  return cookie.parse(req ? req.headers?.cookie || "" : document.cookie);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx.res);

  return {
    props: { cookies }, // Will be passed to the page component as props
  };
}
