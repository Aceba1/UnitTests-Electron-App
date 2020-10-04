function itemToHTML(item) {
  let div = document.createElement('div');
  div.className="modcard";
  // <span class="tooltiptext">Author: ${item.owner.login}</span>
  div.innerHTML=`
    <div class="flexitemstretch">
      <div class="flexholder">
        <img class="profile-img-small"
          src="${item.owner.avatar_url}" 
          alt="${item.owner.login}" />
        <div class="modcard-header">
          <div class="title">
            ${item.name}
          </div>
          <div class="subtitle">
            ${item.description}
          </div>
        </div>
      </div>
      <div class="modcard-body">
        <button>Enable</button>
        <button class="priority">Install Mod</button>
        <button>More Info</button>
      </div>
    </div>
    <img class="modcard-detail-img"
      src="https://foxrudor.de" />`;
  return div;
}

/**
  * @param {DocumentFragment} fragment
  * @param {{
  *   total_count: number,
  *   incomplete_results: boolean,
  *   items: {
  *     id: number,
  *     node_id: string,
  *     name: string,
  *     full_name: string,
  *     owner: {
  *       login: string,
  *       id: number,
  *       node_id: string,
  *       avatar_url: string,
  *       url: string,
  *       html_url: string
  *     },
  *     html_url: string,
  *     description: string,
  *     url: string,
  *     commits_url: string,
  *     created_at: string,
  *     updated_at: string,
  *     pushed_at: string,
  *     stargazers_count: number,
  *     watchers_count: number
  *   }[]
  * }} data 
  */
module.exports = function createGithubModList(fragment, data) {
  for (const item in data.items) {
    fragment.appendChild(itemToHTML(data.items[item]));
  }
}