import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import App from "../App";

configure({ adapter: new Adapter() });
describe("Home component ", () => {
  const homePage = mount(<App />);

  it("Renders the home component", () => {
    const homePageText = homePage.find("h1");
    expect(homePageText.text()).toBe("Tucket Ticketing");
  });

  it("Renders the header component ", () => {
    expect(homePage.find(".header-content").exists()).toBe(true);
  });

  it("Renders the footer component ", () => {
    expect(homePage.find(".footer-content").exists()).toBe(true);
  });

  it("Renders the login navigation when not signed in", () => {
    expect(homePage.find("#login").exists()).toBe(true);
  });

  it("Renders the signup navigation when not signed in", () => {
    expect(homePage.find("#signup").exists()).toBe(true);
  });
});
