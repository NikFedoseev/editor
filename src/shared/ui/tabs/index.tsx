import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

import { Button, Intent } from "shared/ui/button";
import styles from "./styles.module.css";

interface TabIndetified {
  id: string;
}

interface TabsProps extends React.PropsWithChildren {
  onValueChage?: (id: string) => void;
}

interface TabProps extends TabIndetified {
  buttonText: string;
}

interface TabPanelProps extends React.PropsWithChildren, TabIndetified {}

interface TabsContextValue {
  selectedId: Nullable<string>;
  onTabClick: (id: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined
);

const useTabs = () => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error("This component must be used within a <Tabs> component.");
  }

  return context;
};

const Tabs = ({ children, onValueChage }: TabsProps) => {
  const [selectedId, setSelectedId] = useState<Nullable<string>>(null);

  const handleSetSelectedId = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const value = useMemo(
    () => ({
      selectedId: selectedId,
      onTabClick: handleSetSelectedId,
    }),
    [selectedId]
  );

  return (
    <TabsContext.Provider value={value}>
      <div className={styles.tabs}>{children}</div>
    </TabsContext.Provider>
  );
};

const Tab = ({ id, buttonText }: TabProps) => {
  const { selectedId, onTabClick } = useTabs();

  const intent = selectedId === id ? Intent.Primary : Intent.Secondary;

  const handleClick = () => {
    onTabClick(id);
  };

  return (
    <div className={styles.tab}>
      <Button onClick={handleClick} text={buttonText} intent={intent} />
    </div>
  );
};

const Panel = ({ id, children }: TabPanelProps) => {
  const { selectedId } = useTabs();
  if (selectedId !== id) {
    return null;
  }

  return <div className="">{children}</div>;
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export { Tabs };
