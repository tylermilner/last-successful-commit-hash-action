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
    // Get inputs
    const token = core.getInput('github-token')
    const workflowId = core.getInput('workflow-id')
    const branch = core.getInput('branch')
    const debug = core.getInput('debug') === 'true' // Convert input to boolean

    // Validate inputs
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
    if (debug) {
      console.log(
        `Debug mode is enabled. Inputs: github-token=***, workflow-id=${workflowId}, branch=${branch}`
      )
    }

    const octokit = github.getOctokit(token)
    const owner = process.env.GITHUB_REPOSITORY.split('/')[0]
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1]

    octokit.rest.actions
      .listWorkflowRuns({
        owner: owner, // eslint-disable-line object-shorthand
        repo: repo, // eslint-disable-line object-shorthand
        workflow_id: workflowId,
        status: 'success',
        branch: branch // eslint-disable-line object-shorthand
      })
      // eslint-disable-next-line github/no-then
      .then(res => {
        const workflowRuns = res.data.workflow_runs
        if (debug) {
          console.log('workflowRuns:', JSON.stringify(workflowRuns, null, 2))
        }

        if (workflowRuns.length < 1) {
          core.setFailed(
            `No successful workflow runs found for workflow ${workflowId} on branch ${branch}. Make sure the workflow has completed successfully at least once.`
          )
          return
        }

        // eslint-disable-next-line no-shadow
        const headCommits = workflowRuns.map(run => {
          return run.head_commit
        })
        if (debug) {
          console.log('headCommits:', JSON.stringify(headCommits, null, 2))
        }

        const sortedHeadCommits = headCommits.sort((a, b) => {
          const dateA = new Date(a.timestamp)
          const dateB = new Date(b.timestamp)
          if (dateA < dateB) return -1
          if (dateA > dateB) return 1
          return 0
        })
        if (debug) {
          console.log(
            'sortedHeadCommits:',
            JSON.stringify(sortedHeadCommits, null, 2)
          )
        }

        const lastSuccessCommitHash =
          sortedHeadCommits[sortedHeadCommits.length - 1].id
        if (debug) {
          console.log(
            'lastSuccessCommitHash:',
            JSON.stringify(lastSuccessCommitHash, null, 2)
          )
        }

        core.setOutput('commit-hash', lastSuccessCommitHash)
      })
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
