import React, { useContext } from "react";
import {
  Box,
  Heading,
  ScrollView,
  HStack,
  Text,
  VStack,
  Pressable,
} from "native-base";
import Link from "next/link";
import * as NBComponents from "native-base";
import { MDXRemote } from "next-mdx-remote";
import Toc from "./Toc";
import {
  Span,
  PText,
  Li,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Anchor,
  Img,
  Code,
  CodeBlock,
  Playground,
  TableBox,
  TableHead,
  TableHeadData,
  TableData,
  TableRow,
  Showcase,
} from "./markdown-components";
import { AppContext } from "../AppContext";
import * as docComponents from "../components";
import { isLatestVersionSlug } from "../utils";

export default function MainContent(props: any) {
  const { Tabs, ...RemNBComponents } = NBComponents;
  const { content, tocArray, pages, frontMatter } = props;
  const { activeVersion, setActiveSidebarItem } = useContext(AppContext);
  const components = {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    p: PText,
    span: Span,
    li: Li,
    img: Img,
    a: Anchor,
    code: ({ children, ...props }: any) => {
      if (props?.isLive) return <Playground>{children}</Playground>;
      else if (props?.isShowcase) return <Showcase>{children}</Showcase>;
      else return <CodeBlock>{children}</CodeBlock>;
    },
    table: TableBox,
    thead: TableHead,
    th: TableHeadData,
    tr: TableRow,
    td: TableData,
    ...docComponents,
    ...RemNBComponents,
  };
  return (
    <>
      <ScrollView>
        <Box px={{ base: "6", xl: "16" }} py="10">
          <Heading>
            {frontMatter && frontMatter.title
              ? frontMatter.title
              : pages.currentPage.title}
          </Heading>
          <MDXRemote {...content} components={components} />
          <HStack justifyContent="space-between" my="12">
            {pages.previousPage && (
              <Pressable
                mr="auto"
                onPress={() => setActiveSidebarItem(pages.previousPage.id)}
              >
                <Link
                  passHref
                  href={`${
                    isLatestVersionSlug(activeVersion)
                      ? ""
                      : activeVersion + "/"
                  }${pages.previousPage.id}`}
                >
                  <VStack>
                    <Text
                      _light={{ color: "pageNavigationHeadingLight" }}
                      _dark={{ color: "pageNavigationHeadingDark" }}
                    >
                      Previous
                    </Text>
                    <Text
                      fontSize="lg"
                      _light={{ color: "pageNavigationMainTitleLight" }}
                      _dark={{ color: "pageNavigationMainTitleDark" }}
                    >
                      {pages.previousPage.title}
                    </Text>
                  </VStack>
                </Link>
              </Pressable>
            )}
            {pages.nextPage && (
              <Pressable
                ml="auto"
                onPress={() => setActiveSidebarItem(pages.nextPage.id)}
              >
                <Link
                  passHref
                  href={`${
                    isLatestVersionSlug(activeVersion)
                      ? ""
                      : activeVersion + "/"
                  }${pages.nextPage.id}`}
                >
                  <VStack>
                    <Text
                      _light={{ color: "pageNavigationHeadingLight" }}
                      _dark={{ color: "pageNavigationHeadingDark" }}
                    >
                      Next
                    </Text>
                    <Text
                      fontSize="lg"
                      _light={{ color: "pageNavigationMainTitleLight" }}
                      _dark={{ color: "pageNavigationMainTitleDark" }}
                    >
                      {pages.nextPage.title}
                    </Text>
                  </VStack>
                </Link>
              </Pressable>
            )}
          </HStack>
        </Box>
      </ScrollView>
      {props.showToc && (
        <Box display={{ base: "none", lg: "flex" }}>
          <Toc tocArray={tocArray} />
        </Box>
      )}
    </>
  );
}
