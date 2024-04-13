//
// Based on https://stackoverflow.com/a/62378683
//

const core = require('@actions/core')
const github = require('@actions/github')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    // Get action inputs provided in the user's workflow file
    const token = core.getInput('github-token')
    const workflowId = core.getInput('workflow-id')
    const branch = core.getInput('branch')
    const debug = isDebug()

    // Validate that all necessary inputs have been provided
    if (!token) {
      core.setFailed("Input 'github-token' is required.")
      return
    }
    if (!workflowId) {
      core.setFailed("Input 'workflow-id' is required.")
      return
    }
    if (!branch) {
      core.setFailed("Input 'branch' is required.")
      return
    }

    logDebug(
      `Debug mode is enabled. Inputs: github-token=***, workflow-id=${workflowId}, branch=${branch}`
    )

    // Create an Octokit client to access the GitHub API using the provided GitHub token
    const octokit = github.getOctokit(token)

    // Extract the owner and repo from the default GITHUB_REPOSITORY environment variable
    const owner = process.env.GITHUB_REPOSITORY.split('/')[0]
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1]

    // Fetch a list of workflow runs for the specified workflow ID and branch, filtering for successful runs
    const res = await octokit.rest.actions.listWorkflowRuns({
      owner,
      repo,
      workflow_id: workflowId,
      status: 'success',
      branch
    })

    // Extract the workflow runs from the response
    const workflowRuns = res.data.workflow_runs
    core.debug(
      '[last-successful-commit-hash-action] workflowRuns:',
      JSON.stringify(workflowRuns, null, 2)
    )
    if (debug) {
      console.log('workflowRuns:', JSON.stringify(workflowRuns, null, 2))
    }

    // Fail the run if no previous successful workflow runs were found
    if (workflowRuns.length < 1) {
      core.setFailed(
        `No successful workflow runs found for workflow ${workflowId} on branch ${branch}. Make sure the workflow has completed successfully at least once.`
      )
      return
    }

    // Get the commits for each successful workflow run
    const headCommits = workflowRuns.map(workflowRun => {
      return workflowRun.head_commit
    })
    core.debug(
      '[last-successful-commit-hash-action] headCommits:',
      JSON.stringify(headCommits, null, 2)
    )
    if (debug) {
      console.log('headCommits:', JSON.stringify(headCommits, null, 2))
    }

    // Sort the commits in ascending order (oldest to newest)
    const sortedHeadCommits = headCommits.sort((a, b) => {
      const dateA = new Date(a.timestamp)
      const dateB = new Date(b.timestamp)
      if (dateA < dateB) return -1
      if (dateA > dateB) return 1
      return 0
    })
    core.debug(
      '[last-successful-commit-hash-action] sortedHeadCommits:',
      JSON.stringify(sortedHeadCommits, null, 2)
    )
    if (debug) {
      console.log(
        'sortedHeadCommits:',
        JSON.stringify(sortedHeadCommits, null, 2)
      )
    }

    // Get the commit hash for the most recent successful run
    const lastSuccessCommitHash =
      sortedHeadCommits[sortedHeadCommits.length - 1].id
    logDebug(`Last successful commit hash: ${lastSuccessCommitHash}`, true)

    // Set action output
    core.setOutput('commit-hash', lastSuccessCommitHash)
  } catch (error) {
    core.setFailed(error.message)
  }
}

/**
 * Helper function to log debug messages.
 * @param {string} message - The message to log.
 * @param {override} override - Whether to override the debug setting.
 */
function logDebug(message, override = false) {
  const debug = isDebug()
  core.debug(`[last-successful-commit-hash-action] ${message}`)
  if (debug || override) {
    console.log(message)
  }
}

/**
 * Helper function to get debug mode status.
 * @returns {boolean} Whether debug mode is enabled.
 */
function isDebug() {
  return core.getInput('debug') === 'true' // Convert input to boolean
}

module.exports = {
  run
}
