import OTPForm from "@/app/auth/_components/OTPForm";

interface Props {
  searchParams?: { [key: string]: string };
}

export default function Page(props: Props) {
  const { searchParams } = props;
  const email = searchParams?.email;

  return <OTPForm email={email} />;
}
