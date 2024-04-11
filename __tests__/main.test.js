/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const github = require('@actions/github')
const main = require('../src/main')

// Mock the GitHub Actions core library
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()

// Mock the Octokit client
const octokitMock = {
  rest: {
    actions: {
      listWorkflowRuns: jest.fn()
    }
  }
}
jest.spyOn(github, 'getOctokit').mockReturnValue(octokitMock)

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('runs successfully with all necessary inputs', async () => {
    // Arrange
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'github-token':
          return 'token'
        case 'workflow-id':
          return 'workflowId'
        case 'branch':
          return 'branch'
        default:
          return ''
      }
    })

    // Act
    await main.run()

    // Assert
    expect(runMock).toHaveReturned()

    expect(github.getOctokit).toHaveBeenCalledWith('token')
  })

  it('fails if github-token is not provided', async () => {
    // Arrange
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'github-token':
          return ''
        default:
          return 'input'
      }
    })

    // Act
    await main.run()

    // Assert
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith(
      "Input 'github-token' is required."
    )
  })

  it('fails if workflow-id is not provided', async () => {
    // Arrange
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'workflow-id':
          return ''
        default:
          return 'input'
      }
    })

    // Act
    await main.run()

    // Assert
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith(
      "Input 'workflow-id' is required."
    )
  })

  it('fails if branch is not provided', async () => {
    // Arrange
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'branch':
          return ''
        default:
          return 'input'
      }
    })

    // Act
    await main.run()

    // Assert
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith("Input 'branch' is required.")
  })
})
