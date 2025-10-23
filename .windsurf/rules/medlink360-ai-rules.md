---
trigger: manual
---

# MedLink360 - Windsurf AI Instructions

## Project Overview
MedLink360 is a healthcare management platform connecting patients with healthcare providers. The project uses:
- **Frontend**: React + Next.js
- **Backend**: Django (Python)
- **Database**: Supabase
- **Design**: [Figma Design](https://www.figma.com/design/RZNu3TOM3gfYGDP4vbqQPb/Medlink360?node-id=38-190&t=pZ9eEI7iPuu8qayo-0)

## Critical Guidelines for AI Assistance

### Preventing Hallucinations
1. **Always verify** file and directory existence before referencing them
2. **Never assume** the existence of unverified functions, classes, or variables
3. **Cross-reference** with the project structure before making changes
4. **When in doubt, check first** using the available tools

### File Management
1. **Check Before Creating**:
   - Always verify if a file exists before creating a new one
   - Use the appropriate tools to search for existing implementations
   - Look for similarly named files that might serve the same purpose

2. **Editing Existing Files**:
   - Always view the current content before making changes
   - Preserve existing functionality unless explicitly asked to modify it
   - Maintain consistent code style with the rest of the project

3. **Project Structure Updates**:
   - After creating any new file or directory, update `PROJECT_STRUCTURE.md`
   - Document the purpose of new files and their relationships
   - Keep the structure organized according to the established patterns

## Context Management
Maintain separate context files for frontend and backend development. These files are crucial for tracking progress and maintaining consistency.

### For Frontend Development
1. **Before Making Changes**:
   - Check `context/frontend_context.json`
   - Review component status and dependencies
   - Note any ongoing work or known issues

2. **After Making Changes**:
   - Update component status
   - Document any new patterns or solutions
   - Note any technical debt or follow-up tasks

### For Backend Development
1. **Before Making Changes**:
   - Check `context/backend_context.json`
   - Review API endpoints and database schema
   - Note any ongoing work or known issues

2. **After Making Changes**:
   - Update API documentation
   - Document database changes
   - Note any dependencies or requirements

## Development Workflow

1. **Initial Setup**
   - Run `./setup.sh` to install dependencies
   - Set up environment variables as per README.md
   - Verify all services are running

2. **Making Changes**
   - Always check for existing implementations first
   - Update context files with your progress
   - Follow the project's coding standards

3. **Before Committing**
   - Ensure all new files are documented in `PROJECT_STRUCTURE.md`
   - Update relevant context files
   - Verify no sensitive information is committed

## Available MCP Servers

The following MCP servers are available to assist with development. Always use them when working on related tasks:

1. **Context7**
   - **Purpose**: General library documentation and code examples
   - **Use For**: Finding up-to-date documentation for any JavaScript/TypeScript libraries
   - **How to Use**: When you need to look up documentation for any frontend or Node.js packages

2. **BMAD-METHOD Docs**
   - **Purpose**: Documentation for the BMAD method implementation
   - **Use For**: Understanding and implementing BMAD methodology in the project
   - **How to Use**: Reference when working with BMAD-specific implementations

3. **SupabaseAuthWithSSR Docs**
   - **Purpose**: Server-Side Rendering with Supabase Authentication
   - **Use For**: Implementing authentication in Next.js with Supabase
   - **How to Use**: Reference when setting up or debugging authentication flows

4. **django-supabase-auth Docs**
   - **Purpose**: Django authentication backend for Supabase
   - **Use For**: Integrating Django authentication with Supabase
   - **How to Use**: Reference when setting up backend authentication

5. **django-storage-supabase Docs**
   - **Purpose**: Django storage backends for Supabase Storage
   - **Use For**: File uploads and storage in Django using Supabase
   - **How to Use**: Reference when implementing file storage functionality

6. **Django-Supabase Docs**
   - **Purpose**: Django integration with Supabase services
   - **Use For**: General Supabase-Django integration patterns
   - **How to Use**: Reference when connecting Django to Supabase services

7. **next-supabase-starter Docs**
   - **Purpose**: Starter template for Next.js with Supabase
   - **Use For**: Reference implementation and best practices
   - **How to Use**: Reference for project structure and common patterns

8. **debugpy Docs**
   - **Purpose**: Python debugging tools and documentation
   - **Use For**: Debugging Python applications in VS Code
   - **How to Use**: Reference when setting up or debugging Python code

### When to Use MCP Servers

1. **Always use MCP servers when**:
   - You need documentation for any library or framework
   - Implementing new features that might have existing patterns
   - Debugging issues with supported technologies
   - Looking for best practices and examples

2. **How to Use**:
   - Check if an MCP server is available for your task
   - Use the appropriate server to find relevant documentation
   - Follow the patterns and examples provided
   - Document any new patterns in the context files

3. **Best Practices**:
   - Always verify MCP information against official documentation
   - Update context files with useful patterns found
   - Note any limitations or gotchas in the context files

## Error Handling
1. **When Errors Occur**:
   - Document the error in the relevant context file
   - Note the solution or workaround
   - Update `ai_learning` with the resolution

2. **Common Pitfalls**:
   - Always check for file existence before editing
   - Verify environment setup
   - Check for required dependencies

## Best Practices
- **Code Quality**:
  - Follow the existing code style
  - Write clear, self-documenting code
  - Add comments for complex logic

- **Documentation**:
  - Keep `PROJECT_STRUCTURE.md` updated
  - Document API endpoints and components
  - Maintain clear commit messages

- **Testing**:
  - Write tests for new features
  - Update tests when making changes
  - Document test cases in context files

## Review Process
1. **Self-Review**:
   - Check for unused code
   - Verify all new files are documented
   - Ensure context files are updated

2. **Context Verification**:
   - Cross-reference with project structure
   - Verify all dependencies are accounted for
   - Check for any potential conflicts

Remember: When in doubt, always verify before making changes. It's better to spend time checking than to create inconsistencies in the project.
