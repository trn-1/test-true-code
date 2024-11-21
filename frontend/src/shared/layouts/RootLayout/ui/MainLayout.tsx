import '@/app/styles/index.scss';

export const MainLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element => {
  return (
    <>
      {children}
    </>
  );
};
