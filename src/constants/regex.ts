const name = /^[a-zA-Z]+$/;
const username = /^[a-zA-Z0-9_-]{3,16}$/;
const email = /^[a-zA-Z0-9._%+-]+@(?:gmail\.com)$/i;
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phone = /^(?:\+?20)?(10|11|12|15)[0-9]{8}$/;
const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/;
const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/;
const behanceRegex = /^(https?:\/\/)?(www\.)?behance\.net\/[a-zA-Z0-9_-]+\/?$/;
const universityEmailRegex = /^ugs\.\d{4}@ci\.suez\.edu\.eg$/;

export {name, username, email, password, phone, githubRegex, linkedinRegex, behanceRegex, universityEmailRegex};
