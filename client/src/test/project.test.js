import React from 'react'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme'
import ProjectHome from '../components/project/projectHome'

configure({ adapter: new Adapter() });

describe('Project component ', () => {

  const projects = [
    {
      "_id": "5d4a4c80c5e5311bcc4b7492",
      "name": "Alex Wilson",
      "tickets": [
        {
          "_id": "5d4a4c8ac5e5311bcc4b7494",
          "title": "A1",
          "description": "asdfasdf",
          "__v": 0
        }
      ],
      "__v": 1
    }
  ]
  const project = {
    "_id": "5d4a4c80c5e5311bcc4b7492",
    "name": "Alex Wilson",
    "tickets": [
      {
        "_id": "5d4a4c8ac5e5311bcc4b7494",
        "title": "A1",
        "description": "asdfasdf",
        "__v": 0
      }
    ],
    "__v": 1
  }
  const projectHome = mount(<ProjectHome />)

  it('Renders the project home', () => {
    const projectHomeText = projectHome.find('h1')
    expect(projectHomeText.text()).toBe('Projects')
  })

  it('Renders with state default to 1', () => {
    expect(projectHome.instance().state.window).toBe(1)
  })

  it('Renders get projects with default state', () => {
    projectHome.setState({ window: 1, projects: projects, loadingProjects: false })
    const getAllProjectsText = projectHome.find('h3')
    expect(getAllProjectsText.text()).toBe('All Projects')
  })

  it('Renders the create project form with state window 2', () => {
    projectHome.setState({ window: 2 })
    expect(projectHome.find('label').text()).toBe('Project Name:')
  })

  it('Renders get project (single) with state window 3', () => {
    projectHome.setState({ window: 3, project: project, loadingProjects: false })
    const getAllProjectsText = projectHome.find('h4')
    expect(getAllProjectsText.text()).toBe(project.name)
  })

  it('Renders all projects when project link is clicked ', () => {
    projectHome.setState({ window: null })
    projectHome.find('#show-all').simulate('click')
    const getAllProjectsText = projectHome.find('h3')
    expect(getAllProjectsText.text()).toBe('All Projects')
  })

  it('Hides all projects when "Hide Projects" link is clicked', () => {
    projectHome.find('#hide-all').simulate('click')
    expect(projectHome.find('h4').exists()).toBeFalsy()
  })

  it('Renders create project on click with default state', () => {
    projectHome.setState({ window: 1 })
    projectHome.find('#open-project-create').simulate('click')
    expect(projectHome.find('input')).toBeTruthy()
  })

  it('Hides the project creation when hide Close Project is clicked', () => {
    projectHome.setState({ window: 2 })
    projectHome.find('#close-project-create').simulate('click')
    expect(projectHome.find('input').exists()).toBeFalsy()
  })

})