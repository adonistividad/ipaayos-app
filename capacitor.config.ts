import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.ipaayos.com',
  appName: 'iPaayos',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "76641378310-mitqb64ic77870hmsfpcfn1bcct0tvk1.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
