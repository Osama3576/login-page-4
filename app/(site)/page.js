import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <div className="h-screen login bg-[url('/images/bg-2.png')] grid grid-cols-1 lg:grid-cols-2  lg:bg-[url('/images/bg-1.png')]">
      <div className="hidden w-full h-full lg:block"></div>
      <AuthForm />
    </div>
  );
}
