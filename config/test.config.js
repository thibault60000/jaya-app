import sinon from 'sinon'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

beforeEach(() => {
  sinon.stub(console, 'error')
})

afterEach(() => {
  console.error.restore()
})
