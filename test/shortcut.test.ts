import { Action, KeyCombo, shortcutJS } from '../src/shortcut'
import { getMockedEvent } from './utils'

/**
 * Mock window
 */
interface MockWindow extends Window {
  addEventListener: jest.Mock<{}> & typeof window.addEventListener
  removeEventListener: jest.Mock<{}> & typeof window.removeEventListener
}
function getMockWindow() {
  window.addEventListener = jest.fn()
  window.removeEventListener = jest.fn()
  return window as MockWindow
}
let mockWindow = getMockWindow()

/**
 * Actual test suite
 */
describe('shortcutJS', () => {
  beforeEach(() => {
    shortcutJS.reset()

    mockWindow.addEventListener.mockClear()
    mockWindow.removeEventListener.mockClear()
  })

  describe('init', () => {
    it('sets keydown and keyup event listeners', () => {
      shortcutJS.init()
      expect(mockWindow.addEventListener).toHaveBeenCalledTimes(2)
    })

    it('initializes with a debug options', () => {
      shortcutJS.init({ debug: true })
      expect(shortcutJS.options.debug).toBeTruthy()
    })

    it('sets keydown and keyup event listeners only once', () => {
      shortcutJS.init()
      shortcutJS.init({ debug: true })
      shortcutJS.init()
      expect(mockWindow.addEventListener).toHaveBeenCalledTimes(2)
    })
  })

  describe('reset', () => {
    it('removes keydown and keyup event listeners only once', () => {
      shortcutJS.reset()
      expect(mockWindow.removeEventListener).toHaveBeenCalledTimes(2)
    })

    it('clears keyMap and actions', () => {
      shortcutJS.init()

      shortcutJS.processEvent(getMockedEvent(55))
      expect(shortcutJS.eventProcessor.currentCombo.keys.size).toBe(1)

      shortcutJS.addAction(new Action('open', KeyCombo.fromString('ctrl a')))
      expect(shortcutJS.actions.size).toBe(1)

      shortcutJS.reset()
      expect(shortcutJS.eventProcessor.currentCombo.keys.size).toBe(0)
      expect(shortcutJS.actions.size).toBe(0)
    })
  })

  describe('loadFromJson', () => {
    it('calls init and parses json', () => {
      shortcutJS.loadFromJson([{ action: 'open', combo: 'ctrl a' }])
      expect(mockWindow.addEventListener).toHaveBeenCalledTimes(2)
      expect(shortcutJS.actions.size).toBeGreaterThan(0)
    })

    it('calls init and parses json with debug true', () => {
      shortcutJS.loadFromJson([{ action: 'open', combo: 'ctrl a' }], { debug: true })
      expect(shortcutJS.options.debug).toBeTruthy()
    })
  })

  describe('addAction', () => {
    it('adds an action', () => {
      const combo = KeyCombo.fromString('ctrl a')
      const action = new Action('action', combo)
      shortcutJS.addAction(action)
      expect(shortcutJS.actions.size).toEqual(1)
    })

    it('throws an error if an action is not passed', () => {
      expect(() => shortcutJS.addAction(null as any)).toThrowError()
    })
  })

  describe('removeAction', () => {
    it('removes an action', () => {
      const combo = KeyCombo.fromString('ctrl a')
      const action = new Action('action', combo)
      shortcutJS.addAction(action)
      expect(shortcutJS.actions.size).toEqual(1)
      shortcutJS.removeAction(action)
      expect(shortcutJS.actions.size).toEqual(0)
    })

    it('throws an error if an action is not passed', () => {
      expect(() => shortcutJS.removeAction(null as any)).toThrowError()
    })

    it('throws an error if an unregistered action is passed', () => {
      const action = new Action('newaction', KeyCombo.fromString('ctrl b'))
      expect(() => shortcutJS.removeAction(action)).toThrowError()
    })
  })

  describe('subscribe', () => {
    it('adds a new callback', () => {
      const combo = KeyCombo.fromString('ctrl a')
      const action = new Action('action', combo)

      shortcutJS.addAction(action)
      shortcutJS.subscribe(action.name, () => ({}))

      expect(shortcutJS.actions.get(action.name).callbacks.size).toEqual(1)
    })

    it('throws an error if the action name is not correct', () => {
      const combo = KeyCombo.fromString('ctrl a')
      const action = new Action('action', combo)
      shortcutJS.addAction(action)

      expect(() => shortcutJS.subscribe('papa', jest.fn())).toThrowError()
    })
  })

  describe('unsubscribe', () => {
    it('removes a callback', () => {
      const combo = KeyCombo.fromString('ctrl a')
      const action = new Action('action', combo)

      const func = () => ({})

      shortcutJS.addAction(action)
      shortcutJS.subscribe(action.name, func)
      shortcutJS.unsubscribe(action.name, func)

      expect(shortcutJS.actions.get(action.name).callbacks.size).toEqual(0)
    })

    it('removes a all callbacks', () => {
      shortcutJS.loadFromJson([{ action: 'open', combo: 'ctrl a' }])
      shortcutJS.subscribe('open', jest.fn())
      shortcutJS.subscribe('open', jest.fn())
      shortcutJS.unsubscribe('open')

      expect(shortcutJS.actions.get('open').callbacks.size).toEqual(0)
    })

    it('throws an error if the action name is not correct', () => {
      const combo = KeyCombo.fromString('ctrl a')
      const action = new Action('action', combo)
      shortcutJS.addAction(action)

      expect(() => shortcutJS.unsubscribe('papa')).toThrowError()
    })
  })

  describe('processEvent', () => {
    it('processEvent of eventProcessor', () => {
      shortcutJS.init()
      shortcutJS.processEvent({} as KeyboardEvent)
      // @todo Use spies
      expect(shortcutJS.processEvent).toBeTruthy()
    })

    it('not to be called if is paused', () => {
      shortcutJS.init()
      shortcutJS.pause()
      shortcutJS.processEvent({} as KeyboardEvent)
      // @todo Use spies
      expect(shortcutJS.processEvent).toBeTruthy()
    })
  })

  it('pause/resume the execution flow', () => {
    expect(shortcutJS.isPaused()).toBeFalsy()
    shortcutJS.pause()
    expect(shortcutJS.isPaused()).toBeTruthy()
    shortcutJS.resume()
    expect(shortcutJS.isPaused()).toBeFalsy()
  })

  it('cleanCombo: to call cleanCombo of eventProcessor', () => {
    shortcutJS.init()
    shortcutJS.cleanCombo()
    // @todo Use spies
    expect(shortcutJS.cleanCombo).toBeTruthy()
  })
})
