# crv

`crv` is a CLI application that changes the visibility of GitHub repositories.

## Installation

You can install `crv` globally using npm:

```bash
npm install -g crv-cli
```

Or use it directly with npx:

```bash
npx crv-cli
```

## Prerequisites

Before using `crv`, you need to set up a GitHub personal access token:

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `repo` permissions
3. Set the token as an environment variable:

```bash
export GITHUB_TOKEN=your_github_token_here
```

## Usage

### Making Repositories Private

To change one or more repositories to private visibility:

```bash
crv private <repositories> <owner>
```

**Parameters:**
- `<repositories>`: Comma-separated list of repository names (no spaces)
- `<owner>`: GitHub username or organization name that owns the repositories

**Examples:**

```bash
# Make a single repository private
crv private my-repo username

# Make multiple repositories private
crv private repo1,repo2,repo3 username

# Make repositories private for an organization
crv private project-a,project-b my-org
```

### Successful Execution

When the command runs successfully, you'll see:
```
Done!🎉
Success repositories: repo1, repo2, repo3
```

## Development

### Building the Project

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## License

MIT
