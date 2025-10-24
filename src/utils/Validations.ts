import zxcvbn from 'zxcvbn';

export const validatePasswordStrength = (password) => {
  const result = zxcvbn(password);
  const score = result.score;

  let strengthMessage = '';

  if (password.length < 10) {
    strengthMessage = 'Weak password';
  } else if (score < 2) {
    strengthMessage = 'Weak password';
  } else {
    strengthMessage = 'Strong password';
  }

  const feedback = result.feedback.suggestions.join(' ');

  return { strengthMessage, feedback, score };
};
