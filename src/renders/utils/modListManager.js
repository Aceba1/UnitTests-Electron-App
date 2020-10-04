const createGithubModList = require("../utils/createModList");
const queryGithub = require("./queryGithub");
const fragment = document.createDocumentFragment();

module.exports = async function createGithubList() {
  createGithubModList(fragment, await queryGithub.getPage())
  return fragment;
}