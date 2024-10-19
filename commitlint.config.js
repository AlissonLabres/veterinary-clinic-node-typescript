const Configuration = {
  parserPreset: {
    parserOpts: {
      headerPattern: /\[(\w*)\] \- (\w*)/,
      headerCorrespondence: ["type", "subject"],
    },
  },
  plugins: [
    {
      rules: {
        "header-match-team-pattern": (parsed) => {
          const { type, subject } = parsed;
          console.log("\n\n\n", "TYPE - ", type);
          console.log("SUBJECT - ", subject, "\n\n\n");

          if (type !== null && subject !== null) {
            return [false, "header must be in format ':gitmoji:? [scope] subject'"];
          }

          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "header-match-team-pattern": [2, "always"],
    "type-case": [2, "always", ["upper-case"]],
    "type-enum": [2, "always", ["CHORE", "CI", "FEAT", "FIX", "REFACTOR", "REVERT", "STYLE", "TEST"]],
    "scope-empty": [2, "always", []],
    "subject-case": [2, "always", ["sentence-case"]],
  },
  helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
  prompt: {
    settings: {},
    messages: {
      skip: ":skip",
      max: "upper %d chars",
      min: "%d chars at least",
      emptyWarning: "can not be empty",
      upperLimitWarning: "over limit",
      lowerLimitWarning: "below limit",
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          FEAT: {
            description: "A new feature",
            title: "Features",
            emoji: "✨",
          },
          FIX: {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          STYLE: {
            description: "Changes that do not affect the meaning of the code",
            title: "Styles",
            emoji: "💎",
          },
          REFACTOR: {
            description: "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
            emoji: "📦",
          },
          TEST: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
            emoji: "🚨",
          },
          CI: {
            description: "Changes to our CI configuration files and scripts",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          CHORE: {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
            emoji: "♻️",
          },
          REVERT: {
            description: "Reverts a previous commit",
            title: "Reverts",
            emoji: "🗑",
          },
        },
      },
      subject: {
        description: "Write a short, imperative tense description of the change",
      },
    },
  },
};

module.exports = Configuration;
