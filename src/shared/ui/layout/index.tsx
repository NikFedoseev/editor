import React from "react";
import styles from "./styles.module.css";

interface LayoutProps extends React.PropsWithChildren {}
interface ToplineProps extends React.PropsWithChildren {}
interface MainProps extends React.PropsWithChildren {}
interface SideBarProps extends React.PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.layout}>{children}</div>;
};

Layout.Topline = ({ children }: ToplineProps) => {
  return <div className={styles.topline}>{children}</div>;
};

Layout.Main = ({ children }: MainProps) => {
  return <div className={styles.main}>{children}</div>;
};

Layout.SideBar = ({ children }: SideBarProps) => {
  return <div className={styles.sidebar}>{children}</div>;
};

export { Layout };
