import React from "react";

import { ModelConstrictor } from "features/model-constructor/ui";
import { Tabs } from "shared/ui/tabs";
import styles from "./styles.module.css";

export const Editor = () => {
  return (
    <div className="">
      <Tabs onValueChage={console.log}>
        <div className={styles.tabs}>
          <Tabs.Tab id="editor" buttonText="Editor" />
          <Tabs.Tab id="settings" buttonText="Settings" />
        </div>
        <div className={styles.panels}>
          <Tabs.Panel id="editor">
            <ModelConstrictor />
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
};
