import { apiPlugin, storyblokInit, getStoryblokApi } from "@storyblok/react/rsc";
import { unstable_noStore as noStore } from "next/cache";

import Page from "@/COMPONENTS/Page";
import JobsList from "@/COMPONENTS/JobsList";
import JobPost from "@/COMPONENTS/JobPost";
import Toolbar from "@/COMPONENTS/Toolbar";
import SearchBar from "@/COMPONENTS/SearchBar";
import DepartmentFilter from "@/COMPONENTS/DepartmentFilter";
import Hero from "@/COMPONENTS/Hero";
import Teaser from "@/COMPONENTS/Teaser";
import Grid from "@/COMPONENTS/Grid";
import Feature from "@/COMPONENTS/Feature";
import Button from "@/COMPONENTS/Button";
import FeatureGrid from "@/COMPONENTS/FeatureGrid";
import FeatureItem from "@/COMPONENTS/FeatureItem";
import TextSection from "@/COMPONENTS/TextSection";
import Header from "@/COMPONENTS/Header";
import Footer from "@/COMPONENTS/Footer";
import NavItem from "@/COMPONENTS/NavItem";
import FooterLink from "@/COMPONENTS/FooterLink";

// Register all Storyblok block components and aliases
const components = {
  page: Page,
  Page: Page,

  "jobs-list": JobsList,
  job_list: JobsList,
  JobsList: JobsList,
  JobList: JobsList,

  "job-post": JobPost,
  JobPost: JobPost,

  toolbar: Toolbar,
  "job-toolbar": Toolbar,
  "jobs-toolbar": Toolbar,
  Toolbar: Toolbar,

  "search-bar": SearchBar,
  SearchBar: SearchBar,

  "department-filter": DepartmentFilter,
  DepartmentFilter: DepartmentFilter,

  hero: Hero,
  Hero: Hero,

  teaser: Teaser,
  Teaser: Teaser,

  grid: Grid,
  Grid: Grid,

  feature: Feature,
  Feature: Feature,

  button: Button,
  Button: Button,

  feature_grid: FeatureGrid,
  feature_item: FeatureItem,
  text_section: TextSection,

  header: Header,
  footer: Footer,
  nav_item: NavItem,
  footer_link: FooterLink,
};

storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: { region: "eu" },
});

export { getStoryblokApi };

const CONTENT_VERSION = process.env.STORYBLOK_VERSION || "draft";

function bypassCacheIfDraft() {
  if (CONTENT_VERSION === "draft") {
    noStore();
  }
}

// ============ Jobs Queries ============

export async function getJobs({ department, searchTerm } = {}) {
  bypassCacheIfDraft();
  const sbApi = getStoryblokApi();
  const params = {
    starts_with: "jobs/",
    content_type: "job-post",
    version: CONTENT_VERSION,
    is_startpage: false,
    sort_by: "content.publishedAt:desc",
  };

  if (department) {
    params.filter_query = {
      department: {
        in: department,
      },
    };
  }

  if (searchTerm) {
    params.search_term = searchTerm;
  }

  try {
    const { data } = await sbApi.get("cdn/stories", params);
    return data.stories || [];
  } catch (error) {
    console.error("Fel vid hämtning av jobb från Storyblok:", error);
    return [];
  }
}

export async function getJob(slug) {
  bypassCacheIfDraft();
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get(`cdn/stories/jobs/${slug}`, {
      version: CONTENT_VERSION,
    });
    return data.story;
  } catch (error) {
    if (error?.status === 404 || error?.response?.status === 404) return null;
    console.error(`Fel vid hämtning av jobb '${slug}':`, error);
    return null;
  }
}

// ============ Datasource Queries ============

export async function getDatasourceMap(slug) {
  bypassCacheIfDraft();
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get("cdn/datasource_entries", {
      datasource: slug,
      version: CONTENT_VERSION,
    });
    return new Map((data.datasource_entries || []).map((e) => [e.value, e.name]));
  } catch (error) {
    console.error(`Kunde inte hämta datasource '${slug}':`, error);
    return new Map();
  }
}

export async function getDatasourceEntries(slug) {
  bypassCacheIfDraft();
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get("cdn/datasource_entries", {
      datasource: slug,
      version: CONTENT_VERSION,
    });
    return data.datasource_entries || [];
  } catch (error) {
    console.error(`Kunde inte hämta datasource entries för '${slug}':`, error);
    return [];
  }
}

// ============ Page Queries ============

export async function getPage(slug) {
  bypassCacheIfDraft();
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get(`cdn/stories/${slug}`, {
      version: CONTENT_VERSION,
    });
    return data.story;
  } catch (error) {
    if (error?.status === 404 || error?.response?.status === 404) return null;
    console.error(`Kunde inte hämta sidan '${slug}':`, error);
    return null;
  }
}

export async function getPageSlugs() {
  bypassCacheIfDraft();
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get("cdn/stories", {
      content_type: "page",
      version: CONTENT_VERSION,
    });
    return (data.stories || [])
      .map((s) => s.slug)
      .filter((slug) => slug !== "home" && slug !== "jobs");
  } catch (error) {
    console.error("Kunde inte hämta sidsluggar:", error);
    return [];
  }
}

// ============ Config Query ============

export async function getConfig() {
  bypassCacheIfDraft();
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get("cdn/stories/config", {
      version: CONTENT_VERSION,
    });
    return data.story;
  } catch {
    // Config is optional; returning null will trigger the built-in fallback
    return null;
  }
}
