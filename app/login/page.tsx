

// export default function Page() {
//     return (
//         <h1>Login page</h1>
//     )
// }

import { signIn } from 'next-auth/react';

const LoginPage = () => {
    const handleLogin = async () => {
        await signIn('google'); // Use the provider ID configured in your next-auth configuration
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default LoginPage;
