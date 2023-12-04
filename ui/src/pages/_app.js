import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "src/contexts/auth-context";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import { useEffect } from "react";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SideNav } from "src/layouts/dashboard/side-nav";
import Profile from "src/components/Profile";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);



const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <WagmiConfig config={config}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Devias Kit</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SideNav />
              {/** Needs to be in grid */}
              <Component {...pageProps} />
            </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </WagmiConfig>
  );
};

export default App;
