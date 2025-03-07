export const name = /^[\u0600-\u06FF]{2,}(?: [\u0600-\u06FF]{2,}){3}$/
export const username = /^(?!\d+$)[a-zA-Z0-9]{6,16}$/
export const email = /^[a-zA-Z0-9._%+-]+@(?:gmail\.com)$/i
export const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export const phone = /^(?:\+?20)?(10|11|12|15)[0-9]{8}$/
export const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/
export const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/
export const behanceRegex = /^(https?:\/\/)?(www\.)?behance\.net\/[a-zA-Z0-9_-]+\/?$/
export const universityEmailRegex = /^ugs\.\d{6}@ci\.suez\.edu\.eg$/
