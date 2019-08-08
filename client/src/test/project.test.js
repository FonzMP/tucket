import React from 'react'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme'
import ProjectHome from '../components/project/projectHome'

configure({ adapter: new Adapter() });

describe('Project component ', () => {
  const project = mount(<ProjectHome />)
  it('Renders the project home', () => {
    const projectHomeText = project.find('h1')
    expect(projectHomeText.text()).toBe('Projects')
  })

  it('Renders with state default to 1', () => {
    expect(project.instance().state.window).toBe(1)
  })

})