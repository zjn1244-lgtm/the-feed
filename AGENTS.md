
# GitHub Development Workflow

1. Before starting, fetch the latest changes from origin.

2. For each new feature or development phase, create a dedicated branch from the latest main.

3. If the current task belongs to an existing development phase, continue working on its existing branch.

4. After each code modification:
   - Run the necessary build and tests.
   - Review the changes.
   - Commit the changes.
   - Push to the current development branch.

5. If a Pull Request already exists for the current branch, update that PR by pushing new commits. Do not create another PR.

6. If no Pull Request exists, create one targeting main.

7. Never automatically merge a Pull Request into main.

8. Never force-push or discard uncommitted changes without explicit permission.

9. After completing the task, report:
   - Branch name
   - Commit SHA
   - Pull Request URL
   - Build and test results

10. Keep main stable and only merge after user approval.
