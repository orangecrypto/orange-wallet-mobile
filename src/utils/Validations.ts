// validation.js
import zxcvbn from 'zxcvbn';

export const validatePasswordStrength = (password) => {
  // Use zxcvbn to get the strength score and feedback
  const result = zxcvbn(password);

  // Get the strength score
  const score = result.score;  // score ranges from 0 to 4

  // Prepare feedback based on the score
  let strengthMessage = '';
  switch (score) {
    case 0:
    case 1:
      strengthMessage = 'Weak password';
      break;
    case 2:
      strengthMessage = 'Moderate password';
      break;
    case 3:
      strengthMessage = 'Strong password';
      break;
    case 4:
      strengthMessage = 'Very strong password';
      break;
    default:
      strengthMessage = 'Invalid password';
  }

  // Optionally, add feedback if any suggestions are available
  const feedback = result.feedback.suggestions.join(' ');
  return { strengthMessage, feedback };
};
