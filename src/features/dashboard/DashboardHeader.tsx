interface HeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: HeaderProps) {
  return (
    <header>
      <h2 className="font-semibold">{title}</h2>
    </header>
  );
}
