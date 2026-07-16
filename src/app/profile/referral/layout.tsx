import AuthenticatedLayout from "../../../components/shared/AuthenticatedLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
