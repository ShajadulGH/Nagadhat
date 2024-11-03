import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { getLoginToken } from "../../../services/getLoginToken";
import { checkUserExistByGoogleLogin } from "@/app/services/checkUserExistByGoogleLogin";
import { googleLoginAPI } from "@/app/services/googleLogin";
function getRequestPath() {
    if (typeof window !== "undefined") {
        try {
            const requestPage = localStorage.getItem("requestPage");

            // Debugging: Check if the value is correctly retrieved
            console.log("Retrieved requestPage:", requestPage);

            // If the value exists, parse it; otherwise, default to "/dashboard"
            const requestRoute = requestPage
                ? JSON.parse(requestPage)
                : "/dashboard";

            // Debugging: Check the parsed value
            console.log("Parsed requestRoute:", requestRoute);

            return requestRoute;
        } catch (error) {
            // Handle any errors during retrieval or parsing
            console.error("Error retrieving or parsing requestPage:", error);
            return "/dashboard"; // Fallback in case of error
        }
    }
    return "/dashboard"; // Fallback if window is undefined
}

let profileData = null;
let userStatus = null;
let signInStatus = null;

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials, req) {
                if (credentials === null) return null;
                try {
                    const res = await getLoginToken({
                        phone: credentials?.username,
                        password: credentials?.password,
                    });

                    // console.log(
                    //     "=>>> after credentials login successfully res from api auth route page",
                    //     res
                    // );

                    if (res.error) {
                        throw new Error("Email or Password is not correct");
                    }

                    if (res.user) {
                        const user = {
                            id: res?.user?.id,
                            name: res?.user?.name,
                            email: res?.user?.email,
                        };

                        // Example accessToken and expiresIn, replace with actual token logic
                        const accessToken = res?.user?.accessToken;
                        // const expiresIn = 3600; // Token expiration time in seconds
                        const expiresIn = res?.user?.expiresIn;

                        const phone = res?.user?.phone;

                        return { ...user, accessToken, expiresIn, phone };
                    }
                    return null;
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error(error.message);
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log("=>>> signIn from api auth route page ...");

            // console.log(
            //     "=>>> signIn from api auth route page account",
            //     account
            // );
            // console.log(
            //     "=>>> signIn from api auth route page profile",
            //     profile
            // );

            if (account.provider === "google") {
                signInStatus = "login";
                // Example accessToken and expiresIn, replace with actual token logic

                // console.log("user from api auth route page ----", user);
                // console.log('profile from api auth route page ----', account)
                // console.log('profile from api auth route page ----', profile)

                const formData = {
                    provider_account_id: account?.providerAccountId || "",
                    name: profile?.name || "",
                    email: profile?.email || "",
                };

                // console.log("=>>> formdata before form submit", formData);

                const googleLogin = await googleLoginAPI(formData);

                // console.log(
                //     "googleLogin from api auth route page",
                //     googleLogin
                // );

                user.accessToken = googleLogin?.user?.accessToken;
                user.expiresIn = googleLogin?.user?.expiresIn;

                user.name = profile?.name;
                user.email = profile?.email;

                // Simulate an asynchronous operation that assigns a value to 'profileData'
                new Promise((resolve) => {
                    setTimeout(() => {
                        profileData = profile;
                        resolve();
                    }, 1000); // Simulate a 1-second delay
                });

                // console.log("=> profileData 1 sign", profileData);

                const userExists = await checkUserExistByGoogleLogin({
                    email: profile?.email,
                });

                // console.log(
                //     "userExists 1 signin from api auth route page",
                //     userExists
                // );

                if (userExists) {
                    if (
                        userExists?.message == "Already User Exists" &&
                        (userExists?.account_provider == "credentials" ||
                            userExists?.account_provider == "google")
                    ) {
                        // console.log(
                        //     "userExists 2 signin from api auth route page"
                        // );

                        userStatus = "complete";
                    } else {
                        // console.log(
                        //     "userExists 3 signin from api auth route page"
                        // );

                        userStatus = "no complete";
                    }
                }
                return { ...user };
            }

            return true;
        },

        async redirect({ url, baseUrl }) {
            // console.log("=>>> redirect from api auth route page ...");
            // console.log("=>>> redirect url", url);
            // console.log("=>>> redirect baseUrl", baseUrl);
            // console.log(
            //     "=>>> profileData 2 email redirect ",
            //     profileData?.email
            // );

            // Wait until 'profileData' has been assigned a value or a timeout occurs
            try {
                // Ensure 'profileData' has a value before proceeding
                // console.log("=>>> signInStatus 111", signInStatus);
                // console.log("=>>> profileData.email 111", profileData.email);
                // console.log("=>>> userStatus 111", userStatus);

                if (
                    signInStatus == "login" &&
                    profileData &&
                    profileData.email &&
                    userStatus == "complete"
                ) {
                    // console.log(
                    //     "=>>> profileData 3 email redirect ",
                    //     profileData.email
                    // );
                    return `${baseUrl}/${getRequestPath()}`;
                } else if (
                    signInStatus == null &&
                    profileData &&
                    profileData.email &&
                    userStatus == "no complete"
                ) {
                    // console.log(
                    //     "=>>> profileData 3 email redirect ",
                    //     profileData.email
                    // );
                    return url.startsWith(baseUrl)
                        ? `${baseUrl}/new-user`
                        : baseUrl;
                } else {
                    // console.log("=>>> profileData 4 email redirect ");
                    return url.startsWith(baseUrl) ? `${baseUrl}/` : baseUrl;
                }
            } catch (error) {
                console.error("=>>> profileData 5 error", error.message);
                return url.startsWith(baseUrl) ? `${baseUrl}` : baseUrl;
            }
        },
        async jwt({ token, user }) {
            // console.log("=>>> jwt...");

            // console.log('=>>> jwt token from api auth route page', token)
            // console.log('=>>> jwt user from api auth route page', user)

            // Initial sign in
            if (user) {
                token.accessToken = user.accessToken;
                token.expiresIn = user.expiresIn;
                token.phone = user.phone;
            }

            return token;
        },

        async session({ session, token }) {
            // console.log("=>>> session from api auth route page...");

            // console.log('=>>> session session from api auth route page', session)
            // console.log('=>>> session token from api auth route page', token)

            if (token) {
                session.accessToken = token.accessToken;
                session.expiresIn = token.expiresIn;
                session.phone = token.phone;
            }
            return session;
        },
    },
    pages: {
        newUser: "/dashboard",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
