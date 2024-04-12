/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const github = require('@actions/github')
const main = require('../src/main')

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug').mockImplementation()
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

// Setup environment variables that the action expects
process.env.GITHUB_REPOSITORY = 'owner/repo'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Constants
const WORKFLOW_RUNS = [
  {
    head_commit: {
      id: 'hash1',
      timestamp: '2022-01-01T00:00:00Z'
    }
  },
  {
    head_commit: {
      id: 'hash3',
      timestamp: '2024-01-01T00:00:00Z'
    }
  },
  {
    head_commit: {
      id: 'hash2',
      timestamp: '2023-01-01T00:00:00Z'
    }
  }
]

// Common setup
const setupGetInputMock = (
  token = 'token',
  workflowId = 'workflowId',
  branch = 'branch',
  debug = 'false'
) => {
  getInputMock.mockImplementation(name => {
    switch (name) {
      case 'github-token':
        return token
      case 'workflow-id':
        return workflowId
      case 'branch':
        return branch
      case 'debug':
        return debug
      default:
        return ''
    }
  })
}
const setupOctokitMock = workflowRuns => {
  octokitMock.rest.actions.listWorkflowRuns.mockResolvedValue({
    data: {
      workflow_runs: workflowRuns
    }
  })
}

// Tests
describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    setupGetInputMock()
  })

  it('fetches workflow runs from the GitHub API with all necessary inputs', async () => {
    // Arrange
    setupGetInputMock()

    // Act
    await main.run()

    // Assert
    expect(runMock).toHaveReturned()
    expect(core.getInput).toHaveBeenCalledWith('github-token')
    expect(core.getInput).toHaveBeenCalledWith('workflow-id')
    expect(core.getInput).toHaveBeenCalledWith('branch')
    expect(github.getOctokit).toHaveBeenCalledWith('token')
    expect(octokitMock.rest.actions.listWorkflowRuns).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      workflow_id: 'workflowId',
      status: 'success',
      branch: 'branch'
    })
  })

  it('outputs the commit hash for the latest successful workflow run', async () => {
    // Arrange
    setupGetInputMock()
    setupOctokitMock(WORKFLOW_RUNS)

    // Act
    await main.run()

    // Assert
    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenCalledWith('commit-hash', 'hash3')
  })

  it('outputs debug information to @actions/core', async () => {
    // Arrange
    setupGetInputMock('token', 'workflowId', 'branch', 'false')
    setupOctokitMock(WORKFLOW_RUNS)

    // Act
    await main.run()

    // Assert
    expect(runMock).toHaveReturned()
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      '[last-successful-commit-hash-action] Debug mode is enabled. Inputs: github-token=***, workflow-id=workflowId, branch=branch'
    )
    expect(debugMock).toHaveBeenNthCalledWith(
      2,
      '[last-successful-commit-hash-action] workflowRuns:',
      JSON.stringify(
        [
          {
            head_commit: {
              id: 'hash1',
              timestamp: '2022-01-01T00:00:00Z'
            }
          },
          {
            head_commit: {
              id: 'hash3',
              timestamp: '2024-01-01T00:00:00Z'
            }
          },
          {
            head_commit: {
              id: 'hash2',
              timestamp: '2023-01-01T00:00:00Z'
            }
          }
        ],
        null,
        2
      )
    )
    expect(debugMock).toHaveBeenNthCalledWith(
      3,
      '[last-successful-commit-hash-action] headCommits:',
      JSON.stringify(
        [
          {
            id: 'hash1',
            timestamp: '2022-01-01T00:00:00Z'
          },
          {
            id: 'hash3',
            timestamp: '2024-01-01T00:00:00Z'
          },
          {
            id: 'hash2',
            timestamp: '2023-01-01T00:00:00Z'
          }
        ],
        null,
        2
      )
    )
    expect(debugMock).toHaveBeenNthCalledWith(
      4,
      '[last-successful-commit-hash-action] sortedHeadCommits:',
      JSON.stringify(
        [
          {
            id: 'hash1',
            timestamp: '2022-01-01T00:00:00Z'
          },
          {
            id: 'hash2',
            timestamp: '2023-01-01T00:00:00Z'
          },
          {
            id: 'hash3',
            timestamp: '2024-01-01T00:00:00Z'
          }
        ],
        null,
        2
      )
    )
    expect(debugMock).toHaveBeenNthCalledWith(
      5,
      '[last-successful-commit-hash-action] lastSuccessCommitHash:',
      JSON.stringify('hash3')
    )
  })

  it('always outputs the final commit hash output, even if debug mode is disabled', async () => {
    // Arrange
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation()
    setupGetInputMock('token', 'workflowId', 'branch', 'false')
    setupOctokitMock(WORKFLOW_RUNS)

    // Act
    await main.run()

    // Assert
    expect(runMock).toHaveReturned()
    expect(consoleLogMock).toHaveBeenCalledWith(
      'Last successful commit hash: hash3'
    )
  })

  it('fails if there are no successful workflow runs', async () => {
    // Arrange
    setupGetInputMock()

    setupOctokitMock([])

    // Act
    await main.run()

    // Assert
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith(
      'No successful workflow runs found for workflow workflowId on branch branch. Make sure the workflow has completed successfully at least once.'
    )
  })

  const requiredInputs = ['github-token', 'workflow-id', 'branch']
  for (const input of requiredInputs) {
    it(`fails if ${input} is not provided`, async () => {
      // Arrange
      getInputMock.mockImplementation(name => (name === input ? '' : name))

      // Act
      await main.run()

      // Assert
      expect(runMock).toHaveReturned()
      expect(setFailedMock).toHaveBeenCalledWith(
        `Input '${input}' is required.`
      )
    })
  }
})
