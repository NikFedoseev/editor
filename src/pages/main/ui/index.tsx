import { Editor } from "widgets/editor/ui";
import { Scene } from "features/scene/ui";
import { Layout } from "shared/ui/layout";

export const MainPage = () => {
  return (
    <Layout>
      <Layout.Main>
        <Scene />
      </Layout.Main>
      <Layout.SideBar>
        <Editor />
      </Layout.SideBar>
    </Layout>
  );
};
