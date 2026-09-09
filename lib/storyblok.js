import {
  storyblokInit,
  apiPlugin,
  getStoryblokApi as getStoryblokApiReact,
  setComponents,
  renderRichText as storyblokRenderRichText,
} from "@storyblok/react";
import Page from "@/COMPONENTS/Page";
import JobsList from "@/COMPONENTS/JobsList";
import JobPost from "@/COMPONENTS/JobPost";
import Toolbar from "@/COMPONENTS/Toolbar";

const components = {
  "page": Page,
  "jobs-list": JobsList,
  "job-post": JobPost,
  "toolbar": Toolbar,
  "job-toolbar": Toolbar,
  "jobs-toolbar": Toolbar,
  "job_toolbar": Toolbar,
  "jobs_toolbar": Toolbar,

  Page: Page,
  JobsList: JobsList,
  JobList: JobsList,
  JobPost: JobPost,
  Toolbar: Toolbar,
};

export const storyblokConnection = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components,
});

export function getStoryblokApi() {
  setComponents(components);
  return getStoryblokApiReact();
}

export function renderRichText(data, options) {
  if (!data) return "";
  return storyblokRenderRichText(data, options);
}
