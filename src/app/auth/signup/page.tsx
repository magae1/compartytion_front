import SignUpForm from "@/app/auth/_components/SignUpForm";

interface Props {
  searchParams?: { [key: string]: string };
}

export default function Page(props: Props) {
  const { searchParams } = props;
  const email = searchParams?.email;

  return <SignUpForm email={email} />;
}
