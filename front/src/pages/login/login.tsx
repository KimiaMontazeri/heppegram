import { useStore } from '../../store/store';

// TODO: this is just a dummy template
function Login() {
  const bears = useStore((state) => state.bears);
  return <div>bears : {bears}</div>;
}

export default Login;
