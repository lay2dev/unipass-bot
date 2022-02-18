// antd
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
// global
import "../styles/globals.scss";
import type { AppProps } from "next/app";

moment.locale("zh-cn");

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} locale={zhCN} />;
    </ConfigProvider>
  );
};

export default App;
