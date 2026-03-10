export const sessionOptions = {
  // Custom name for the session ID cookie
  name: process.env.SESSION_NAME,

  // Secret used to sign the session ID cookie
  // Should be a long, random string stored in environment variables
  secret: process.env.SESSION_SECRET,

  // Don't save session if nothing changed
  resave: false,

  // Don't create session until something stored
  saveUninitialized: false,

  cookie: {
    // Cookie lifetime in milliseconds (24 hours)
    maxAge: 1000 * 60 * 60 * 24,

    // Restrict cookie to same site only
    // Protects against CSRF attacks
    sameSite: 'strict',

    // Only send cookie over HTTPS in production
    secure: process.env.NODE_ENV === 'production',

    // Prevent client-side access to cookie through JavaScript
    // Protects against XSS attacks
    httpOnly: true,
  },

  // Extend session lifetime on each request
  rolling: true,
}
