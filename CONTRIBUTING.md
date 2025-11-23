# Contributing to SynapseFlow

Thank you for your interest in contributing to SynapseFlow! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/synapseflow.git
   cd synapseflow
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Git

### Installation

```bash
# Install dependencies
npm install

# Start databases
cd scripts
npm run init

# Start development servers
cd ../synapseflow/backend
npm run dev  # Terminal 1

cd ../synapseflow/mcp-server
npm run dev  # Terminal 2

cd ../synapseflow/frontend
npm run dev  # Terminal 3
```

## 🧪 Testing

All contributions must include tests and maintain 95% coverage:

```bash
# Run backend tests
cd synapseflow/backend
npm test

# Run frontend tests
cd synapseflow/frontend
npm test

# Run E2E tests
cd synapseflow/e2e
npm test
```

## 📝 Code Style

- **TypeScript**: Use strict mode, proper types
- **Formatting**: Run `npm run lint` before committing
- **Comments**: Document complex logic
- **Commits**: Use conventional commits format

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Test additions or changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Build process or auxiliary tool changes

**Example:**
```
feat(backend): Add paper filtering by publication date

Implement date range filtering for research queries using
PostgreSQL date operations and indexing for performance.

Closes #123
```

## 🐛 Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/mrkingsleyobi/synapseflow/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, Node version, etc.)

## 💡 Suggesting Features

1. Check [Discussions](https://github.com/mrkingsleyobi/synapseflow/discussions) for similar ideas
2. Create a new discussion with:
   - Clear use case
   - Expected behavior
   - Why this benefits users
   - Potential implementation approach

## 🔀 Pull Request Process

1. **Update documentation** if needed (README, docs/)
2. **Add tests** for new functionality
3. **Ensure tests pass**: `npm test` in all packages
4. **Update CHANGELOG.md** with your changes
5. **Submit PR** with:
   - Clear description of changes
   - Link to related issues
   - Screenshots/videos for UI changes

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested on Chrome, Firefox, Safari (for frontend)
- [ ] Responsive design maintained (for frontend)
- [ ] Accessibility standards met (WCAG 2.1 AA)

## 🏗️ Architecture Guidelines

### Backend
- Use Fastify for routing
- Implement proper error handling
- Add request validation with Zod
- Use TypeScript types/interfaces
- Follow RESTful conventions

### Frontend
- Use Next.js App Router
- Implement proper loading states
- Add error boundaries
- Use React Query for data fetching
- Follow React best practices

### Testing
- Unit tests for business logic
- Component tests for UI
- E2E tests for critical flows
- Mock external dependencies

## 📦 Adding Dependencies

- Justify why the dependency is needed
- Check for security vulnerabilities
- Prefer well-maintained packages
- Update package-lock.json

## 🤝 Code Review

All submissions require review. We aim to review PRs within 3-5 business days.

**What we look for:**
- Code quality and readability
- Test coverage
- Performance implications
- Security considerations
- Accessibility compliance

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions help make SynapseFlow better for everyone. We appreciate your time and effort!

---

**Questions?** Join our [Discussions](https://github.com/mrkingsleyobi/synapseflow/discussions) or open an issue.
